import Dashboard from './Dashboard';

export const metadata = {
  metadataBase: new URL('https://velkira.site'),
  title: 'Luma Support — Workflow Assistant Demo | VELKIRA',
  description: 'Coba simulasi layanan pelanggan Luma Support: jawaban FAQ, pencatatan tiket, dan eskalasi ke admin. Proyek konsep portfolio VELKIRA.',
  openGraph: {
    title: 'Luma Support — Customer service, thoughtfully connected.',
    description: 'Demo interaktif workflow layanan pelanggan oleh VELKIRA. Seluruh data fiktif; bukan AI atau layanan aktif.',
    type: 'website',
    images: [{ url: '/assets/concepts/luma-support.svg', width: 1200, height: 800, alt: 'Preview dashboard Luma Support' }],
  },
};

export const viewport = { themeColor: '#14213d' };

export default function LumaSupportPage() {
  return <Dashboard />;
}
