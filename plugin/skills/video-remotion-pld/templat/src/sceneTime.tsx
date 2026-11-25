import React, {createContext, useContext} from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {FPS, SLOTS, Slot} from './timing';

export type T = {
  f: number; // frame di dalam sequence
  n: number; // frame sejak narasi scene mulai (negatif saat jeda masuk)
  t: number; // detik sejak narasi scene mulai (acuan semua momen animasi)
  d: number; // lama narasi scene (detik)
  t0: number; // waktu animasi pada frame pertama sequence (negatif)
  u: number; // 0..1 posisi di dalam narasi
  slot: Slot;
};

const Ctx = createContext<T | null>(null);

export const useT = (): T => {
  const v = useContext(Ctx);
  if (!v) throw new Error('useT harus di dalam scene');
  return v;
};

const Shell: React.FC<{slot: Slot; children: React.ReactNode}> = ({slot, children}) => {
  const f = useCurrentFrame();
  const n = f - slot.lead;
  const d = slot.dur / FPS;
  const t = n / FPS;
  const t0 = -Math.max(slot.lead / FPS, 0.05);
  const u = Math.min(1, Math.max(0, n / slot.dur));
  return (
    <Ctx.Provider value={{f, n, t, d, t0, u, slot}}>
      <AbsoluteFill>{children}</AbsoluteFill>
    </Ctx.Provider>
  );
};

/** Membungkus isi scene dengan konteks waktu. index = urutan scene (0 untuk Scene1). */
export const defineScene = (index: number, Content: React.FC): React.FC => {
  const slot = SLOTS[index];
  const Scene: React.FC = () => (
    <Shell slot={slot}>
      <Content />
    </Shell>
  );
  return Scene;
};
