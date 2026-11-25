# video-remotion-pld

Plugin Claude untuk membuat proyek video motion grafis pembelajaran dengan Remotion.
AI membuat proyeknya (zip). Anda yang menjalankan dan merender sendiri di Codespace.

## Pasang (sekali saja)

Di Claude Code (terminal):

    /plugin marketplace add etdkpi2/video-remotion-pld
    /plugin install video-remotion-pld@video-remotion-pld

Di aplikasi Claude: Personal plugins > Add marketplace > Add from a repository > isi `etdkpi2/video-remotion-pld`, lalu pasang plugin-nya.
Repo privat: akun GitHub yang dipakai harus punya akses ke repo ini.

## Pakai

1. Buka chat baru. Lampirkan script (teks), voice over (mp3), dan subtitle (srt).
2. Tulis: "Buatkan video motion grafis dari bahan ini."
3. Claude merangkum bahan, lalu menawarkan 3 opsi gaya. Jawab misalnya: "Opsi 2, SFX tidak, karakter ya".
4. Claude membuat proyek, memeriksa beberapa gambar diam, dan mengirim zip.
5. Ikuti panduan pasang yang ikut dalam zip (Codespace: unggah zip, unzip, `npm install`, `npm run dev`, render sendiri).

## Isi

- `plugin/skills/video-remotion-pld/SKILL.md`: alur kerja
- `.../templat/`: kerangka proyek Remotion
- `.../references/`: aturan umum, pustaka gaya, panduan karakter, peta SFX, panduan pendampingan
- `.../assets/`: karakter (30 PNG), SFX (29 WAV), logo Indomaret

## Aturan tetap

Claude tidak merender video dan tidak push ke GitHub. Gambar diam untuk pemeriksaan boleh.
Outro tidak dipakai. Karakter tidak bergerak sendiri; opsi tanpa karakter tersedia.
