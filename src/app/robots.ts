import type { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          // ✅ Dashboard routes — مش محتاجين يتعملوا index
          '/*/student/',
          '/*/teacher/',
          '/*/admin/',
          '/*/login/',
          '/*/forgot-password/',
          // API routes
          '/api/',
        ],
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host:    siteConfig.url,
  };
}