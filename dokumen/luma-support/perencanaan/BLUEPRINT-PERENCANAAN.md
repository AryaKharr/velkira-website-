Luma Support

PRD dan Blueprint Pengembangan

Demo layanan pelanggan toko online untuk portfolio VELKIRA

Versi perencanaan 1.0  |  28 Oktober 2026  |  Pemilik produk VELKIRA

### Tujuan dokumen

Dokumen ini menjadi acuan untuk merancang dan mengembangkan Luma Support secara bertahap. Cakupannya meliputi kebutuhan produk, alur pengguna, arsitektur teknis, model data, aturan desain, serta urutan tugas dan pengujian. Checklist merupakan rencana pekerjaan dan kriteria penilaian, bukan laporan penyelesaian implementasi.

### Keputusan produk

Luma Support adalah contoh dashboard layanan pelanggan untuk toko online umum. Pengunjung portfolio dapat mencoba bagaimana pertanyaan dijawab, keluhan dicatat sebagai tiket, dan kasus khusus diteruskan kepada admin. Contohnya relevan untuk toko pakaian, makanan kemasan, elektronik, perlengkapan rumah, dan kategori lain.

Pencatatan berarti pencatatan masalah pelanggan. Produk ini tidak mencatat omzet, transaksi, persediaan barang, atau pengiriman nyata. Nama Luma Store, pelanggan, nomor pesanan, serta percakapan merupakan data fiktif.

### Ringkasan lingkup

| Termasuk MVP | Ditunda ke fase berikutnya |

| --- | --- |

| FAQ, inbox, tiket, eskalasi, penanggung jawab, catatan dan penyelesaian. | AI aktif, koneksi WhatsApp, database, login, pembayaran dan data pelanggan nyata. |

| Demo responsif dengan state di memori browser dan tombol ulangi. | Penyimpanan lintas perangkat, audit log operasional dan integrasi marketplace. |

### Susunan dokumen

Tahap 1 membahas PRD dan kebutuhan pengguna. Tahap 2 menjelaskan arsitektur. Tahap 3 mengunci model data dan kontrak interaksi. Tahap 4 menetapkan design system serta komponen. Tahap 5 memuat aturan proyek, checklist implementasi, dan kriteria pengujian.

## Tahap 1 PRD dan tujuan bisnis

### Executive summary

Calon klien perlu melihat manfaat otomatisasi dalam bentuk yang dapat dicoba. Luma Support memperlihatkan proses dari pesan masuk hingga tindak lanjut, dengan status dan catatan yang mudah dipahami. Demo melengkapi SunDays: SunDays menampilkan kemampuan membuat website bisnis, sedangkan Luma menampilkan dashboard dan alur kerja.

### Masalah utama

Dalam layanan toko online, pertanyaan umum bercampur dengan keluhan yang perlu diperiksa. Jika semua hanya berada dalam chat, admin dapat kehilangan konteks, lupa menindaklanjuti, atau mengira masalah sudah selesai. Luma memperagakan pemisahan tersebut melalui FAQ dan tiket yang memiliki penanggung jawab.

### Tujuan dan KPI

| Tujuan | Target awal | Cara memeriksa |

| --- | --- | --- |

| Memahami manfaat | 4 dari 5 peserta membedakan FAQ dan tiket. | Minta peserta menjelaskan setelah mencoba. |

| Mudah digunakan | 4 dari 5 peserta menyelesaikan satu skenario tanpa bantuan. | Uji tugas dari inbox sampai tiket selesai. |

| Alur benar | Seluruh tiga skenario menghasilkan status dan tiket sesuai aturan. | Tes logika dan pemeriksaan browser. |

| Visual terbaca | Tidak ada konten utama terpotong pada lebar 360 sampai 1440 px. | Pemeriksaan responsif dan zoom. |

| Portfolio terhubung | Demo dapat dibuka dari agency dan kembali ke portfolio. | Uji kedua tautan pada hasil ekspor. |

