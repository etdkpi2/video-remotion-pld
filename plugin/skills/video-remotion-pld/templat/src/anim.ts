import {Easing, interpolate, spring} from 'remotion';
import {FPS} from './timing';

export const clamp01 = (x: number): number => Math.min(1, Math.max(0, x));
export const lerp = (a: number, b: number, k: number): number => a + (b - a) * k;
export const rad = (deg: number): number => (deg * Math.PI) / 180;

const easeIO = Easing.bezier(0.4, 0, 0.2, 1);
const easeOut = Easing.bezier(0.16, 1, 0.3, 1);

/** Kemajuan 0..1 dari detik a ke b (ease in-out). */
export const ramp = (t: number, a: number, b: number): number => easeIO(clamp01((t - a) / (b - a)));
/** Seperti ramp tetapi cepat di awal lalu melambat. */
export const rampOut = (t: number, a: number, b: number): number => easeOut(clamp01((t - a) / (b - a)));
/** Linear tanpa easing. */
export const lin = (t: number, a: number, b: number): number => clamp01((t - a) / (b - a));

/** Pegas 0..~1 mulai pada detik `at`. damping kecil = membal. */
export const pop = (t: number, at: number, damping = 12): number =>
  spring({frame: Math.max(0, Math.round((t - at) * FPS)), fps: FPS, config: {damping, stiffness: 140}});

/** Nilai pada kunci waktu (detik naik tegas). */
export const keys = (t: number, ts: number[], vs: number[]): number =>
  interpolate(t, ts, vs, {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: easeIO});
