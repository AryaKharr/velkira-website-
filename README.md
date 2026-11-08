# Velkira

Website agency berbahasa Indonesia dengan Next.js App Router dan React. Hasil build berupa file statis, sehingga tetap bisa diunggah ke Cloudflare Pages. SunDays berjalan di bawah domain yang sama pada `/demos/sunsdays/index.html`.

## Menjalankan

Gunakan Node.js 20.9 atau lebih baru.

```sh
npm ci
npm run dev
```

Buka http://127.0.0.1:3000. Perubahan konten dan komponen langsung diperbarui saat pengembangan.

## Mengedit

- `app/page.js`: susunan halaman dan proyek utama SunDays.
- `app/content.mjs`: nomor WhatsApp, email, layanan, langkah kerja, dan FAQ.
- `app/globals.css`: tipografi, palet Forest/Lime/Chalk/Mist/Sage, layout, dan breakpoint.
- `app/components/`: navigasi, pemutar video, dan pilihan layanan kontak.
- `app/layout.js`: metadata dan font Manrope/Inter melalui next/font. Font disajikan lokal setelah build; build pertama memerlukan akses unduhan font.
- `public/assets/brand/`: monogram dan papan palet Instagram.
- `public/demos/sunsdays/`: demo coffee shop mandiri; sinkronkan folder ini bila proyek SunDays sumber berubah. Link baliknya `../../#portofolio`.

SunDays merupakan proyek konsep internal. Foto konsep dibuat dengan AI, menu/harga ilustratif, dan tidak ada transaksi. Informasi tersebut tetap dicantumkan; perombakan visual menghapus slogan umum dan dekorasi yang tidak membantu, bukan kredit sumber aset.

## Build, pengujian, dan hosting

```sh
npm run build
npm test
npm run preview
```

Hasil build ada di `out/`. Preview hasil produksi: http://127.0.0.1:4175. `next start` tidak dipakai untuk output statis.

Untuk membuat ZIP hosting lewat PowerShell:

```powershell
.\package-site.ps1
```

Unggah `release/velkira-sundays-hosting.zip` ke satu proyek Cloudflare Pages. Skrip hanya mengambil hasil build `out/`, memeriksa file wajib serta batas file, dan tidak menyertakan source, arsip, atau node_modules.

Jika menggunakan Git integration Cloudflare Pages: build command `npm run build`, build output directory `out`. Root source Next.js tidak dapat langsung diunggah sebagai website statis. Panduan manual: [Hosting gratis](dokumen/10-hosting-gratis-cloudflare.md).

## Luma Support — Workflow Assistant

Demo interaktif tersedia di `/demos/luma-support/` dan ditautkan dari kartu Workflow Assistant. Navigasi Ringkasan, Inbox, dan Tiket dapat dicoba. Pilih salah satu dari tiga percakapan, jalankan simulasi atau tampilkan hasil langsung, lalu periksa tiket, ambil sebagai Admin Demo, simpan catatan tindak lanjut (5–280 karakter), dan tandai selesai. Catatan hanya disimpan dalam sesi browser; tidak dikirim ke pelanggan. Pencatatan ini untuk layanan pelanggan toko online umum, bukan penjualan atau stok. Ulangi skenario untuk menghapus hasil skenario itu, atau Ulangi Demo untuk mengembalikan seluruh data.

- `app/demos/luma-support/`: halaman, komponen dashboard, CSS Module, skenario, dan reducer simulasi.
- `dokumen/luma-support/BLUEPRINT.md`: PRD, arsitektur, model data, design system, checklist, dan hasil QA.
- `tests/luma.test.mjs`: pengujian alur FAQ, pencatatan, eskalasi, reset, dan ekspor.

Seluruh data fiktif dan respons pratulisan. Tidak ada AI aktif, backend, database, pengiriman pesan, atau penyimpanan lintas sesi. Memuat ulang halaman mengembalikan demo ke awal. JavaScript diperlukan untuk interaksi; mode tanpa JavaScript menyediakan penjelasan dan link kembali. Reduced motion langsung menampilkan hasil tanpa animasi bertahap.

## Batas arsitektur

`output: 'export'` tidak menjalankan API server, autentikasi server, atau fitur Next.js yang membutuhkan server saat request. Jika fitur itu benar-benar diperlukan nanti, ubah arsitektur deployment saat menambahnya. Website saat ini tidak membutuhkan backend, CMS, database, atau dependency animasi.

Source statis sebelumnya disimpan di `dokumen/arsip/2026-10-25-sebelum-nextjs/`. Arsip untuk referensi; aset aktif berada di public/. Jangan ikut mengunggah arsip.