Seluruh angka di atas adalah target penerimaan. Pengujian pengguna diperlukan sebelum menyatakan KPI tercapai; lima peserta memberi indikasi awal, bukan kesimpulan statistik tentang seluruh pasar.

### Prioritas bisnis

Memperjelas kemampuan VELKIRA dalam merancang aplikasi dan otomatisasi.

Menampilkan hasil yang bisa dicoba tanpa biaya layanan AI atau server database.

Membantu calon klien membayangkan penerapan pada bisnisnya sendiri.

### Batas klaim

Jangan menyebut demo sebagai AI aktif, pelanggan sungguhan, atau sistem yang sudah terhubung ke toko. Label simulasi harus terlihat. Status selesai berarti selesai dalam simulasi, bukan bukti bahwa pesanan nyata telah ditangani.

## Tahap 1 Persona dan alur pengguna

### Persona utama

Pemilik toko atau calon klien agency ingin memahami hasil otomatisasi dengan cepat. Ia membutuhkan bahasa yang familiar, contoh masalah yang umum, serta penjelasan tentang kapan admin manusia tetap diperlukan.

### Persona pendamping

Pengunjung portfolio di ponsel ingin mencoba demo dalam waktu singkat. Ia perlu dapat memilih percakapan, memahami status, dan kembali ke daftar tanpa membuka terlalu banyak panel sekaligus.

### Alur utama

Portfolio VELKIRA > Coba Demo > pilih percakapan > jalankan simulasi > lihat hasil. Jika cukup dijawab oleh FAQ, percakapan selesai. Jika membutuhkan tindakan, sistem membuat tiket dan menunggu admin.

Alur admin: ambil tiket > baca ringkasan dan nomor pesanan > tulis catatan tindak lanjut > simpan catatan > tandai selesai. Penanggung jawab, catatan, dan perubahan status tampil di detail serta riwayat tiket.

| Skenario | Pesan contoh | Hasil |

| --- | --- | --- |

| FAQ pengiriman | Biasanya pengiriman membutuhkan waktu berapa lama? | Jawaban FAQ tampil. Tidak ada tiket baru. |

| Pesanan terlambat | Pesanan ORD 2402 belum sampai setelah estimasi. | Tiket prioritas normal dibuat dan menunggu pemeriksaan. |

| Barang rusak | Barang yang saya terima rusak. Bagaimana penanganannya? | Tiket prioritas tinggi diteruskan ke antrean admin. |

### Contoh pencatatan tiket

Tiket LM 002 mencatat pelanggan Bima, pesanan ORD 2402, kategori kendala pengiriman, ringkasan pesanan belum sampai, prioritas normal, serta status menunggu. Setelah diambil, penanggung jawab menjadi Admin Demo dan status berubah menjadi ditangani.

Contoh catatan: Periksa status pengiriman dan siapkan pembaruan untuk pelanggan. Catatan ini adalah latihan penanganan; demo tidak melakukan pemeriksaan ekspedisi atau mengirim kabar sendiri.

### Aturan penyelesaian

Tiket baru boleh ditutup setelah diambil oleh admin simulasi dan memiliki catatan valid. Menyelesaikan FAQ tidak membutuhkan tiket. Permintaan refund atau penggantian barang harus digambarkan sebagai keputusan yang memerlukan tinjauan manusia.

## Tahap 1 Fitur MVP dan sitemap

| Fitur wajib | Kriteria penerimaan |

| --- | --- |

| Ringkasan | Jumlah percakapan, tiket terbuka, perlu admin dan selesai dihitung dari state demo. |

| Inbox | Tiga percakapan fiktif, pilihan pelanggan, kategori dan status yang konsisten. |

| Simulasi | Dapat dijalankan bertahap atau langsung ke hasil; tidak membuat tiket ganda. |

| Pencatatan | Tiket memiliki ID, pelanggan, pesanan, kategori, ringkasan, prioritas dan status. |

