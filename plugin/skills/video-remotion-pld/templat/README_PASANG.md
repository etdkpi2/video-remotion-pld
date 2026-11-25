# Cara pasang (ringkas)

Ganti README ini dengan ringkasan video (judul, jumlah scene, durasi, gaya, karakter dan SFX yang dipakai), lalu biarkan bagian di bawah.

1. Unggah zip ke panel Penjelajah (Explorer) di GitHub Codespaces, di area kosong di bawah daftar file.
2. Buka zip dan pasang:
   ```
   unzip -o NAMAFILE.zip
   rm NAMAFILE.zip
   npm install
   ```
3. Jalankan Studio:
   ```
   npx remotion studio src/index.ts --force-new
   ```
4. Di Studio pilih "Main", klik di area video, tekan spasi untuk memutar.
5. Render: klik Render, pilih Main, codec H.264. Atau lewat terminal:
   ```
   npx remotion render src/index.ts Main out/video.mp4
   ```
