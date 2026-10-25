# Velkira — Forest / Forward

25 Oktober 2026. Palet baru dipilih khusus untuk arah visual Velkira, menggantikan navy–coral–ungu dari referensi Superlist. Tidak ada klaim bahwa kombinasi warna ini eksklusif atau belum pernah dipakai brand lain.

| Warna | HEX | Peran |
|---|---|---|
| Forest | #101B1A | Latar utama, teks di atas warna terang |
| Electric Lime | #D9F27E | Tombol utama, kata penting, aksen kampanye |
| Chalk | #F3F5EE | Teks terang, latar carousel edukasi |
| Mist Blue | #A8CAD6 | Kartu informasi, latar kontak, aksen sekunder |
| Sage | #A6B8AE | Teks pendukung di latar Forest, elemen pelengkap |

Gunakan Forest sekitar 60%, Chalk 25%, Lime 10%, dan Mist Blue 5% dalam satu komposisi. Sage menggantikan sebagian teks atau detail sesuai kebutuhan. Ini panduan awal komposisi, bukan aturan kaku untuk setiap posting.

## Instagram

- Cover atau promosi: Forest, judul Chalk, satu kata penting Lime.
- Carousel edukasi: latar Chalk, judul Forest, penanda halaman Forest atau Mist Blue.
- Informasi layanan dan kontak: latar Mist Blue dengan teks Forest.
- Gunakan maksimal tiga warna utama per posting. Lime sebagai penekanan agar tidak memenuhi seluruh feed.
- Hindari tulisan putih/Chalk di atas Lime, Mist Blue, atau Sage. Gunakan Forest pada latar terang.
- Referensi visual: assets/brand/velkira-palette.png, ukuran 1080 × 1350 px. Ini panduan palet; bukan template posting dengan safe area Instagram yang sudah diuji.

## Font

- Judul: Manrope Bold/ExtraBold, weight 700–800.
- Isi: Inter Regular/Medium, weight 400–500.
- Label dan tombol: Inter SemiBold, weight 600.
- Maksimal dua keluarga font, tanpa serif dekoratif. Gunakan sentence case untuk isi; huruf kapital hanya pada label singkat.
- Untuk desain IG 1080 px: mulai dari judul 80–110 px, isi 32–42 px, dan label 24–28 px. Sesuaikan dengan banyaknya teks; cek keterbacaan di layar ponsel sebelum mengunggah.

## Perubahan website

Warna diterapkan di seluruh styles.css, theme-color index.html, logo assets/brand/mark.svg, serta tint video. Tipografi diperiksa pada hero, navigasi, layanan, portofolio, tentang, cara kerja, serah terima, FAQ, kontak, footer, dan modal detail karya. Teks kecil dibesarkan, paragraf utama 14–16 px, dan navigasi menjadi menu pada lebar maksimal 900 px agar tetap cukup ruang. Isi portofolio tetap merupakan konsep internal.

Validasi menggunakan perhitungan kontras pasangan warna inti, pemeriksaan aset dan anchor lokal, pemeriksaan sintaks JavaScript, tes perilaku video yang sudah ada, serta git diff --check. Preview desktop diperiksa dari hero sampai footer di Microsoft Edge. Emulasi ponsel sekitar 357 px memeriksa hero, menu, portofolio, modal detail, proses, FAQ, kontak, dan footer. FAQ dan menu berhasil dibuka; modal detail berhasil dibuka dan ditutup. Tombol video berhasil menjeda dan melanjutkan MP4 lokal pada emulasi ponsel. Perangkat ponsel fisik belum diuji. Posisi kontrol video disesuaikan agar tidak tertutup kartu melayang atau teks.

Rujukan kontras: https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html
