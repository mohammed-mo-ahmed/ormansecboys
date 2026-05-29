import type { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';
import { getNewsItems } from '@/features/news/services/news.service';


const safeDate = (value: any) => {
  const d = new Date(value);
  return isNaN(d.getTime()) ? new Date() : d;
};


const sanitizeNews = (items: any[]) => {
  return items.filter(item => {
    const slug = item?.slug?.trim();
    const date = new Date(item?.date);

    return slug && !isNaN(date.getTime());
  });
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const rawNewsItems = await getNewsItems();


  const newsItems = sanitizeNews(rawNewsItems);

  const locales = ['ar', 'en'] as const;
  const base = siteConfig.url;
  const now = new Date();

  // ─── Static Routes ──────────────────────────────────────
  const staticRoutes = [
    { path: '',               priority: 1.0, freq: 'weekly' as const },
    { path: '/news',          priority: 0.9, freq: 'weekly' as const },
    { path: '/gallery',       priority: 0.7, freq: 'monthly' as const },
    { path: '/contact',       priority: 0.7, freq: 'yearly' as const },
    { path: '/faq',           priority: 0.8, freq: 'monthly' as const },
    { path: '/resources',     priority: 0.7, freq: 'monthly' as const },
    { path: '/alumni',        priority: 0.7, freq: 'monthly' as const },
    { path: '/overview',      priority: 0.8, freq: 'yearly' as const },
    { path: '/vision',        priority: 0.6, freq: 'yearly' as const },
    { path: '/history',       priority: 0.6, freq: 'yearly' as const },

    // ✅ الصفحات المطلوبة
    { path: '/teachers',      priority: 0.7, freq: 'monthly' as const },
    { path: '/student-union', priority: 0.6, freq: 'monthly' as const },

    { path: '/clubs',         priority: 0.6, freq: 'monthly' as const },
    { path: '/achievements',  priority: 0.7, freq: 'monthly' as const },
    { path: '/competitions',  priority: 0.7, freq: 'weekly' as const },
    { path: '/library',       priority: 0.5, freq: 'yearly' as const },
  ] as const;

  // ─── Static Entries ─────────────────────────────────────
  const staticEntries: MetadataRoute.Sitemap = locales.flatMap(locale =>
    staticRoutes.map(route => ({
      url: `${base}/${locale}${route.path}`,
      lastModified: now,
      changeFrequency: route.freq,
      priority: route.priority,
      alternates: {
        languages: {
          ar: `${base}/ar${route.path}`,
          en: `${base}/en${route.path}`,
        },
      },
    }))
  );

  // ─── Dynamic News Routes ────────────────────────────────
  const newsEntries: MetadataRoute.Sitemap = locales.flatMap(locale =>
    newsItems.map(item => ({
      url: `${base}/${locale}/news/${item.slug}`,
      lastModified: safeDate(item.date),
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