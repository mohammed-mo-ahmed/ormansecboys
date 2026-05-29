// src/app/[locale]/(public)/competitions/page.tsx
import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { CompetitionsPage } from '@/features/activities';
import { siteConfig } from '@/config/site';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const t = await getTranslations({
    locale,
    namespace: 'about.competitions.meta',
  });

  return {
    title: t('title'),
    description: t('description'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `${siteConfig.url}/${locale}/competitions`,
      images: [{ url: siteConfig.ogImage }],
    },
    alternates: {
      canonical: `/${locale}/competitions`,
      languages: {
        ar: '/ar/competitions',
        en: '/en/competitions',
      },
    },
  };
}

export default async function Page({ params }: Props) {
  const { locale } = await params;

  setRequestLocale(locale);

  return <CompetitionsPage locale={locale} />;
}