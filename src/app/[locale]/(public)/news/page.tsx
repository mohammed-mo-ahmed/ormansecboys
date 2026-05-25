import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { NewsPage } from '@/features/news';
import { siteConfig } from '@/config/site';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'news.meta' });
  return {
    title: t('title'),
    description: t('description'),
    openGraph: {
      title: t('title'), description: t('description'),
      url: `${siteConfig.url}/${locale}/news`,
      images: [{ url: siteConfig.ogImage }],
    },
    alternates: { canonical: `/${locale}/news`, languages: { ar: '/ar/news', en: '/en/news' } },
  };
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <NewsPage locale={locale} />;
}