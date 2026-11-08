import './globals.css';
import { Inter, Manrope } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-body' });
const manrope = Manrope({ subsets: ['latin'], display: 'swap', variable: '--font-heading' });

export const metadata = {
  title: 'Velkira — Website, otomatisasi & aplikasi web',
  description: 'Velkira merancang dan mengembangkan website bisnis, otomatisasi, serta aplikasi web. Lihat proyek SunDays dan bahas kebutuhanmu.',
  icons: { icon: '/assets/brand/mark.svg' },
  openGraph: {
    title: 'Velkira — Desain dan pengembangan digital',
    description: 'Website, otomatisasi, dan aplikasi web. Dikerjakan dengan lingkup yang jelas.',
    type: 'website',
    locale: 'id_ID',
  },
};

export const viewport = { 
  themeColor: '#080c0a',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={`${inter.variable} ${manrope.variable}`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('scrollRestoration' in history) {
                history.scrollRestoration = 'manual';
              }
              window.scrollTo(0, 0);
              if (window.location.hash && window.location.hash !== '#awal') {
                try {
                  history.replaceState(null, '', window.location.pathname + window.location.search);
                } catch (e) {}
              }
            `,
          }}
        />
      </head>
      <body id="awal">{children}</body>
    </html>
  );
}
