// Membaca src/data/video.json (satu-satunya sumber data waktu). Edit JSON-nya, bukan angka di kode.
import raw from './data/video.json';

// iris = iris wipe, push = geser, fade = memudar,
// cut = transisi dibuat sebagai animasi di dalam scene (zoom-through, match cut, pan, dst)
export type TransKind = 'fade' | 'push' | 'iris' | 'cut';
export type Cue = {scene: number; from: number; to: number; text: string};

export type SceneData = {
  id: number;
  kind: TransKind; // transisi MASUK ke scene ini
  voMulai: number; // detik: awal cue pertama scene (dari SRT)
  voSelesai: number; // detik: akhir cue terakhir scene (dari SRT)
};

export const META = {
  judul: raw.judul,
  istilahAsing: raw.istilahAsing as string[],
};

export const VO = {file: raw.voFile, duration: raw.voDuration, cues: raw.cues as Cue[]};

export const SCENES: SceneData[] = raw.scenes.map((s) => {
  const cs = VO.cues.filter((c) => c.scene === s.id);
  if (cs.length === 0) throw new Error(`Scene ${s.id} tidak punya cue di video.json`);
  return {id: s.id, kind: s.kind as TransKind, voMulai: cs[0].from, voSelesai: cs[cs.length - 1].to};
});
