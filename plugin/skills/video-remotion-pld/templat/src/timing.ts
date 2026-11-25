// Semua durasi dihitung dari data (video.json). Tidak ada angka mati.
import {SCENES, VO} from './script';
import {ENABLE_OUTRO, OUTRO_SECONDS} from './flags';

export const WIDTH = 1920;
export const HEIGHT = 1080;
export const FPS = 60;

/** Lama transisi antar scene (frame). Jeda antar scene di suara tipis, jadi 0,5 detik. */
export const TRANS = 30;
/** Frame "pemanasan" sebelum narasi dimulai pada scene yang memakai transisi. */
export const LEAD = TRANS;
/** Ekor setelah kata terakhir suara (detik). */
const TAIL_SEC = 0.5;

export type Slot = {
  index: number;
  id: number;
  start: number; // frame narasi mulai (absolut)
  end: number; // frame narasi selesai (absolut)
  dur: number; // end - start
  lead: number; // frame sebelum narasi di dalam sequence
  position: number; // frame sequence mulai (absolut) = start - lead
  overlapIn: number; // overlap transisi masuk (0 bila cut)
  length: number; // panjang sequence
};

const base = SCENES.map((s, i) => {
  const isFirst = i === 0;
  const isLast = i === SCENES.length - 1;
  return {
    s,
    // scene pertama dimulai di frame 0; scene terakhir berakhir di akhir suara + ekor
    start: isFirst ? 0 : Math.round(s.voMulai * FPS),
    end: Math.round((isLast ? VO.duration + TAIL_SEC : s.voSelesai) * FPS),
  };
});

const leads = base.map((b, i) => {
  if (i === 0) return 0;
  if (b.s.kind !== 'cut') return LEAD;
  // cut: scene sebelumnya harus selesai bicara dulu
  return Math.min(LEAD, Math.max(0, b.start - base[i - 1].end));
});

export const SLOTS: Slot[] = base.map((b, i) => {
  const lead = leads[i];
  const position = b.start - lead;
  const nextB = base[i + 1];
  const overlapNext = nextB && nextB.s.kind !== 'cut' ? TRANS : 0;
  const length = nextB ? nextB.start - leads[i + 1] + overlapNext - position : b.end - position;
  return {
    index: i,
    id: b.s.id,
    start: b.start,
    end: b.end,
    dur: b.end - b.start,
    lead,
    position,
    overlapIn: i > 0 && b.s.kind !== 'cut' ? TRANS : 0,
    length,
  };
});

const last = SLOTS[SLOTS.length - 1];
/** Akhir scene terakhir (tanpa outro). */
export const TOTAL_FRAMES = last.position + last.length;
export const OUTRO_FRAMES = ENABLE_OUTRO ? Math.round(OUTRO_SECONDS * FPS) : 0;
/** Panjang komposisi Main = video + outro. */
export const MAIN_FRAMES = TOTAL_FRAMES + OUTRO_FRAMES;
