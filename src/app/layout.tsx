import type { Metadata } from 'next';
import { Cairo } from 'next/font/google';
import './globals.css';

const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  variable: '--font-cairo',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://ormansecboys.vercel.app'),
  icons: { icon: '/images/logos/logo.png' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning className={cairo.variable}>
      <body
        suppressHydrationWarning
        className="font-[Cairo] antialiased bg-white text-gray-900"
      >
        {children}
      </body>
    </html>
  );
}