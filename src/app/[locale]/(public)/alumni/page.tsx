import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { AlumniPage } from '@/features/alumni';
import { siteConfig } from '@/config/site';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'alumni.meta' });
  return {
    title: t('title'),
    description: t('description'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `${siteConfig.url}/${locale}/alumni`,
      images: [{ url: siteConfig.ogImage }],
    },
    alternates: {
      canonical: `/${locale}/alumni`,
      languages: { ar: '/ar/alumni', en: '/en/alumni' },
    },
  };
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <AlumniPage locale={locale} />;
}