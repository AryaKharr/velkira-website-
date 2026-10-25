# Hero editorial — 25 Oktober 2026

Perubahan: index.html, styles.css, config.js, hero-video.js, README.md, dan tests/hero-video.test.cjs.

Judul pembuka menjadi “Ide berani. Eksekusi berarti.” dengan aksen Cormorant Garamond dan teks Plus Jakarta Sans. Bingkai ilustrasi menggunakan lengkungan editorial, dengan ukuran responsif. Isi layanan, portofolio konsep, serta jalur kontak tetap tersedia.

Belum ada aset video milik Velkira dalam repositori. heroVideo dibiarkan kosong sampai video tersedia; tidak ada video stok yang dianggap sebagai karya agency. Saat dikonfigurasi, video muted dapat autoplay, dijeda, dan diputar manual. Reduced motion dan hemat data mencegah autoplay. Tab tersembunyi menghentikan playback. Autoplay yang ditolak mempertahankan tombol putar, sedangkan media gagal kembali ke ilustrasi.

Pemeriksaan: lima pengujian Node untuk konfigurasi kosong, kontrol putar/jeda, reduced motion/hemat data, media gagal/autoplay ditolak, dan perubahan preferensi/tab tersembunyi. Pemeriksaan sintaks dan git diff --check dijalankan. Preview visual browser serta pemutaran MP4 asli belum diuji karena browser dan aset video tidak tersedia dalam sesi ini. Font eksternal memakai fallback ketika tidak bisa dimuat.
