# Templat proyek Remotion (kode dasar)

Sudah teruji: `tsc` bersih, subtitle dan karakter dicek lewat gambar diam. Salin SELURUH isi folder ini (kecuali file ini) ke proyek baru, lalu ganti hanya bagian yang boleh diganti. Remotion 4.0.545, React 19, TypeScript 5.9, 1920x1080, 60 fps.

## Boleh / harus diganti per video
- `src/data/video.json`: data video. WAJIB diisi dari SRT (skema di bawah).
- `src/data/sfx.json`: daftar efek suara, hanya bila pengguna memilih SFX. Bila tidak, biarkan `[]`.
- `src/theme.ts`: isi `C` dengan palet gaya terpilih (kunci `bg`, `bg2`, `accent`, `white` harus tetap ada; `accent` dipakai iris wipe).
- `src/fonts.ts`: ganti `FONT_JUDUL` sesuai font judul gaya. `FONT_SUB` (Poppins, tegak dan miring) JANGAN diganti.
- `src/flags.ts`: `ENABLE_SFX` (true bila SFX dipilih). `ENABLE_LOGO` tetap true. `ENABLE_OUTRO` tetap false.
- `src/scenes/*`: tulis ulang semua scene (Scene1.tsx dst) dan `src/scenes/index.ts`. Scene contoh hanya penunjuk pola.
- `src/components/*` tambahan (ikon, label, dekorasi) buatan sendiri.
- `package.json`: boleh ganti `name`.

## JANGAN diubah tanpa alasan kuat (bila terpaksa, catat di ringkasan)
`timing.ts`, `sceneTime.tsx`, `subtitles.ts`, `script.ts`, `transitions.tsx`, `Video.tsx`, `Root.tsx`, `components/Overlay.tsx`, `components/Karakter.tsx`, `data/karakter.json`, `anim.ts`.

## Skema `src/data/video.json`
- `judul`: judul video.
- `voFile`: `"vo.mp3"`; `voDuration`: durasi mp3 dalam detik (ukur dengan ffprobe).
- `istilahAsing`: istilah asing yang dicetak miring di subtitle (huruf kecil, tanpa duplikat).
- `scenes`: `[{ "id": 1, "kind": "cut" }, ...]` urut. `kind` = transisi MASUK ke scene itu: `fade`, `push`, `iris`, atau `cut` (`cut` = transisi dibuat sebagai animasi di dalam scene). Scene 1 selalu `cut`.
- `cues`: salinan SRT: `{ "scene": 1, "from": detik, "to": detik, "text": "..." }`. Waktu persis dari SRT. `text` memuat kata yang SAMA dengan SRT; hanya penulisan yang dirapikan. Setiap scene wajib punya minimal satu cue. Pemetaan cue ke scene berdasarkan ISI teks.

## Cara kerja waktu
- Awal scene = cue pertama scene (scene 1 mulai di frame 0). Akhir scene terakhir = `voDuration` + 0,5 detik. Semua dihitung dari data.
- Di dalam scene, `useT()` memberi `t` = detik sejak kata pertama scene. Semua momen animasi ditulis dalam `t`.
- Transisi `fade`, `push`, `iris` memakai TransitionSeries (30 frame, overlap). Scene `cut` mendapat pemanasan secukupnya.

## Karakter, SFX, logo
- Karakter: `<Karakter tokoh x y tinggi poses masuk keluar flip garis />`; PNG di `public/karakter/`. Karakter tidak bergerak sendiri. Aturan di `references/panduan-karakter.md`.
- SFX: `[{ "at": detik, "file": "12_pop.wav", "volume": 0.23, "durasi": 0.3 }]` (durasi opsional), file di `public/sfx/`. Volume dan durasi lihat `references/sfx-peta.md`.
- Logo: `public/Logo_Indomaret.png` (PNG asli) tampil otomatis di kanan atas.

## Struktur zip hasil
```
package.json, tsconfig.json, README_PASANG.md, .gitignore
public/  vo.mp3, Logo_Indomaret.png, karakter/ (pose yang dipakai), (sfx/ yang dipakai)
src/     (semua file di templat ini, scene sudah diganti)
```

## Catatan uji
- Bila font Google tidak bisa dimuat di ruang kerja (jaringan diblokir), saat membuat gambar diam pakai salinan proyek sementara dengan `fonts.ts` yang hanya mengekspor nama font sistem (`'Montserrat'`, `'Poppins'`). Jangan mengubah `fonts.ts` di zip.
- Gambar uji: bundle + renderStill dengan Chrome lokal, skala 0,5 cukup. Jangan merender video.
