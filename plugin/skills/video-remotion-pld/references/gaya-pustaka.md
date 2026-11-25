# PUSTAKA GAYA VISUAL

Dipakai di langkah 2 alur skill (tawarkan 3 opsi): Opsi 1 dan 2 diambil dari gaya di bawah (yang paling cocok dengan isi script), Opsi 3 adalah konsep baru buatan AI.
Gaya yang tidak terpilih diabaikan. Gaya B (Jurnal Penjelajah) sengaja tidak ada karena butuh tekstur cat air yang tidak bisa dibuat dengan kode.

Cara menambah gaya baru: tambahkan satu blok `[GAYA X: NAMA]` di bawah dengan isi yang sama polanya
(gaya dasar, palet hex, font, elemen khas, transisi, kamera). Tidak perlu mengubah instruksi proyek.

---

[GAYA A: KOTA MALAM FLAT]
Vektor 2D tanpa outline. Navy langit #0F1839, navy lantai #1B244E, navy tinta
#090F2D, navy tengah #363666, navy jauh #424272, aksen #D87554 (gelap #B65A3E),
kuning sorot #FFC900, krem #F9E4C6, putih #FFFFFF, merah peringatan #D83036
(hanya bahaya). Proporsi: ±70% navy, ±15% warna suasana, ±10% aksen dan krem,
kuning <= 5% per frame. Suasana bergeser: tenang (navy) -> aktif (oranye) ->
masalah (asap kelabu) -> penutup (senja). Font: Montserrat ExtraBold/Black
kapital; bayangan teks navy 60% (bukan stroke). Elemen khas: pita aksen berekor
lipat miring -3°, pill krem, kartu data krem dengan angka berhitung naik,
gelembung krem berisi "!" atau "?". Transisi khas: iris wipe aksen (tidak dua
kali berturut-turut), selingi push, zoom-through, match cut. Kamera: tenang
dengan parallax antar lapisan kota. Tiap scene punya sumber cahaya hangat.

[GAYA C: DIAGRAM PENAMPANG KERTAS]
Diagram ilmiah flat, terang, rasa kertas tempel: tepi putih seperti bevel,
bayangan lembut, potongan penampang. Palet: langit pucat #DCE4E6 -> #BECDD5,
slate #7D90A5, putih #F5F5F6, laut #348AAD, hijau #568F69, papan krem #E8E3DC,
kartu putih #F7F7F7, teks navy #1C3348, kuning penggaris #E8B850, merah aksen
#DA4439. Font: Bitter ExtraBold (judul, angka), Kalam Bold (catatan miring).
Elemen khas: alat ukur (penanda bulat merah, penggaris kuning tumbuh, garis
putus, angka berhitung naik sejalan dengan penggaris), stabilo di belakang
kata kunci, tag "cara #N", papan kesimpulan krem berisi kartu perbandingan.
Kamera: mengalir di dalam satu bagian, tenang saat informasi dibacakan.
Transisi antar bagian: diagram baru masuk dari ukuran besar lalu menyusut,
atau berputar 3D seperti kartu. Satu pengukuran per momen. Teks kecil >= 24 px.

[GAYA D: STIKER KAWAII SKALA]
Objek seperti stiker (garis tepi gelap tipis, bingkai putih tebal, bayangan
lembut) di atas kertas krem berpola bintang "+". Wajah kawaii hanya bila
nadanya ringan; untuk materi serius, stiker tanpa wajah. Palet: krem #E9DBC1,
bingkai #FAF5EC, malam navy #1B2242, biru #328CC8, hijau #64B43C, kuning
#F0BE50, oranye #E66414, merah #C83228, stabilo oranye #EE6F27, stabilo teal
#2E9C95, garis tepi #2C3336. Font: Archivo Black / Archivo ExtraBold (judul,
angka), Kalam Bold (catatan). Elemen khas: angka besar "diterjemahkan" dengan
pembanding sehari-hari, penghitung berjalan (kalender sobek, stopwatch) yang
selalu bersamaan dengan gerak objek (maksimal satu penghitung per momen),
penggaris kuning antar dua objek. Transisi: blur-larut, whip vertikal, mundur
memperlihatkan skala. Kamera: mengalir, melambat saat angka muncul.
