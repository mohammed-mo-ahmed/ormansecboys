// src/app/[locale]/(public)/teachers/page.tsx
import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ResourcesPage } from '@/features/resources';
import { siteConfig } from '@/config/site';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const t = await getTranslations({
    locale,
    namespace: 'resources.meta',
  });

  return {
    title: t('title'),
    description: t('description'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `${siteConfig.url}/${locale}/resources`,
      images: [{ url: siteConfig.ogImage }],
    },
    alternates: {
      canonical: `/${locale}/resources`,
      languages: {
        ar: '/ar/resources',
        en: '/en/resources',
      },
    },
  };
}

export default async function Page({ params }: Props) {
  const { locale } = await params;

  setRequestLocale(locale);

  return <ResourcesPage locale={locale} />;
}