| Penanganan | Admin mengambil tiket, menyimpan catatan, lalu menutup tiket. |

| Riwayat | Tahap pencatatan, eskalasi, pengambilan, catatan dan penyelesaian terlihat. |

| Reset | Ulangi skenario hanya menghapus hasil skenario aktif; ulangi demo menghapus seluruh hasil. |

| Integrasi | Kartu Workflow Assistant mengarah ke demo; demo memiliki link kembali. |

### Fitur fase 2

Pencarian dan filter jika jumlah tiket bertambah, penyimpanan permanen, login petugas, integrasi channel, editor FAQ, notifikasi, dan AI dapat dipertimbangkan kemudian. Setiap integrasi memerlukan kebutuhan, biaya, dan batas akses yang disepakati sebelum implementasi.

### Sitemap

Satu route demo direncanakan pada /demos/luma-support/. Navigasi Ringkasan, Inbox dan Tiket merupakan tampilan di dalam dashboard. Tidak ada halaman checkout, katalog barang, atau akun pelanggan.

| Tampilan | Komponen utama |

| --- | --- |

| Ringkasan | Penjelasan fungsi, metrik sesi, dan pilihan tiga skenario. |

| Inbox | Daftar percakapan, detail chat, kontrol simulasi, workflow dan informasi tiket. |

| Tiket | Empty state atau tabel tiket dengan pelanggan, pesanan, prioritas, owner dan status. |

| Area bersama | Sidebar, breadcrumb, petunjuk penggunaan, reset, penanda demo dan kredit VELKIRA. |

## Tahap 1 Edge cases dan standar kualitas

| Kondisi | Perilaku yang direncanakan |

| --- | --- |

| Mulai diklik berulang | Satu proses aktif; tidak menambah timer atau menggandakan tiket. |

| Ganti percakapan saat proses | Pause proses sebelumnya; hasil tiap skenario tetap terpisah. |

| Reset dengan timer aktif | Batalkan timer; callback lama tidak boleh mengubah sesi baru. |

| Catatan kosong atau terlalu panjang | Tolak simpan; tampilkan error di dekat field dan pertahankan input. |

| Belum ada owner atau catatan | Tombol selesai tidak aktif; reducer juga menolak penutupan. |

| Belum ada tiket | Tampilkan pesan kosong dan tombol mencoba skenario kendala. |

| Muat ulang halaman | Kembali ke data awal; jelaskan bahwa data hanya berada dalam sesi. |

| JavaScript tidak tersedia | Penjelasan demo dan tautan kembali tetap tersedia; interaksi memerlukan JS. |

| Reduced motion | Lewati animasi bertahap dan tampilkan hasil langsung. |

| Layar sempit | Daftar dan detail bergantian; tabel boleh scroll di dalam panel. |

### Kecepatan dan kompatibilitas

Utamakan konten lokal dan hindari dependensi serta media berat. Target saat diukur kelak: LCP maksimal 2,5 detik, INP maksimal 200 ms, CLS maksimal 0,1. Catat kondisi pengujian dan bedakan hasil lab dari data pengguna nyata. Periksa Chrome, Edge, Firefox, Safari serta Android dan iOS sesuai perangkat yang tersedia.

### Aksesibilitas dan SEO

Gunakan satu H1, heading berurutan, label form, fokus keyboard terlihat, status berteks dan live region. Target kontras teks normal 4,5 banding 1 serta kontrol utama sekitar 44 px pada mobile. Sediakan title, description dan preview berbagi; canonical diisi setelah URL publik final ditetapkan.

### Keamanan dan privasi

Render catatan sebagai teks, tanpa HTML mentah. Jangan meminta data pelanggan asli atau menaruh secret di frontend. Hosting harus memakai HTTPS dan hanya menyajikan file publik. Tidak ada request pengiriman pesan atau perubahan data toko dalam MVP.

