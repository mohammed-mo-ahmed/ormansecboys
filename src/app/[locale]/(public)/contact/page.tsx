import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { ContactPage } from '@/features/contact';
import { siteConfig } from '@/config/site';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'contact.meta' });

  return {
    title: t('title'),
    description: t('description'),
    keywords: locale === 'ar'
      ? 'مدرسة الأورمان, اتصل بنا, الدقي, الجيزة'
      : 'Al-Orman School, Contact, Dokki, Giza, Egypt',
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `${siteConfig.url}/${locale}/contact`,
      images: [{ url: siteConfig.ogImage }],
    },
    alternates: {
      canonical: `/${locale}/contact`,
      languages: { ar: '/ar/contact', en: '/en/contact' },
    },
  };
}

export default function Page() {
  return <ContactPage />;
}