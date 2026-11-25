# PANDUAN KARAKTER

Dibaca hanya bila pengguna memilih karakter. Karakter di video ini TIDAK bergerak sendiri: yang bergerak hanya pose yang berganti, serta muncul dan hilang yang halus.

## Isi aset (`assets/karakter/`)
Tiga tokoh, masing-masing 10 pose, PNG transparan, badan penuh. Nama file: `<tokoh>_<nomor>_<pose>.png`.

| Tokoh (id) | Penampilan | Tinggi asli | Ukuran |
|---|---|---|---|
| `pria_office` | pria, sweater ungu tua, kartu pengenal | ±1335 px | tajam sampai tampil ±1000 px |
| `wanita_office` | wanita, blazer biru tua, kemeja biru muda | ±1370 px | tajam sampai tampil ±1000 px |
| `pria_toko` | pria, seragam toko biru-merah-kuning | 462 px | tajam sampai tampil ±550 px |

Catatan: resolusi asli pria_toko lebih rendah. Komponen `Karakter` otomatis membatasi tinggi tampil tiap tokoh maksimal 1,2 kali tinggi aslinya (office ±1600 px, toko ±550 px), jadi gambar tidak pernah diperbesar sampai buram atau pecah. Bila `tinggi` yang diminta melebihi batas, karakter tampil sedikit lebih kecil; itu disengaja dan boleh. Jangan memperbesar atau memperkecil file PNG.

Pose (id): `menyapa`, `menjelaskan`, `menunjuk`, `berpikir`, `ide`, `setuju`, `menolak`, `bingung`, `memegang_alat`, `terima_kasih`.
`memegang_alat`: pria_office memegang tablet, wanita_office memegang papan jalan, pria_toko menulis di papan jalan.

## Pose untuk situasi apa
| Pose | Pakai saat |
|---|---|
| `menyapa` | pembuka, memperkenalkan diri atau topik, menyapa audiens |
| `menjelaskan` | menerangkan isi, langkah, atau definisi (tangan terbuka ke samping) |
| `menunjuk` | mengarahkan perhatian ke objek, kartu, atau angka di sebelahnya |
| `berpikir` | mengajukan pertanyaan, merenung, "bagaimana jika..." |
| `ide` | menemukan jawaban, tips, "ternyata...", poin penting |
| `setuju` | contoh benar, hasil baik, praktik yang dianjurkan |
| `menolak` | contoh salah, larangan, "jangan" |
| `bingung` | masalah, konflik, situasi tidak jelas |
| `memegang_alat` | bekerja, mencatat, memeriksa data, memakai perangkat |
| `terima_kasih` | penutup, ajakan, apresiasi |

Arah tangan di gambar asli: `menunjuk` semua tokoh menunjuk ke KANAN layar. `menjelaskan`: pria_office ke kanan, wanita_office dan pria_toko ke kiri. Gunakan `flip` bila objek ada di sisi sebaliknya.

## Cara memakai (komponen `Karakter`, file `src/components/Karakter.tsx` di templat)
```tsx
<Karakter
  tokoh="wanita_office"
  x={520} y={930} tinggi={760}            // x = tengah kaki, y = ujung sepatu
  masuk={0.3} keluar={9.5}                // detik sejak kata pertama scene (keluar opsional)
  poses={[
    {at: 0, pose: 'berpikir'},
    {at: 2.4, pose: 'ide'},                // jatuh pada kata kuncinya di SRT
    {at: 6.1, pose: 'menjelaskan'},
  ]}
  garis                                    // garis tepi putih, untuk latar ramai
/>
```
Opsi lain: `flip` (cermin), `bayangan` (bayangan lantai, default menyala).

Yang dikerjakan komponen otomatis: penyejajaran antar pose (data di `src/data/karakter.json`) supaya badan tidak melompat saat ganti pose, ganti pose dengan potong langsung (tanpa transisi, agar tidak ada bayangan ganda).

## Aturan pemakaian
1. Karakter selalu lewat komponen `Karakter`, bukan gambar mentah. Jangan menggerakkan, memutar, atau meregangkan gambar karakter untuk memberi kesan hidup.
2. Ganti pose hanya saat maknanya berubah (mengikuti kata kunci di SRT), dan beri selang minimal 2 detik antar pergantian.
3. Pose pertama sesuai suasana pembuka scene (misalnya `berpikir` saat pertanyaan); pose terakhir menutup kalimat (misalnya `setuju`).
4. Dua karakter atau lebih dalam satu scene: masuk bergantian (selisih 0,3 sampai 0,6 detik) dan pose berbeda. Maksimal 3 karakter per scene.
5. Satu tokoh dipakai konsisten untuk satu peran sepanjang video (misalnya atasan = pria_office, staf = wanita_office, karyawan toko = pria_toko).
6. Karakter berhadapan: satu dicermin dengan `flip`. Tulisan kecil di seragam ikut terbalik; hindari flip bila karakter tampil besar dekat kamera.
7. Pose yang dibutuhkan tidak ada (berjalan, duduk, menunduk, dan sebagainya): JANGAN menggambar karakter baru atau memodifikasi PNG. Pakai pose terdekat dan sampaikan maknanya lewat gelembung, ikon, atau label.
8. Tinggi tampil: office 640 sampai 820 px (satu karakter dominan hingga 900 px). Pria toko otomatis tidak lebih dari ±550 px; ukuran antar tokoh tidak perlu sama. Bila beberapa tokoh berdiri sejajar dan perbedaan tingginya mengganggu, kecilkan tokoh office (misalnya 560 px) agar sebanding dengan pria toko, bukan sebaliknya.
9. Zona aman: ujung sepatu `y` ≤ 930. Wajah dan tangan (termasuk tangan yang memegang tablet atau papan jalan) di atas y 760. Karakter tidak masuk zona logo (x > 1580 dan y < 165). Subtitle ada di y ±975 sampai 1005, jadi karakter jangan lebih rendah dari batas itu.
10. Taruh karakter di satu sisi (kiri atau kanan), isi informasi (kartu, label, grafik) di sisi lain. `menunjuk` atau `menjelaskan` harus mengarah ke elemen yang sedang dibahas.
11. Gaya apa pun, karakter tetap memakai PNG ini (tidak digambar ulang). Gaya yang tanpa garis tepi tetap boleh memakai `garis` bila latar ramai. Gaya Diagram (C) boleh memakai karakter kecil sebagai pemandu di tepi.

## Aset dalam zip hasil
Salin HANYA file pose yang dipakai ke `public/karakter/` dengan nama file asli. Data penyejajaran dan resolusi asli ada di `src/data/karakter.json` (sudah di templat); karena itu file PNG dipakai apa adanya, tanpa diubah ukurannya.
