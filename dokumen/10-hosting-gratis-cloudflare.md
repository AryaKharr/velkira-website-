# Hosting gratis Velkira + SunDays

Diperbarui pada 25 Oktober 2026 setelah migrasi Next.js. Pilihan yang dipakai: **Cloudflare Pages, paket Free, dengan Direct Upload**. Source sekarang memakai Next.js; jalankan build lokal terlebih dahulu. Hasilnya tetap HTML/CSS/JavaScript statis dan tidak membutuhkan database.

## 1. Siapkan file

Gunakan `release/velkira-sundays-hosting.zip`. ZIP ini memuat halaman agency, aset, dan demo coffee shop SunDays dalam satu website. `index.html` berada langsung di akar ZIP. Folder .git, dokumen internal, pengujian, dan arsip tidak dimasukkan.

Sebelum membuat atau memperbarui ZIP:

```sh
npm ci
npm run build
npm test
```

Lalu jalankan `.\package-site.ps1` melalui PowerShell. ZIP diambil dari folder `out/`, bukan folder source. Jika menggunakan Git integration sebagai pengganti unggahan manual, build command adalah `npm run build` dan build output directory adalah `out`.

Struktur penting:

```text
index.html
_next/
assets/
demos/
  sunsdays/
    index.html
    styles.css
    script.js
    assets/
```

## 2. Buat akun dan proyek

1. Buka [dashboard Cloudflare](https://dash.cloudflare.com/sign-up), buat akun, lalu verifikasi email bila diminta.
2. Masuk ke **Workers & Pages**.
3. Pilih **Create application**, lalu cari bagian **Pages** atau **Get started**, dan pilih **Drag and drop your files**. Pilih alur Pages/unggah aset; tidak perlu menghubungkan GitHub untuk metode ini.
4. Masukkan nama proyek, misalnya `velkira-agency`. Gunakan nama alternatif bila tidak tersedia.
5. Unggah ZIP yang sudah disiapkan. Cloudflare menerima ZIP maupun satu folder aset melalui dashboard.
6. Pilih **Deploy site** atau **Save and Deploy**, lalu tunggu sampai deployment sukses.
7. Buka URL `https://NAMA-PROYEK.pages.dev` yang diberikan dashboard. Nama ini contoh, bukan alamat yang sudah saya daftarkan.

Urutan dan label menu dapat berbeda menurut pembaruan dashboard. [Panduan resmi Direct Upload](https://developers.cloudflare.com/pages/get-started/direct-upload/) menjelaskan alur upload dan pembaruan deployment.

## 3. Periksa setelah terbit

- Buka halaman utama dari HP dan laptop.
- Klik kartu SunDays di portofolio; halaman demo harus bisa dibuka.
- Coba filter menu Coffee, Non-Coffee, dan Bites.
- Klik **Portfolio VELKIRA** di footer demo; harus kembali ke portofolio agency.
- Coba menu navigasi, FAQ, serta jeda/putar video.
- Pastikan WhatsApp mengarah ke nomor bisnis yang benar. Nomor saat ini berasal dari app/content.mjs.

Tidak perlu membuat hosting kedua untuk SunDays. Alamatnya berada di bawah domain yang sama, yaitu `/demos/sunsdays/index.html`; hosting dapat menampilkan URL bersih tanpa ekstensi HTML.

## 4. Biaya dan domain

Gunakan subdomain `pages.dev` agar tidak perlu membeli domain. Domain seperti `velkira.com` memerlukan kepemilikan/registrasi domain terpisah; ini opsional. Paket Free memiliki batas layanan, termasuk maksimum 25 MiB per aset. Paket ini berada jauh di bawah batas ukuran per file dan 1.000 file untuk unggahan dashboard. Lihat [batas resmi Pages](https://developers.cloudflare.com/pages/platform/limits/) dan [Direct Upload](https://developers.cloudflare.com/pages/get-started/direct-upload/#limits).

## 5. Memperbarui website

Setelah mengedit file lokal, jalankan `npm run build` dan `npm test`, lalu buat ulang ZIP dari folder Velkira-Website memakai PowerShell:

```powershell
.\package-site.ps1
```

Masuk ke proyek Pages yang sama, pilih **Create a new deployment**, pilih **Production**, unggah ZIP terbaru, lalu deploy. Setelah itu refresh browser dengan Ctrl+Shift+R bila masih melihat tampilan lama.

Skrip lokal package-site.ps1 membuat ulang ZIP dengan susunan folder yang sesuai dan memeriksa file wajib serta batas ukuran. Jika kebijakan PowerShell komputer memblokir skrip, unggah folder `out` langsung melalui dashboard. Pertahankan isi out, termasuk _next/, assets/, dan demos/.

Direct Upload memakai pembaruan manual. Untuk deployment otomatis dari GitHub nanti, buat proyek Pages baru dengan Git integration; proyek Direct Upload tidak dapat langsung dialihkan ke metode tersebut.

## Jika ada masalah

- **Halaman utama 404:** pastikan index.html langsung di akar ZIP, bukan terbungkus satu folder tambahan.
- **SunDays 404:** unggah paket lengkap yang menyertakan demos/sunsdays, bukan index.html agency saja.
- **Foto atau CSS hilang:** pertahankan nama file, kapitalisasi, dan susunan folder. Hindari URL localhost pada website publik.
- **Video tidak autoplay:** gunakan tombol Putar. Pengaturan browser, reduced motion, dan hemat data dapat mencegah autoplay; poster tetap tersedia.
- **Upload ditolak:** cek indikator file gagal, lalu unggah ulang paket utuh. Jangan menghapus aset yang masih dipakai HTML.

Paket sudah diperiksa lokal. Pendaftaran akun, penerbitan ke Cloudflare, dan pengujian URL publik belum dilakukan.
