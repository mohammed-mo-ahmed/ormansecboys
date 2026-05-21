import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/lib/i18n/request.ts');

const nextConfig: NextConfig = {
  // ✅ output: 'export' بس وقت البناء للـ Firebase — مش في dev
  ...(process.env.NEXT_OUTPUT === 'true' && { output: 'export' }),

  images: {
    unoptimized: true,
  },

  env: {
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://ormansecboys.web.app',
  },
};

export default withNextIntl(nextConfig);