## Tahap 2 Technical blueprint

| Lapisan | Rekomendasi | Alasan |

| --- | --- | --- |

| Frontend | Next.js App Router dan React yang tersedia di proyek. | Mengikuti stack agency tanpa migrasi baru. |

| Interaksi | Client Component dengan useReducer. | Status dan metrik berasal dari satu sumber. |

| Styling | CSS Module dan token lokal. | Mencegah benturan dengan desain agency. |

| Backend | Tidak diperlukan untuk MVP. | Tidak ada operasi pelanggan atau data nyata. |

| Database | Tidak dipasang untuk demo sesi. | Reset dan data fiktif cukup di memori. |

| Hosting | Static export mengikuti hosting agency. | Satu paket untuk agency dan demo. |

| Layanan luar | Tidak ada AI, payment gateway atau email. | Belum ada alur yang membutuhkan layanan tersebut. |

### Struktur folder yang direncanakan

app/demos/luma-support/

    page.js                 Route dan metadata

    Dashboard.js            Komponen interaktif

    dashboard.module.css    Token dan layout

    workflow.mjs            Skenario dan aturan state

tests/luma.test.mjs          Pengujian alur

public/assets/concepts/      Preview portfolio

dokumen/luma-support/        Dokumen dan catatan QA

### State dan caching

Simpan progres, assignment dan catatan per ID skenario. Statistik dan daftar tiket diturunkan dari record tersebut, bukan salinan data terpisah. Timer wajib dibersihkan saat berpindah, reset atau unmount; token proses menolak callback usang. Gunakan cache aset hosting tanpa service worker atau localStorage pada MVP.

### Login dan environment variables

MVP tidak membutuhkan login, API key atau file .env. Jika kebutuhan berubah menjadi layanan aktif, tentukan autentikasi petugas di server serta DATABASE_URL dan secret session sesuai stack terpilih. Secret tidak pernah dikirim ke browser. Perubahan itu membutuhkan rancangan lanjutan, bukan bagian setup demo ini.

## Tahap 3 Model data dan aturan pencatatan

Model berikut mengunci struktur informasi tanpa mewajibkan database. Scenario berisi konten contoh; SessionRecord berisi progres yang berubah saat pengunjung mencoba demo. Relasi logisnya satu Scenario memiliki satu SessionRecord per sesi browser.

| Entitas dan field | Tipe konseptual | Aturan |

| --- | --- | --- |

| Scenario id | String | ID unik dan stabil; primary key konseptual. |

| Scenario name dan order | String | Nama pelanggan dan nomor pesanan fiktif. |

| Scenario message dan reply | String | Pertanyaan serta respons pratulisan. |

| Scenario category dan summary | String | Kategori dan ringkasan masalah. |

| Scenario ticket | String atau null | ID tiket tetap; null untuk FAQ. |

| Scenario priority | Normal atau Tinggi | Keluhan barang rusak memakai prioritas tinggi. |

| Scenario steps | Array 4 label | Pesan masuk, identifikasi, aksi dan hasil akhir. |

| Record scenarioId | String | Foreign key konseptual ke Scenario id. |

| Record step | Integer 0 sampai 3 | Tahap simulasi saat ini. |

| Record assigned dan resolved | Boolean | Owner diambil dan tiket ditutup. |

| Record followUp | String | Catatan 5 sampai 280 karakter setelah trim. |

### Kapan tiket tercatat

FAQ tidak membuat tiket. Untuk skenario kendala, tiket mulai tersedia pada tahap pencatatan. Informasi pelanggan, pesanan, kategori, prioritas dan ringkasan berasal dari skenario yang dipilih. Status akhir otomatis adalah Menunggu atau Perlu Admin, lalu admin simulasi mengambil alih.

### Aturan integritas

ID skenario dan tiket tidak boleh duplikat.

Owner harus ditetapkan sebelum catatan disimpan dan tiket diselesaikan.

