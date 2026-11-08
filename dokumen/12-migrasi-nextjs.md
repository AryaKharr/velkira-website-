# Migrasi Next.js dan penyederhanaan desain

25 Oktober 2026. Permintaan: struktur lebih mudah dikembangkan serta tampilan dan bahasa yang tidak terasa seperti template AI generik.

## Implementasi

- Next.js App Router dengan React dan output statis. Komponen server menyajikan isi; komponen client hanya untuk menu, kontrol video, serta pilihan layanan kontak.
- Konten layanan, kontak, proses, dan FAQ terpusat di app/content.mjs.
- Manrope dan Inter melalui next/font, disajikan sendiri bersama hasil build.
- Palet Forest, Lime, Chalk, Mist Blue, dan Sage dipertahankan.
- Hero memakai visual SunDays yang relevan; video abstrak, doodle bintang, kartu melayang, slogan Inggris umum, serta tiga mockup ilustratif tidak ditampilkan pada halaman utama.
- SunDays menjadi karya utama yang bisa langsung dijelajahi. Klaim proyek klien, statistik, atau testimoni baru tidak dibuat. Penjelasan proyek konsep dan foto AI dipertahankan.
- Layanan otomatisasi/AI tetap tersedia, dengan batas penggunaan dijelaskan. Penghapusan kesan AI adalah perubahan desain dan copy, bukan penghilangan informasi sumber aset.
- Demo SunDays tetap mandiri di public/demos/sunsdays/. Tautan balik ke ../../#portofolio bekerja di dev Next.js dan hosting statis.
- Source lama dipindah ke dokumen/arsip/2026-10-25-sebelum-nextjs/. Paket hosting sekarang hanya memuat out/.

## Penggunaan

`npm run dev`: pengembangan di port 3000. `npm run build`: ekspor ke out/. `npm test`: validasi konten, encoding kontak, kebijakan video, aset/anchor hasil ekspor, serta server preview. `npm run preview`: hasil ekspor pada port 4175. `package-site.ps1`: ZIP deployment.

## Batas

API server, autentikasi server, CMS, dan database tidak ditambahkan. Kebutuhan server dinilai kembali ketika fitur tersebut diminta. Snapshot HTML lama, dokumentasi historis, serta kredit aset bukan source halaman aktif.

Rujukan: https://nextjs.org/docs/app/guides/static-exports dan https://developers.cloudflare.com/pages/framework-guides/nextjs/deploy-a-static-nextjs-site/.

## Validasi akhir

- Next.js 16.4.3, React 19.3.1, dependency terkunci di package-lock.json. Instalasi melaporkan nol kerentanan.
- npm run build berhasil menghasilkan output statis.
- Lima tes lolos: encoding kontak, kebijakan autoplay, struktur konten, aset/anchor hasil ekspor, dan HTTP preview termasuk penolakan path di luar out/.
- HTTP dev port 3000 dan hasil produksi port 4175 mengembalikan 200 dengan konten Velkira/SunDays.
- Paket hosting diperbarui: 58 file, 2.052.268 byte, menyertakan _next dan demo SunDays.
- git diff --check lolos.
- Pemeriksaan visual/interaksi baru melalui browser terhenti karena Computer Use tidak bisa memastikan URL Windows. Tidak memakai jalur otomasi browser lain sebagai pengganti. Pemeriksaan HP fisik dan deployment publik belum dilakukan.
