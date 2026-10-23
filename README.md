# VELKIRA-AGENCY

Landing page statis berbahasa Indonesia. Tidak membutuhkan instalasi dependency atau proses build.

## Menjalankan
Buka index.html di browser, atau dari folder ini jalankan: npx --yes http-server . -p 4173 (membutuhkan Node dan internet saat instalasi pertama). Semua aset utama lokal; font eksternal memiliki fallback Arial.

## Mengubah isi
- index.html: teks, layanan, FAQ, dan detail konsep.
- styles.css: palet pada :root dan layout responsif.
- config.js: WhatsApp internasional tanpa +, email, dan data publik lainnya. Email kosong disembunyikan. Instagram belum ditampilkan.
- assets/brand/mark.svg: monogram interpretasi sederhana, bukan ekstraksi logo final.
- assets/concepts/: tiga ilustrasi antarmuka SVG asli yang dibuat untuk proyek ini.

Kontak umum tetap dapat dibuka tanpa JavaScript. Jika mengganti nomor, perbarui juga fallback WhatsApp di index.html. Detail konsep tampil inline tanpa JavaScript dan sebagai modal dengan JavaScript. Tidak ada AI aktif, penyimpanan, formulir, atau pengiriman otomatis.

## Deploy
Upload index.html, styles.css, script.js, config.js dan folder assets ke hosting statis, atau pilih direktori ini sebagai publish directory tanpa build. Tambahkan canonical dan URL gambar OG absolut setelah domain final tersedia. Tidak ada push GitHub atau deploy yang dilakukan.

## Dokumentasi
Lihat dokumen/ untuk keputusan desain, riwayat perubahan, pengujian, dan kebutuhan rilis. Untuk perubahan berikutnya, tambahkan catatan bertanggal beserta file yang berubah dan hasil pemeriksaan.

## Animasi
animations.js mengatur kemunculan hero dan bagian saat scroll tanpa dependency. Durasi dan jarak ada pada fungsi enter. Efek hover/modal/FAQ berada di bagian akhir styles.css, dibatasi prefers-reduced-motion. JavaScript dimatikan atau dukungan animasi tidak tersedia: semua isi tetap terlihat. Sertakan animations.js saat upload ke hosting.