Tiket selesai tidak dapat diubah; gunakan ulangi skenario untuk mencoba kembali.

Reset menghapus assignment, catatan dan progres sesuai cakupannya.

Tidak ada tabel SQL, indeks atau migrasi yang perlu dijalankan pada MVP karena tidak ada database. Jika penyimpanan permanen disetujui, skema relasional dan indeks disusun sebelum implementasi fase tersebut.

## Tahap 3 Kontrak interaksi dan status

| Action | Input | Aturan hasil |

| --- | --- | --- |

| select | ID skenario | Hanya ID dikenal; pilih pelanggan dan hentikan timer lama. |

| view | overview inbox tickets | Hanya tiga tampilan yang sah. |

| start | Tidak ada | Mulai atau lanjutkan jika belum selesai dan belum running. |

| tick | Token proses | Naik satu tahap hanya untuk proses aktif dengan token cocok. |

| finish | Tidak ada | Hasil langsung; batalkan proses bertahap. |

| assign | Tidak ada | Ambil tiket setelah alur otomatis selesai. |

| note | Teks catatan | Setelah assigned; trim dan validasi 5 sampai 280 karakter. |

| resolve | Tidak ada | Hanya jika assigned dan catatan valid tersimpan. |

| restart | Tidak ada | Reset satu skenario aktif. |

| reset | Tidak ada | Reset semua skenario dan kembali ke tampilan awal. |

### Perubahan status

Pertanyaan FAQ: Baru > Diproses > Selesai. Kendala pengiriman: Baru > Diproses > Menunggu > Ditangani > Selesai. Barang rusak: Baru > Diproses > Perlu Admin > Ditangani > Selesai. Status Perlu Admin menunjukkan antrean yang belum diambil, bukan tiket yang sudah ditangani.

### Validasi dan respons kesalahan

Action tidak sah diabaikan tanpa merusak state. Catatan tidak valid mempertahankan isi form dan menampilkan pesan yang jelas. Klik ganda tidak menggandakan tiket. Menyimpan catatan tidak boleh otomatis menutup tiket. Daftar tiket dan statistik selalu dihitung ulang dari record yang sama.

### API contract

Tidak ada endpoint API bisnis pada MVP. Request GET hanya mengambil HTML, JavaScript, CSS dan aset statis. Tidak ada POST, PUT atau DELETE untuk data pelanggan; tidak ada JSON jaringan maupun kode error API yang perlu dipalsukan. Bila layanan aktif diminta, kontrak percakapan, pesan dan tiket harus mencakup autentikasi, validasi, pagination, error, retry dan idempotency sebelum backend dibuat.

## Tahap 4 Design system

Arah visual: aplikasi kerja yang bersih dan modern. Sidebar navy memberi identitas, kanvas terang menjaga keterbacaan, dan biru menjadi penekanan tindakan. Data dan percakapan menjadi fokus; hindari elemen dekoratif yang menyerupai fungsi tetapi tidak dapat dipakai.

| Token | HEX | Penggunaan |

| --- | --- | --- |

| Primary | 345CFF | Tombol utama, nav aktif dan chat asisten. |

| Hover | 2447D8 | State hover primary. |

| Sidebar | 14213D | Navigasi dan identitas workspace. |

| Background | F4F6FA | Kanvas dashboard. |

| Surface | FFFFFF | Panel, kartu dan form. |

| Text | 172033 | Teks utama. |

| Muted | 596579 | Deskripsi dan label sekunder. |

| Border | E2E7F0 | Pemisah dekoratif. |

| Success | 166534 / DCFCE7 | Teks dan latar status selesai. |

| Waiting | 92400E / FEF3C7 | Teks dan latar status menunggu. |

| Priority | B42318 / FEE4E2 | Teks dan latar prioritas tinggi. |

### Typography dan ukuran

