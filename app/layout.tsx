import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Providers } from '@/components/Providers';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/layout/CartDrawer';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  title: {
    default: 'AYANFE CLOTHIERS — We Style You, You Flaunt It',
    template: '%s | AYANFE CLOTHIERS',
  },
  description:
    'AYANFE CLOTHIERS — Nigeria\'s premier bespoke fashion house. Handcrafted suits, kaftans, agbada, wedding attires, and monogram services. We Style You, You Flaunt It.',
  keywords: [
    'bespoke suits Nigeria',
    'kaftan',
    'agbada',
    'wedding attires Lagos',
    'monogram service',
    'fashion brand Nigeria',
    'AYANFE CLOTHIERS',
    'tailor Lagos',
    'custom made suits',
  ],
  authors: [{ name: 'AYANFE CLOTHIERS' }],
  creator: 'AYANFE CLOTHIERS',
  publisher: 'AYANFE CLOTHIERS',
  openGraph: {
    type: 'website',
    locale: 'en_NG',
    url: '/',
    siteName: 'AYANFE CLOTHIERS',
    title: 'AYANFE CLOTHIERS — We Style You, You Flaunt It',
    description:
      "Nigeria's premier bespoke fashion house. Handcrafted suits, kaftans, agbada, wedding attires, and monogram services.",
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'AYANFE CLOTHIERS' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AYANFE CLOTHIERS — We Style You, You Flaunt It',
    description: "Nigeria's premier bespoke fashion house.",
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  icons: {
    icon: [
      { url: '/icons/icon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icons/icon-96x96.png', sizes: '96x96', type: 'image/png' },
    ],
    apple: [{ url: '/icons/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  manifest: '/manifest.webmanifest',
};

export const viewport: Viewport = {
  themeColor: '#7b1fa2',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  colorScheme: 'light',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600&family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="AYANFE" />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body>
        <Providers>
          <Navbar />
          <CartDrawer />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
