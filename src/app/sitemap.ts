import type { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';
import { getNewsItems } from '@/features/news/services/news.service';

// ✅ بيتولّد وقت البناء (build time) — مناسب لـ output: 'export'
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const newsItems = await getNewsItems();
  const locales = ['ar', 'en'] as const;
  const base = siteConfig.url;
  const now = new Date();

  // ─── Static Routes ──────────────────────────────────────
  const staticRoutes = [
    { path: '',                 priority: 1.0, freq: 'weekly' },
    { path: '/news',            priority: 0.9, freq: 'weekly' },
    { path: '/gallery',         priority: 0.7, freq: 'monthly' },
    { path: '/contact',         priority: 0.7, freq: 'yearly' },
    { path: '/faq',             priority: 0.8, freq: 'monthly' },
    { path: '/resources',       priority: 0.7, freq: 'monthly' },
    { path: '/alumni',          priority: 0.7, freq: 'monthly' },
    { path: '/overview',        priority: 0.8, freq: 'yearly' },
    { path: '/vision',          priority: 0.6, freq: 'yearly' },
    { path: '/history',         priority: 0.6, freq: 'yearly' },
    { path: '/teachers',        priority: 0.7, freq: 'monthly' },
    { path: '/clubs',           priority: 0.6, freq: 'monthly' },
    { path: '/achievements',    priority: 0.7, freq: 'monthly' },
    { path: '/competitions',    priority: 0.7, freq: 'weekly' },
    { path: '/library',         priority: 0.5, freq: 'yearly' },
    { path: '/student-union',   priority: 0.6, freq: 'monthly' },
  ] as const;

  const staticEntries: MetadataRoute.Sitemap = locales.flatMap(locale =>
    staticRoutes.map(route => ({
      url: `${base}/${locale}${route.path}`,
      lastModified: now,
      changeFrequency:
        route.freq as MetadataRoute.Sitemap[number]['changeFrequency'],
      priority: route.priority,
      alternates: {
        languages: {
          ar: `${base}/ar${route.path}`,
          en: `${base}/en${route.path}`,
        },
      },
    }))
  );

  // ─── Dynamic News Routes ─────────────────────────────────
  const newsEntries: MetadataRoute.Sitemap = locales.flatMap(locale =>
    newsItems.map(item => ({
      url: `${base}/${locale}/news/${item.slug}`,
      lastModified: new Date(item.date),
      changeFrequency: 'yearly' as const,
      priority: 0.9,
      alternates: {
        languages: {
          ar: `${base}/ar/news/${item.slug}`,
          en: `${base}/en/news/${item.slug}`,
        },
      },
    }))
  );

  return [...staticEntries, ...newsEntries];
}