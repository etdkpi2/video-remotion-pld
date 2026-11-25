// Saklar utama. Ubah di sini.

/** Logo_Indomaret.png harus ada di public/ (selalu disertakan di zip). */
export const ENABLE_LOGO: boolean = true;

/** true = suara public/vo.mp3 diputar. Waktu scene dan subtitle selalu dari SRT (src/data/video.json). */
export const ENABLE_VO: boolean = true;

/** Musik latar opsional: taruh public/musik.mp3 lalu ubah menjadi true. */
export const ENABLE_MUSIC: boolean = false;
export const MUSIC_FILE = 'musik.mp3';
export const MUSIC_VOLUME = 0.12;

/** Outro (public/outro.mp4): TIDAK dipakai untuk saat ini, biarkan false. Bila nanti dipakai, isi OUTRO_SECONDS dari durasi file (ffprobe). */
export const ENABLE_OUTRO: boolean = false;
export const OUTRO_FILE = 'outro.mp4';
export const OUTRO_SECONDS = 5;

/** Efek suara dari src/data/sfx.json. Hanya true bila pengguna memilih memakai SFX. */
export const ENABLE_SFX: boolean = false;
