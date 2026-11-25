# PANDUAN PENDAMPINGAN (dipakai setelah zip dikirim)

Pandu saya sampai video jadi, SATU LANGKAH PER PESAN. Di tiap langkah tulis: (a) apa yang harus saya lakukan, (b) perintahnya (di blok kode, salin persis), (c) apa yang seharusnya muncul, (d) apa yang harus saya kirim balik. Lalu TUNGGU jawaban saya. Jangan memberi dua langkah sekaligus dan jangan lompat bila saya belum membalas.
Anggap saya pemula. Saya bekerja di GitHub Codespaces. Kamu tidak punya akses ke Codespace atau GitHub saya; saya yang menjalankan semua perintah. Jangan menyuruh saya push sebelum video dicek.

Tanyakan dulu: "Ini repositori/Codespace baru yang masih kosong, atau sudah ada video sebelumnya?" Bila sudah ada video lama, jalankan Langkah 2.

LANGKAH 1. Unggah zip
- Lakukan: seret file zip dari komputer ke panel Penjelajah (Explorer, kiri), di area kosong di bawah daftar file. Jangan dijatuhkan ke atas file atau nama folder.
- Perintah: ls
- Seharusnya: nama zip muncul di daftar.
- Kirim balik: hasil ls.

LANGKAH 2. Bersihkan sisa video lama (hanya bila ada video sebelumnya)
- Perintah: rm -rf src public
- Seharusnya: tidak ada pesan apa pun.

LANGKAH 3. Buka zip dan pasang
- Perintah (satu per satu, ganti NAMAFILE dengan nama zip yang sebenarnya):
    unzip -o NAMAFILE.zip
    rm NAMAFILE.zip
    npm install
- Seharusnya: unzip mencantumkan banyak file; npm install berakhir tanpa error (baris "found 0 vulnerabilities" atau sejenisnya).
- Kirim balik: 5 baris terakhir hasil npm install.
- Bila error "Cannot find module '@remotion/transitions'": jalankan npm install lagi dari folder proyek.

LANGKAH 4. Jalankan Studio
- Perintah: npx remotion studio src/index.ts --force-new
- Seharusnya: browser terbuka ke Remotion Studio. Bila tidak, klik tautan port 3000 di panel Ports. Di panel kiri Studio pilih "Main".
- Kirim balik: "Studio terbuka" atau pesan error-nya.
- Bila "No Remotion entrypoint was found": folder src belum terbentuk. Minta saya menjalankan ls dan ls src, lalu ulangi langkah 3.
- Bila "Already running ... --force-new": jalankan pkill -f remotion lalu perintah langkah 4 lagi.

LANGKAH 5. Cek logo
- Logo sudah ada di dalam zip (public/Logo_Indomaret.png) dan menyala otomatis. Bila di pesan pengantar kamu menyebut logo tidak bisa disalin, minta saya menyeret Logo_Indomaret.png ke folder public/, lalu cek src/flags.ts: ENABLE_LOGO harus true.
- Seharusnya: logo tampil di kanan atas video setelah Studio memuat ulang.
- Kirim balik: "logo muncul" atau screenshot.

LANGKAH 6. Periksa video
- Lakukan: pilih Main, klik di area video, tekan spasi untuk memutar. Perhatikan: gambar pas dengan kata, subtitle benar, tidak ada teks bertumpuk, logo muncul.
- Kirim balik: "oke", atau daftar masalah dengan nomor scene dan detiknya.
- Bila ada masalah: perbaiki, kirim zip baru, lalu ulangi dari langkah 2 (rm -rf src public lalu seterusnya).
- Ingatkan: suara bisa putus di pratinjau Studio karena berat; itu normal dan tidak terbawa ke hasil render. Bila Studio mati sendiri, Codespace tertidur: muat ulang halaman lalu jalankan lagi perintah langkah 4.

LANGKAH 7. Render
- Lakukan: di Studio klik Render, pilih Main, codec H.264, lalu "Render video". Tunggu sampai ada tanda centang hijau di panel Jobs. Video 2-3 menit pada 60 fps bisa makan puluhan menit; jangan tutup tab.
- Alternatif lewat terminal:
    npx remotion render src/index.ts Main out/video.mp4
- Seharusnya: file hasil render muncul di folder out/ di Penjelajah.
- Kirim balik: "render selesai".

LANGKAH 8. Cek hasil
- Lakukan: klik file hasil render di Penjelajah, putar, pastikan suara dan subtitle utuh dari awal sampai akhir. Unduh ke komputer (klik kanan, Download).
- Kirim balik: "hasil baik" atau masalahnya.

LANGKAH 9. Simpan ke GitHub (hanya setelah hasil baik)
- Perintah:
    git add .
    git commit -m "video jadi"
    git push
- Seharusnya: push berhasil tanpa error. File mp4 besar dapat membuat push lambat; itu normal.

Penutup: tanyakan apakah ada revisi. Bila ada, kembali ke langkah 6.
