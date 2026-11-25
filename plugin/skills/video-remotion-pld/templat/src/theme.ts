// Palet gaya yang dipilih. GANTI isi C sesuai palet gaya (nama kunci boleh ditambah).
export {WIDTH, HEIGHT, FPS} from './timing';
export {FONT_JUDUL, FONT_SUB} from './fonts';
export {ENABLE_LOGO, ENABLE_VO, ENABLE_MUSIC, MUSIC_FILE, MUSIC_VOLUME} from './flags';

export const C = {
  bg: '#0F1839',
  bg2: '#1B244E',
  ink: '#090F2D',
  accent: '#D87554',
  cream: '#F9E4C6',
  yellow: '#FFC900',
  white: '#FFFFFF',
  red: '#D83036',
} as const;

/** Mengurangi kecerahan warna hex (0..1). */
export const shade = (hex: string, k = 0.8): string => {
  const n = parseInt(hex.slice(1), 16);
  const r = Math.round(((n >> 16) & 255) * k);
  const g = Math.round(((n >> 8) & 255) * k);
  const b = Math.round((n & 255) * k);
  return `rgb(${r},${g},${b})`;
};
