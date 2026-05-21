import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { FAQPage } from '@/features/faq';
import { siteConfig } from '@/config/site';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'faq.meta' });

  return {
    title: t('title'),
    description: t('description'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `${siteConfig.url}/${locale}/faq`,
      images: [{ url: siteConfig.ogImage }],
    },
    alternates: {
      canonical: `/${locale}/faq`,
      languages: { ar: '/ar/faq', en: '/en/faq' },
    },
  };
}

export default function Page() {
  return <FAQPage />;
}