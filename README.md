# Velkira — Digital Agency & Interactive Portofolio

Website resmi dan showcase portofolio digital agency **Velkira**, dibangun menggunakan **Next.js (App Router)** dan **React** dengan konfigurasi **Static HTML Export**.

Repository ini memuat seluruh aset agency beserta proyek demo interaktif dalam satu kesatuan arsitektur website statis.

---

## 🌟 Fitur & Halaman Proyek

Proyek ini mencakup 3 pengalaman website terintegrasi:

1. **Velkira Agency (Halaman Utama)**
   - Landing page modern, elegan, dan berorientasi konversi.
   - Menggunakan palet khas: *Forest*, *Electric Lime*, *Chalk*, *Mist Blue*, dan *Sage*.
   - Navigasi responsif, pemutar showcase video performa tinggi, FAQ interaktif, serta integrasi kontak WhatsApp bisnis terstruktur.

2. **SunDays Coffee Shop Concept (`/demos/sunsdays`)**
   - Halaman showcase portofolio kafe mandiri.
   - Menu dinamis (Coffee, Non-Coffee, Bites), visual editorial, dan navigasi bolak-balik ke portofolio utama.

3. **Luma Support — Workflow Assistant (`/demos/luma-support`)**
   - Simulasi interaktif dashboard penanganan tiket dan customer care e-commerce.
   - Skenario percakapan, eskalasi tiket admin, pencatatan tindak lanjut, dan ringkasan metrik berbasis client-side state reducer.

---

## 🛠️ Tech Stack & Arsitektur

- **Framework**: Next.js 16 (App Router)
- **Library**: React 19
- **Export Mode**: Static HTML/CSS/JS Export (`output: 'export'`)
- **Styling**: Native CSS modern & CSS Modules, tipografi teroptimasi *Manrope* & *Inter* via `next/font`
- **Zero Database Requirement**: Tidak memerlukan server backend/database dinamis; siap disajikan langsung melalui CDN/Edge Hosting modern seperti Vercel atau Cloudflare Pages.

---

## 📁 Struktur Folder

```text
├── app/                      # Next.js App Router (Halaman & Komponen)
│   ├── components/           # SiteHeader, ShowcaseVideo, Contact
│   ├── demos/luma-support/   # Demo interaktif Luma Support
│   ├── content.mjs           # Data teks terpusat (layanan, FAQ, kontak)
│   ├── layout.js             # Root Layout & Font loader
│   └── page.js               # Halaman utama Velkira
├── public/                   # Aset statis publik
│   ├── assets/               # Logo brand, video, dan ilustrasi konsep
│   └── demos/sunsdays/       # Website demo SunDays mandiri
├── out/                      # Hasil build produksi statis (siap deploy)
├── release/                  # File arsip ZIP untuk direct upload hosting
├── dokumen/                  # Dokumentasi arsitektur, panduan, dan QA
└── tests/                    # Unit testing (Node test runner)
```

---

## 🚀 Panduan Menjalankan di Lokal

### Prasyarat
- **Node.js**: Versi `20.9.0` atau yang lebih baru.
- **npm**: Bawaan Node.js.

### 1. Instalasi Dependensi
```bash
npm ci
```

### 2. Menjalankan Server Pengembangan (Dev)
```bash
npm run dev
```
Buka browser dan akses: [http://127.0.0.1:3000](http://127.0.0.1:3000).

### 3. Menjalankan Tes Validasi
```bash
npm test
```
Memverifikasi validasi struktur konten, routing anchor, encoding WhatsApp, dan isolasi simulasi skenario.

### 4. Build untuk Produksi
```bash
npm run build
```
Hasil build lengkap akan digenerate ke dalam folder `out/`.

### 5. Pratinjau Hasil Build (Preview)
```bash
npm run preview
```
Membuka server pengujian lokal di [http://127.0.0.1:4175](http://127.0.0.1:4175).

---

## 🌐 Panduan Deployment & Custom Domain

### Rilis cepat ke GitHub dan Vercel

Jalankan dari root repo setelah perubahan selesai. `origin` adalah
`AryaKharr/velkira-website-`; proyek Vercel untuk domain utama adalah
`velkira-website` pada tim `aryas-projects-e3577003`.

```powershell
npm test
npm run build
git status --short
git add <file-yang-diubah>
git commit -m "Jelaskan perubahan"
git push origin main
vercel link --yes --project velkira-website  # cukup sekali per komputer
vercel deploy --prod --yes
```

Deploy berhasil jika CLI menampilkan `readyState: READY` dan alias
`https://www.velkira.site`. Buka domain tersebut tanpa login untuk memastikan
perubahan terlihat. Simpan `.vercel/` dan `.env.local` hanya di komputer lokal;
keduanya sudah diabaikan oleh Git. Jangan menambahkan log build atau aset lokal
yang belum diperiksa ke commit.

---

## 📄 Lisensi & Hak Cipta

© 2026 Velkira. Hak cipta dilindungi undang-undang.
Seluruh aset visual, merek konsep, dan materi editorial dibuat untuk keperluan portofolio Velkira Agency.
