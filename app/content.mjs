export const contact = {
  whatsapp: '6285704834416',
  displayPhone: '+62 857 0483 4416',
  email: '',
};

export const navigation = [
  ['Karya', '#portofolio'],
  ['Layanan', '#layanan'],
  ['Tentang', '#tentang'],
  ['Cara kerja', '#cara-kerja'],
];

export const services = [
  {
    name: 'Website bisnis',
    description: 'Landing page, company profile, dan katalog yang membantu orang mengenal usaha dan menghubungimu.',
    scope: 'Desain halaman · Pengembangan · Integrasi kontak',
  },
  {
    name: 'Otomatisasi & AI',
    description: 'Alur untuk pertanyaan berulang, pencatatan permintaan, dan tindak lanjut. Batas respons dan eskalasi disepakati di awal.',
    scope: 'Pemetaan alur · Integrasi · Pengujian respons',
  },
  {
    name: 'Aplikasi web',
    description: 'Dashboard, portal, atau prototipe untuk proses kerja yang lebih spesifik. Fitur mengikuti kebutuhan penggunanya.',
    scope: 'Rancangan alur · Antarmuka · Pengembangan',
  },
];

export const process = [
  { title: 'Ceritakan kebutuhanmu', text: 'Kita bahas usahamu, siapa penggunanya, dan apa yang perlu dibantu.' },
  { title: 'Sepakati pekerjaan', text: 'Halaman, fitur, biaya, jadwal, dan tanggung jawab ditulis sebelum mulai.' },
  { title: 'Tinjau hasilnya', text: 'Rancangan dan pengembangan ditinjau bersama sesuai tahap yang disepakati.' },
  { title: 'Uji, lalu serahkan', text: 'Fungsi diperiksa. Akses, panduan, dan batas dukungan dijelaskan saat serah terima.' },
];

export const questions = [
  ['Berapa biaya dan lama pengerjaannya?', 'Tergantung jumlah halaman, fitur, konten, dan integrasinya. Estimasi diberikan setelah kebutuhan dan lingkup pekerjaan jelas.'],
  ['Belum tahu butuh website atau aplikasi?', 'Mulai dari cara kerja usahamu dan masalah yang ingin dibantu. Kita bahas pilihan yang sesuai sebelum menentukan pekerjaan.'],
  ['Apa yang perlu saya siapkan?', 'Informasi usaha, layanan atau produk, logo, foto, dan referensi bila tersedia. Kebutuhan konten lainnya dibahas bersama.'],
  ['Apakah domain dan hosting termasuk?', 'Domain, hosting, pemeliharaan, dan kepemilikan akses dijelaskan dalam penawaran. Tidak otomatis termasuk biaya pengembangan.'],
  ['Apakah SunDays proyek klien?', 'SunDays adalah proyek konsep internal Velkira untuk memperlihatkan desain dan pengembangan website. Cafe, menu, dan harganya merupakan contoh.'],
  ['Bagaimana revisi dan dukungan setelah selesai?', 'Jumlah revisi, cara pembaruan, dan batas dukungan disepakati sebelum pekerjaan dimulai. Detailnya mengikuti lingkup proyek.'],
  ['Apakah AI bisa menjawab semua pertanyaan?', 'Tidak. Sumber informasi, batas respons, pengujian, dan kapan pertanyaan perlu diteruskan ke manusia harus dirancang.'],
];

export function whatsappUrl(service = '') {
  const message = service
    ? `Halo Velkira, saya ingin membahas kebutuhan ${service} untuk bisnis saya.`
    : 'Halo Velkira, saya ingin membahas kebutuhan proyek untuk bisnis saya.';
  return `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(message)}`;
}
