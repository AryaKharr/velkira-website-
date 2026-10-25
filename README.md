# VELKIRA-AGENCY

Landing page statis berbahasa Indonesia. Tidak membutuhkan instalasi dependency atau proses build.

## Menjalankan
Buka `index.html` di browser, atau dari folder ini jalankan: `npx --yes http-server . -p 4173` (membutuhkan Node dan internet saat instalasi pertama). Semua aset utama lokal; font eksternal memiliki fallback Arial.

## Mengubah isi
- index.html: teks, layanan, FAQ, dan detail konsep.
- styles.css: palet forest, lime, dan mist blue pada :root serta layout responsif.
- config.js: WhatsApp internasional tanpa +, email, dan data publik lainnya. Email kosong disembunyikan. Instagram belum ditampilkan.
- assets/brand/mark.svg: monogram interpretasi sederhana, bukan ekstraksi logo final.
- assets/concepts/: tiga ilustrasi antarmuka SVG asli yang dibuat untuk proyek ini.
- demos/sunsdays/: salinan website konsep coffee shop SunDays, ditautkan dari kartu pertama portofolio. Tautan kembali menuju portofolio Velkira. Jika proyek sumber SunDays diperbarui, sinkronkan salinan demo ini.

Kontak umum tetap dapat dibuka tanpa JavaScript. Jika mengganti nomor, perbarui juga fallback WhatsApp di index.html. Detail konsep tampil inline tanpa JavaScript dan sebagai modal dengan JavaScript. Tidak ada AI aktif, penyimpanan, formulir, atau pengiriman otomatis.

## Deploy

Paket unggahan siap di `release/velkira-sundays-hosting.zip`. Panduan hosting gratis lengkap: [Cloudflare Pages](dokumen/10-hosting-gratis-cloudflare.md). Buat ulang ZIP setelah mengubah file website; folder release diabaikan Git.
Upload index.html, styles.css, script.js, animations.js, hero-video.js, config.js serta folder assets dan demos ke hosting statis, atau pilih direktori ini sebagai publish directory tanpa build. Tambahkan canonical dan URL gambar OG absolut setelah domain final tersedia. Repository: [VELKIRA-AGENCY](https://github.com/aryapulosari-design/VELKIRA-AGENCY). Push ke GitHub tidak otomatis melakukan deploy hosting.

## Dokumentasi
Lihat dokumen/ untuk keputusan desain, riwayat perubahan, pengujian, dan kebutuhan rilis. Untuk perubahan berikutnya, tambahkan catatan bertanggal beserta file yang berubah dan hasil pemeriksaan.

## Video pembuka

Video abstrak lokal `assets/video/blue-waves.mp4` sudah terhubung melalui `heroVideo` pada config.js. Video 7 detik dari Mixkit berukuran sekitar 2,6 MB; sumber dan lisensi tercatat di `assets/video/SOURCE.md`. Ini footage dekoratif, bukan showreel atau karya klien. Untuk mengganti, isi path MP4 baru dan perbarui gambar poster di index.html. Gunakan loop singkat yang sudah dikompres, idealnya tanpa audio. Video diputar muted dengan kontrol jeda/putar; reduced motion dan hemat data mencegah autoplay. Kegagalan video menampilkan poster kembali. Uji logika dengan `node --test tests/hero-video.test.cjs`.

Judul menggunakan Manrope dan teks menggunakan Inter dari Google Fonts dengan fallback Arial. Palet khusus Velkira memakai Forest, Electric Lime, Chalk, Mist Blue, dan Sage. Panduan warna dan pemakaian Instagram ada di dokumen/09-identitas-velkira.md.

## Animasi
animations.js mengatur kemunculan hero dan bagian saat scroll tanpa dependency. Durasi dan jarak ada pada fungsi enter. Efek hover/modal/FAQ berada di bagian akhir styles.css, dibatasi prefers-reduced-motion. JavaScript dimatikan atau dukungan animasi tidak tersedia: semua isi tetap terlihat. Sertakan animations.js saat upload ke hosting.

