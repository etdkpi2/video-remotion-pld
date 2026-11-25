# PANDUAN PENDAMPINGAN (dipakai setelah proyek dikirim)

TULIS SEMUA LANGKAH SEKALIGUS dalam satu pesan, urut dari 1 sampai 8, dengan perintah di blok kode yang siap disalin. Gunakan nama zip dan nama file voice over yang sebenarnya (jangan tulis NAMAFILE). Anggap pengguna pemula yang bekerja di GitHub Codespaces. Kamu tidak punya akses ke Codespace atau GitHub pengguna; pengguna yang menjalankan semua perintah. Jangan menyuruh push sebelum video dicek. Setelah daftar, minta pengguna mengirim hasil atau pesan error dari langkah yang gagal, lalu bantu perbaiki.

LANGKAH 1. Hapus video lama
- Bila Codespace sudah berisi video sebelumnya (ada folder `src` dan `public`): `rm -rf src public`. Peringatkan bahwa ini menghapus video lama; simpan dulu bila belum di-push dan masih dibutuhkan.

LANGKAH 2. Unggah zip
- Seret zip dari komputer ke panel Explorer (kiri), di area kosong di bawah daftar file, bukan ke atas file atau folder. Cek dengan `ls`, nama zip harus muncul.

LANGKAH 3. Buka zip dan pasang
    unzip -o NAMA.zip
    rm NAMA.zip
    npm install
- Hasil baik: `found 0 vulnerabilities`. Peringatan `npm warn install-scripts` tentang esbuild boleh diabaikan.
- Bila error "Cannot find module '@remotion/transitions'": jalankan `npm install` lagi dari folder proyek.

LANGKAH 4. Salin voice over ke folder public
- Logo, karakter, dan SFX yang dipakai sudah ada di dalam zip. Yang perlu disalin hanya file voice over: seret ke folder `public` di Explorer.
- NAMA FILE VOICE OVER: harus sama persis, termasuk HURUF KECIL, dengan `voFile` di `src/data/video.json` (biasanya `vo.mp3`). Linux membedakan huruf besar dan kecil: `vo.MP3` tidak akan ditemukan. Bila perlu: `mv public/vo.MP3 public/vo.mp3`. Cek dengan `grep -n "voFile" src/data/video.json` dan `ls public`.
- Cek semua aset: `ls public public/karakter`.

LANGKAH 5. Jalankan Studio
    npx remotion studio src/index.ts --force-new
- Buka tautan port 3000 di panel Ports, lalu pilih "Main" di panel kiri Studio.
- Bila "No Remotion entrypoint was found": folder `src` belum terbentuk; jalankan `ls` dan `ls src`, lalu ulangi langkah 3.
- Bila "Already running ... --force-new": `pkill -f remotion` lalu jalankan perintah langkah 5 lagi.

LANGKAH 6. Periksa video
- Klik di area video, tekan spasi. Perhatikan: gambar pas dengan kata, subtitle benar, tidak ada teks bertumpuk, logo muncul di kanan atas, suara terdengar. Suara bisa putus di pratinjau karena berat; itu normal dan tidak terbawa ke hasil render. Bila Studio mati sendiri, Codespace tertidur: muat ulang halaman lalu jalankan lagi langkah 5.
- Bila ada masalah: kirim daftar masalah dengan nomor scene dan detiknya. Kamu memperbaiki dan mengirim proyek baru; ulangi dari langkah 1.

LANGKAH 7. Render
    npx remotion render src/index.ts Main out/video.mp4
- Alternatif di Studio: Render, pilih Main, codec H.264. Video 2-3 menit pada 60 fps bisa puluhan menit; jangan tutup tab. Hasil ada di folder `out/`; putar, lalu unduh (klik kanan, Download).

LANGKAH 8. Simpan ke GitHub (hanya setelah hasil baik)
    git add .
    git commit -m "video jadi"
    git push

Penutup: tanyakan apakah ada revisi. Bila ada, kembali ke langkah 6.