Gunakan Manrope untuk heading dan body agar konsisten dengan aset font proyek. H1 sekitar 28 sampai 36 px; judul panel 16 sampai 20 px; isi percakapan 14 sampai 16 px; label sekunder 12 sampai 13 px. Caption kecil hanya untuk metadata tambahan. Gunakan fallback Arial dan periksa perubahan layout saat font gagal dimuat.

### Spacing dan bentuk

Gunakan skala 4, 8, 12, 16, 24 dan 32 px. Radius panel 14 sampai 16 px, tombol 8 sampai 10 px, dan avatar melingkar. Shadow tipis cukup untuk memisahkan panel. Jangan menampilkan status hanya melalui warna; selalu sertakan teks.

### Aturan kontras dan gerakan

Periksa kontras pada default, hover, fokus dan disabled. Gunakan outline fokus yang terlihat pada navy maupun putih. Animasi cukup untuk memperlihatkan progres; hormati reduced motion dan sediakan hasil langsung tanpa menunggu.

## Tahap 4 UI blueprint dan komponen

### Susunan desktop

Sidebar di kiri. Area utama berisi judul, petunjuk penggunaan dan empat kartu metrik. Inbox menggunakan tiga panel: daftar percakapan, detail chat, dan workflow beserta informasi tiket. Tombol penanganan serta form catatan berada di bawah percakapan.

### Susunan mobile

Navigasi menjadi ringkas di atas. Daftar inbox tampil lebih dahulu; memilih pelanggan membuka detail dengan tombol kembali. Workflow dan riwayat diletakkan di bawah chat. Tabel tiket boleh digeser di dalam panel tanpa membuat seluruh halaman melebar.

| Komponen | State dan perilaku |

| --- | --- |

| Navbar | Default, hover, fokus, active; semua menu berfungsi. |

| Button | Default, hover, fokus, disabled dan proses lokal berjalan. |

| Conversation row | Dipilih atau tidak; status mengikuti record pelanggan. |

| Chat bubble | Pesan pelanggan dan respons pratulisan dibedakan jelas. |

| Status badge | Baru, Diproses, Menunggu, Perlu Admin, Ditangani, Selesai. |

| Workflow step | Menunggu, tahap saat ini, dan langkah selesai. |

| Ticket detail | ID, pelanggan, pesanan, kategori, ringkasan, prioritas, owner dan status. |

| Follow up form | Kosong, sedang diisi, error, tersimpan dan read only setelah selesai. |

| History | Pencatatan, penerusan, assignment, catatan dan penutupan. |

| Empty state | Belum ada tiket; CTA menuju contoh kasus yang relevan. |

### Loading dan error

Indikator proses lokal harus menyebut simulasi sedang berjalan, bukan menyatakan terhubung ke AI. Konten lokal tidak membutuhkan skeleton jaringan. Pesan validasi ditempatkan dekat textarea dan dihubungkan melalui label serta deskripsi aksesibel. Tidak membuat modal, input atau halaman pengaturan tanpa kebutuhan pengguna.

## Tahap 5 Aturan dan rencana implementasi

### Project rules

Ikuti scope toko online umum dan pertahankan label simulasi.

Baca panduan versi Next.js lokal sebelum mengubah kode framework.

Gunakan satu reducer sebagai sumber status, tiket dan metrik.

Render teks secara aman; jangan memakai HTML mentah untuk catatan.

Bersihkan timer dan tolak callback lama setelah reset atau pergantian.

Bangun responsif, fokus keyboard, validasi dan empty state sejak awal.

Jangan menambah database, AI, login atau pengiriman pesan tanpa revisi scope.

Jangan menandai tugas atau pengujian selesai tanpa hasil yang dapat diperiksa.

### Checklist pengerjaan berurutan

| Tiket | Pekerjaan dan hasil | Dependensi |

| --- | --- | --- |

| 01  Belum ditandai | Finalisasi PRD, tiga skenario dan teks penanda demo. | Tidak ada |

