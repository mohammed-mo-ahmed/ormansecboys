// src/app/[locale]/(public)/gallery/page.tsx
import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { GalleryPage } from '@/features/gallery';
import { siteConfig } from '@/config/site';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'gallery.meta' });
  return {
    title: t('title'),
    description: t('description'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `${siteConfig.url}/${locale}/gallery`,
      images: [{ url: siteConfig.ogImage }],
    },
    alternates: {
      canonical: `/${locale}/gallery`,
      languages: { ar: '/ar/gallery', en: '/en/gallery' },
    },
  };
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  // ✅ نمرر locale كـ prop مباشرة
  return <GalleryPage locale={locale} />;
}