import './globals.css';
import localFont from 'next/font/local';

const manrope = localFont({
  src: './fonts/manrope-latin.woff2',
  display: 'swap',
  variable: '--font-body',
  weight: '400 800',
});

const plusJakarta = localFont({
  src: './fonts/plus-jakarta-sans-latin.woff2',
  display: 'swap',
  variable: '--font-heading',
  weight: '500 800',
});

const playfair = localFont({
  src: './fonts/playfair-display-italic-latin.woff2',
  display: 'swap',
  variable: '--font-serif',
  weight: '400 600',
  style: 'italic',
});

export const metadata = {
  title: 'Velkira — Website, otomatisasi & aplikasi web',
  description: 'Velkira merancang website, otomatisasi alur kerja, dan aplikasi bisnis. Jelajahi karya studio dan bahas proyekmu.',
  icons: { icon: '/assets/atelier/logo-emblem.png' },
  openGraph: {
    title: 'Velkira — Desain dan pengembangan digital',
    description: 'Website, otomatisasi, dan aplikasi web. Dikerjakan dengan lingkup yang jelas.',
    type: 'website',
    locale: 'id_ID',
  },
};

export const viewport = {
  themeColor: '#f3eee7',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={`${manrope.variable} ${plusJakarta.variable} ${playfair.variable}`}>
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
      <body>{children}</body>
    </html>
  );
}
