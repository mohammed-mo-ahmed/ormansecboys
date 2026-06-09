import type { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/ar/student',
          '/en/student',
          '/ar/teacher-login',
          '/en/teacher-login',
          '/ar/admin',
          '/en/admin',
          '/ar/login',
          '/en/login',
          '/ar/forgot-password',
          '/en/forgot-password',
          '/api/',
        ],
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}