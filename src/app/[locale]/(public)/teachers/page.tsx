// src/app/[locale]/(public)/teachers/page.tsx
import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { TeachersPage } from '@/features/about';
import { siteConfig } from '@/config/site';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const t = await getTranslations({
    locale,
    namespace: 'about.teachers.meta',
  });

  return {
    title: t('title'),
    description: t('description'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `${siteConfig.url}/${locale}/teachers`,
      images: [{ url: siteConfig.ogImage }],
    },
    alternates: {
      canonical: `/${locale}/teachers`,
      languages: {
        ar: '/ar/teachers',
        en: '/en/teachers',
      },
    },
  };
}

export default async function Page({ params }: Props) {
  const { locale } = await params;

  setRequestLocale(locale);

  return <TeachersPage locale={locale} />;
}