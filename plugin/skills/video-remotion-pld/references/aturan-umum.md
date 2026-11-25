# ATURAN UMUM (berlaku untuk semua gaya, termasuk konsep baru)

Baca seluruhnya sebelum membangun scene.

## 1. Waktu dan teks
- SRT adalah sumber kebenaran untuk suara. Bila narasi di script berbeda dari yang diucapkan, pakai SRT.
- Tiap scene dimulai pada kata pertamanya di SRT dan selesai pada kata terakhirnya. Total video = akhir suara + ekor 0,5 detik. Semua dihitung dari data (`src/data/video.json`), tanpa angka mati.
- Isi `src/data/video.json` dari SRT: cue dengan waktu persis dari SRT, pemetaan cue ke scene berdasarkan ISI teks, daftar istilah asing, dan durasi mp3 dari ffprobe. `voFile` selalu `"vo.mp3"` (huruf kecil); pengguna wajib menamai file voice over persis begitu di `public/`.
- Teks di layar: kata sebelum ":" (Pita, Pill, Pill krem, Pill merah, Kartu, Sumber, Lencana) adalah JENIS komponen, bukan teks. Tampilkan hanya teks setelah ":".
- Transisi: fade, push, dan iris memakai TransitionSeries lewat `kind` di video.json. Transisi lain (zoom-through, match cut, pan, mundur kamera, dan sejenisnya) dibuat sebagai animasi di dalam scene dengan `kind: "cut"`.
- Animasi tiap scene jatuh pada kata yang sedang diucapkan (acuan: SRT), ditulis dalam `t` dari `useT()`.

## 2. Visual dan gerak
- Latar tidak pernah polos: berlapis dan penuh warna. Tekstur hanya di lapisan latar, tidak boleh menimpa teks, kartu, ikon, karakter, logo, atau subtitle.
- Tidak ada jeda visual: selama suara bicara, maksimal 2 detik tanpa kejadian visual baru (elemen masuk, berubah, disorot, atau kamera pindah).
- Label muncul 0 sampai 0,3 detik sebelum katanya diucapkan.
- Setiap elemen punya animasi masuk, gerak halus saat diam (melayang, bergoyang 1-2°), dan animasi keluar. Elemen dalam satu kelompok masuk bergantian (selisih 0,08-0,15 s).
- Minimal 3 jenis transisi per video; jenis yang sama tidak dipakai dua kali berturut-turut.
- Fokus lewat pop-up ±8% pada elemen yang sedang dibahas. Jangan meredupkan elemen lain. Maksimal 3 warna aksen per scene.
- Kontras: objek berwarna di depan latar ramai diberi garis tepi putih 5 px; grafik diletakkan di atas kartu putih.
- Istilah asing (training, update, briefing, KPI) dicetak miring, termasuk di subtitle (lewat `istilahAsing` di video.json). Nama merek dan singkatan unit kerja tetap tegak.
- Jangan pakai glyph di luar subset latin (misalnya panah): gambar sebagai SVG.
- Jangan pakai Math.random (pakai `random("seed")` dari remotion) dan jangan pakai animasi CSS. Animasi hanya lewat useCurrentFrame, spring, interpolate.

## 3. Zona aman
- Zona logo: tidak ada teks atau objek penting di x > 1580 dan y < 165.
- Zona subtitle: tidak ada teks atau objek penting di y > 760. Pengecualian: ujung kaki karakter boleh sampai y 930 (lihat `panduan-karakter.md`).

## 4. Karakter dan aset
- Karakter hanya bila pengguna menjawab ya. Bila tidak, JANGAN ada orang di video: pakai ilustrasi SVG, ikon, simbol, dan kartu sesuai gaya terpilih.
- Bila ya: orang di video SELALU memakai tiga tokoh PNG di `assets/karakter/` lewat komponen `Karakter` (sudah ada di `templat/`), mengikuti `references/panduan-karakter.md`. Jangan menggambar orang sendiri.
- Karakter TIDAK bergerak sendiri: tanpa gerak napas, goyang, atau gerak bicara. Yang boleh: muncul dan hilang halus (memudar dan naik sedikit, tanpa membal), dan ganti pose mengikuti isi kalimat (potong langsung, tanpa transisi). Jangan menggerakkan, memutar, atau meregangkan gambar karakter untuk memberi kesan hidup.
- Salin HANYA pose yang dipakai ke `public/karakter/` (nama file asli).
- Objek lain (ikon, benda, latar) digambar sendiri dengan SVG sesuai gaya terpilih. Gerak boleh pada objek SVG itu, bukan pada gambar karakter.

## 5. Logo
- Salin `assets/logo/Logo_Indomaret.png` ke `public/Logo_Indomaret.png` dan set `ENABLE_LOGO = true` di `src/flags.ts`. Bila filenya berformat WebP walau berekstensi .png, simpan ulang sebagai PNG asli.
- Tampil kanan atas, 223x78 px, margin 60 px (sudah diatur oleh Overlay di templat). Jangan digambar ulang. Lapisan paling atas, tidak ikut gerak kamera atau transisi.

## 6. Subtitle
- Diatur oleh Overlay di templat: Poppins SemiBold 600, 34 px, putih, garis tepi hitam 3 px, tanpa kotak atau pita, satu baris, baseline y=1000, rata tengah.
- Tugasmu: isi `cues[].text` di video.json dengan kata yang SAMA persis dengan SRT, penulisan dirapikan: potongan yang memulai kalimat baru diawali huruf kapital, titik hanya di akhir kalimat, "Bapak/Ibu" selalu kapital, ejaan baku. Potongan yang terlalu panjang dibagi otomatis oleh kode.

## 7. Outro
Tidak dipakai. Biarkan `ENABLE_OUTRO = false` di `src/flags.ts`.

## 8. Efek suara (SFX)
- Hanya bila pengguna menjawab ya. Baca `references/sfx-peta.md`.
- Pilih efek dari `assets/sfx/` yang cocok dengan kejadian visual (satu efek per kejadian, volume dan `durasi` sesuai tabel di `sfx-peta.md`), isi `src/data/sfx.json`, salin HANYA file yang dipakai ke `public/sfx/`, set `ENABLE_SFX = true`.
- Bila pengguna menjawab tidak, biarkan `sfx.json` berisi `[]` dan `ENABLE_SFX = false`.

## 9. Pemeriksaan sebelum mengirim
- `tsc` sampai bersih.
- Tabel awal tiap scene (detik) dan durasi total.
- Gambar diam hanya untuk 3-4 frame paling berisiko (scene paling ramai, scene dengan karakter, teks terpanjang). Periksa: zona logo dan subtitle, zona aman karakter, teks bertumpuk, teks muat di kotaknya, kontras cukup, latar penuh, subtitle terbaca. Perbaiki semua temuan dalam satu putaran.
- JANGAN merender video. Jangan push atau mengubah GitHub.
- Bila font Google tidak bisa dimuat di ruang kerjamu, untuk gambar uji pakai salinan sementara dengan font sistem; jangan ubah `fonts.ts` di zip.
