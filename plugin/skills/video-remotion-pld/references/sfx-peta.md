# PETA SFX (untuk file di `assets/sfx/`)

Dipakai hanya bila pengguna menjawab YA untuk efek suara. File ada di `assets/sfx/`; salin hanya yang dipakai ke `public/sfx/`.

Semua file WAV stereo 48 kHz, sudah dinormalkan ke puncak -1 dB, jadi jauh lebih keras dari suara narasi bila dipakai penuh. Volume bawaan di tabel dihitung dari kekerasan tiap file (file yang keras diberi volume kecil) dan memakai satuan `volume` Remotion 0 sampai 1. Di sini ditulis dengan koma; di JSON pakai titik (0.32). Mulai dari angka ini lalu turunkan bila menutupi narasi.

| File | Durasi (s) | Volume | Pakai untuk |
|---|---|---|---|
| 01_camera_flash | 0,52 | 0,33 | foto/bukti muncul, momen "klik" dokumentasi |
| 02_click | 0,28 | 0,17 | tombol ditekan, pilihan dipilih |
| 03_whoosh_digital | 0,59 | 0,23 | transisi digital, panel/kartu meluncur |
| 04_short_whoosh | 0,63 | 0,28 | elemen masuk cepat |
| 05_slide | 0,38 | 0,43 | geser pendek (push) |
| 06_enter | 0,23 | 0,39 | konfirmasi, centang |
| 07_fade_in | 1,91 | 0,31 | pembuka scene lembut, suasana |
| 08_cash | 0,90 | 0,73 | uang, biaya, angka rupiah |
| 09_whoosh_fast | 0,52 | 0,23 | zoom-through, gerak kamera cepat |
| 10_loading | 4,31 | 0,29 | proses berjalan; potong dengan `durasi` |
| 11_ting | 0,84 | 0,23 | ide, jawaban benar, highlight |
| 12_pop | 0,28 | 0,24 | elemen atau karakter muncul (pop) |
| 13_wrong_answer | 0,79 | 0,25 | salah, larangan, contoh buruk |
| 14_counter | 1,29 | 0,28 | angka berhitung naik |
| 15_typing | 1,64 | 0,74 | teks diketik, catatan ditulis |
| 16_aww | 1,56 | 0,36 | simpati, kekecewaan ringan |
| 17_beep | 0,35 | 0,09 | peringatan, notifikasi (SANGAT keras, jaga kecil) |
| 18_clean_fast | 0,49 | 0,32 | membersihkan, merapikan, menghapus |
| 19_data_transfer | 1,50 | 0,35 | data berpindah, unggah/unduh |
| 20_glitch | 0,95 | 0,09 | gangguan, sistem error (SANGAT keras, jaga kecil) |
| 21_keyboard_press | 0,25 | 0,37 | satu ketukan tombol |
| 22_mouse_click | 0,21 | 0,40 | klik mouse |
| 23_paper_slide | 0,56 | 0,29 | kertas/kartu/catatan masuk |
| 24_rewind | 2,66 | 0,30 | kilas balik; potong dengan `durasi` |
| 25_rm_click | 0,17 | 0,34 | klik pendek |
| 26_rm_whoosh | 0,84 | 0,24 | whoosh sedang, transisi antar bagian |
| 27_transition | 2,10 | 0,43 | pergantian bagian besar (iris wipe, ganti topik) |
| 28_glass_shatter | 0,80 | 0,55 | sesuatu pecah, gagal total, kejutan |
| 29_build_up | 1,68 | 0,31 | ketegangan naik menjelang poin penting |

## Aturan memakai SFX
- Satu efek per kejadian visual; jangan lebih dari satu efek per detik; jangan menumpuk dua efek pada detik yang sama.
- Letakkan efek 0 sampai 0,05 detik sebelum kejadian visualnya (`at` dalam detik absolut video = awal scene + `t` momen animasi; hitung dari tabel waktu).
- Jangan menaruh efek saat kata penting sedang diucapkan bila efeknya panjang atau berfrekuensi tinggi (whoosh panjang, beep, glitch). Geser ke jeda antar kalimat.
- Transisi antar scene: `fade` tanpa efek atau `07_fade_in`; `push`: `05_slide`; `iris`: `27_transition` (potong `durasi` 1,2) atau `26_rm_whoosh`; zoom-through: `09_whoosh_fast`.
- Efek panjang (`10_loading`, `24_rewind`, `27_transition`, `07_fade_in`) dipotong dengan `durasi` agar tidak melewati scene.
- Format di `src/data/sfx.json`: `{"at": 12.4, "file": "12_pop.wav", "volume": 0.23, "durasi": 0.3}`; file ada di `public/sfx/`. Salin hanya file yang dipakai.
- Beri tahu di ringkasan: daftar efek yang dipakai beserta detiknya, supaya mudah disesuaikan.