| 02  Belum ditandai | Tetapkan kontrak data, status dan validasi catatan. | 01 |

| 03  Belum ditandai | Siapkan route, struktur file dan token desain. | 01 dan 02 |

| 04  Belum ditandai | Bangun reducer serta tes FAQ, tiket, assignment dan reset. | 02 |

| 05  Belum ditandai | Bangun ringkasan, sidebar, inbox dan chat. | 03 dan 04 |

| 06  Belum ditandai | Tambahkan workflow, detail tiket, owner, form dan riwayat. | 05 |

| 07  Belum ditandai | Lengkapi mobile, keyboard, reduced motion dan error state. | 06 |

| 08  Belum ditandai | Hubungkan kartu portfolio dan tautan kembali. | 05 sampai 07 |

| 09  Belum ditandai | Jalankan build, tes otomatis, audit dan uji browser. | 08 |

| 10  Belum ditandai | Uji pengguna, perbaiki hambatan dan siapkan paket hosting. | 09 |

| 11  Belum ditandai | Publikasikan bila diminta lalu verifikasi URL dan HTTPS. | 10 |

| 12  Belum ditandai | Serahkan panduan, sumber aset dan catatan keterbatasan. | 11 |

Checklist ini sengaja belum dicentang agar dapat dipakai sebagai daftar kerja perencanaan. Pengembang memperbarui status berdasarkan pekerjaan yang benar-benar dilaksanakan; dokumen ini tidak menyatakan hasil implementasi telah lulus.

## Tahap 5 Pengujian dan kriteria selesai

| Pemeriksaan | Hasil yang diwajibkan |

| --- | --- |

| FAQ | Jawaban tampil dan selesai tanpa membuat tiket. |

| Pencatatan | Tiket muncul hanya setelah tahap pencatatan. |

| Eskalasi | Barang rusak masuk antrean admin dengan prioritas tinggi. |

| Owner | Ambil tiket menetapkan Admin Demo dan status Ditangani. |

| Catatan | Kosong, spasi, kurang dari 5 dan lebih dari 280 karakter ditolak. |

| Penyelesaian | Memerlukan owner dan catatan valid; klik berulang tidak menggandakan data. |

| Navigasi | Progres tersimpan dalam sesi; data tidak tertukar antar skenario. |

| Reset dan timer | Reset membersihkan state; callback lama tidak mengubah sesi baru. |

| Mobile dan keyboard | Tidak ada overflow halaman; navigasi dan fokus dapat digunakan. |

| Keamanan | Tidak ada secret, HTML injection, request write atau data nyata. |

| SEO dan paket | Satu H1, metadata tepat, aset valid; dokumen internal tidak ikut hosting. |

### Definition of done

MVP dapat dinyatakan selesai ketika tiga skenario dapat dicoba dari awal sampai akhir, penanganan tiket memenuhi aturan, navigasi dan reset berfungsi, serta pengujian yang relevan dicatat. Pemeriksaan otomatis perlu dilengkapi inspeksi visual dan interaksi browser. Temuan penting harus diperbaiki sebelum rilis atau dicatat untuk keputusan pemilik.

### Deployment dan serah terima

Bangun static export, kemas hanya file publik, lalu unggah ke hosting yang dipilih. Periksa halaman agency, demo, CSS, JavaScript, link kembali dan HTTPS pada URL final. Simpan versi paket sebelumnya untuk rollback. Serah terima mencakup cara mengganti skenario, batas simulasi dan cara menguji ulang.

### Risiko dan keputusan lanjutan

Risiko utama ialah pengunjung mengira demo merupakan sistem aktif, kehilangan catatan setelah reload, serta menganggap jawaban otomatis sebagai keputusan refund. Mitigasinya adalah label simulasi, penjelasan penyimpanan sesi dan eskalasi ke manusia. Penyimpanan permanen, integrasi channel dan AI menjadi keputusan fase berikutnya dengan PRD, model data serta keamanan tersendiri.