import Dashboard from './Dashboard';

export const metadata = {
  metadataBase: new URL('https://velkira.site'),
  title: 'Luma Support — Demo Alur Layanan Pelanggan | Velkira',
  description: 'Coba simulasi layanan pelanggan Luma Support: jawaban pertanyaan umum, pencatatan tiket, dan eskalasi ke pengelola. Proyek konsep Velkira.',
  alternates: { canonical: '/demos/luma-support/' },
  openGraph: {
    title: 'Luma Support — Demo Alur Layanan Pelanggan',
    description: 'Demo interaktif layanan pelanggan oleh Velkira. Seluruh data fiktif; bukan AI atau layanan aktif.',
    type: 'website',
    images: [{ url: '/assets/atelier/luma-support.png', alt: 'Tampilan demo percakapan pelanggan Luma Support' }],
  },
  twitter: { card: 'summary_large_image', images: ['/assets/atelier/luma-support.png'] },
};

export const viewport = { themeColor: '#14213d' };

export default function LumaSupportPage() {
  return <Dashboard />;
}
