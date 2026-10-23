# Redesain mengikuti referensi Nore — 24 Oktober 2026

## Referensi
- https://nore.web.id/ — dilihat langsung melalui halaman dan screenshot. Diadaptasi: hero dominan, jasa yang mudah dipindai, karya yang terlihat jelas, dan kontak yang menonjol.
- https://www.basicagency.com/ — referensi pendamping untuk hierarki karya dan pendekatan editorial.

## Perubahan
- Menulis ulang styles.css untuk sistem visual yang konsisten, menggantikan lapisan penyempurnaan sebelumnya.
- Mengganti hero dengan headline tebal dan mockup website serta aplikasi berbasis HTML/CSS. Seluruh visual adalah konsep internal.
- Memakai warna brand Velkira: ivory, hitam, sage, mocha, dan gold.
- Menyusun layanan dalam tiga kolom desktop dan baris vertikal mobile, mengikuti arah visual terbaru pemilik. Website Development tetap layanan utama.
- Memperbesar showcase utama dan mempertahankan dua konsep pendamping, detail, kategori, serta lingkup.
- Mengubah bagian proses menjadi bidang hitam dan bagian kontak menjadi sage dengan layout dua kolom desktop serta satu kolom mobile.
- Meningkatkan ukuran teks isi, menata ulang spasi, dan menyederhanakan bentuk tombol.
- Menambahkan versi pada URL stylesheet agar browser mengambil CSS baru.
- Mempertahankan WhatsApp 6285704834416, konteks pilihan, FAQ, menu mobile, modal, serta fallback tanpa JavaScript.
- Tidak menyalin ilustrasi, logo, harga, daftar klien, layanan tambahan, atau janji Nore.

## Arsip
Versi sebelumnya: arsip/2026-10-24-sebelum-redesain-nore/ berisi index.html, styles.css, dan script.js.

## Pemeriksaan aktual
- node --check script.js lulus.
- Self-check source/aset/anchor/satu H1 lulus.
- Self-check tujuan WhatsApp, enam konteks, reset ke pesan umum, serta kontak kosong/email valid lulus.
- QA visual dan keyboard pada browser lokal belum terverifikasi karena akses observasi localhost sebelumnya diblokir kebijakan browser. Tidak mencoba jalur lain untuk melewati pembatasan tersebut.
- CSS berisi breakpoint untuk desktop, tablet dan mobile; ini implementasi responsif, bukan bukti uji visual empat lebar telah lulus.
