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
  metadataBase: new URL('https://velkira.site'),
  title: 'Velkira — Studio Kreatif & Teknologi untuk Bisnis',
  description: 'Velkira merancang website, otomatisasi alur kerja, dan aplikasi web sesuai kebutuhan usaha Anda. Lihat karya studio dan bahas proyek Anda.',
  alternates: { canonical: '/' },
  icons: { icon: '/assets/brand/mark.svg' },
  openGraph: {
    title: 'Velkira — Studio Kreatif & Teknologi untuk Bisnis',
    description: 'Website, otomatisasi alur kerja, dan aplikasi web sesuai kebutuhan usaha Anda.',
    type: 'website',
    locale: 'id_ID',
    images: [{ url: '/assets/brand/velkira-og.png', width: 1200, height: 630, alt: 'Velkira — Digital yang memudahkan bisnis Anda' }],
  },
  twitter: { card: 'summary_large_image', images: ['/assets/brand/velkira-og.png'] },
};

export const viewport = {
  themeColor: '#faf9f6',
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
