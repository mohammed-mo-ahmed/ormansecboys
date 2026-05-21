// src/app/[locale]/(public)/about/page.tsx
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { OverviewPage } from '@/features/about';
import { siteConfig } from '@/config/site';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about.overview.meta' });
  return {
    title: t('title'), description: t('description'),
    openGraph: { title: t('title'), url: `${siteConfig.url}/${locale}/about`, images: [{ url: siteConfig.ogImage }] },
    alternates: { canonical: `/${locale}/about`, languages: { ar: '/ar/about', en: '/en/about' } },
  };
}
export default function Page() { return <OverviewPage />; }