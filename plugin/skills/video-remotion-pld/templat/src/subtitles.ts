// Subtitle persis dari SRT (video.json). Penulisan (kapital, titik, ejaan) sudah dirapikan di video.json.
// Di sini hanya potongan yang terlalu panjang dibagi menjadi dua atau lebih supaya muat satu baris.
import {VO} from './script';
import {FPS} from './timing';

export type Cue = {from: number; to: number; text: string};

/** Batas karakter satu baris subtitle (34 px, lebar maksimal 1500 px). */
export const MAX_CHARS = 70;
const BREAK_WORDS = ['yang', 'dan', 'karena', 'untuk', 'dengan', 'atau', 'tetapi', 'tapi', 'saat', 'jika', 'ketika', 'agar', 'sehingga', 'bahwa', 'sampai'];

/** Bagi teks panjang di batas frasa (sebelum kata sambung) terdekat dari tengah. */
export const splitLong = (text: string): string[] => {
  if (text.length <= MAX_CHARS) return [text];
  const words = text.split(' ');
  if (words.length < 2) return [text];
  const mid = text.length / 2;
  let best = -1;
  let bestDist = Infinity;
  let pos = 0;
  words.forEach((w, i) => {
    if (i > 0 && BREAK_WORDS.includes(w.toLowerCase().replace(/[^a-z]/g, ''))) {
      const dist = Math.abs(pos - mid);
      if (dist < bestDist) {
        best = i;
        bestDist = dist;
      }
    }
    pos += w.length + 1;
  });
  if (best < 0) {
    // tidak ada kata sambung: bagi di spasi terdekat dari tengah
    pos = 0;
    words.forEach((w, i) => {
      if (i > 0) {
        const dist = Math.abs(pos - mid);
        if (dist < bestDist) {
          best = i;
          bestDist = dist;
        }
      }
      pos += w.length + 1;
    });
  }
  const a = words.slice(0, best).join(' ');
  const b = words.slice(best).join(' ');
  return [...splitLong(a), ...splitLong(b)];
};

export const CUES: Cue[] = VO.cues.flatMap((c) => {
  const from = Math.round(c.from * FPS);
  const to = Math.round(c.to * FPS);
  const parts = splitLong(c.text);
  const total = parts.reduce((a, p) => a + p.length, 0);
  let acc = 0;
  return parts.map((text) => {
    const f = from + Math.round((acc / total) * (to - from));
    acc += text.length;
    const t = from + Math.round((acc / total) * (to - from));
    return {from: f, to: t, text};
  });
});
