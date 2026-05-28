import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/lib/i18n/routing';
import { Navigation } from '@/shared/components/layout/Navigation';
import { Footer }      from '@/shared/components/layout/Footer';
import { LangDirSync } from '@/shared/components/layout/LangDirSync';
import { siteConfig }  from '@/config/site';

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === 'ar';

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: siteConfig.name[isAr ? 'ar' : 'en'],
      template: `%s | ${siteConfig.name[isAr ? 'ar' : 'en']}`,
    },
    description: siteConfig.description[isAr ? 'ar' : 'en'],
    keywords: [...siteConfig.keywords],
    authors: [{ name: 'Al-Orman School' }],
    creator: 'Al-Orman School',
    icons: {
      icon: '/favicon.ico',
      shortcut: '/favicon.ico',
      apple: '/apple-touch-icon.png',
    },
    openGraph: {
      type: 'website',
      locale: isAr ? 'ar_EG' : 'en_US',
      url: siteConfig.url,
      title: siteConfig.name[isAr ? 'ar' : 'en'],
      description: siteConfig.description[isAr ? 'ar' : 'en'],
      siteName: siteConfig.name[isAr ? 'ar' : 'en'],
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: siteConfig.name[isAr ? 'ar' : 'en'],
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: siteConfig.name[isAr ? 'ar' : 'en'],
      description: siteConfig.description[isAr ? 'ar' : 'en'],
      images: [siteConfig.ogImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: 'your-google-verification-code', // User can update this later
    },
  };
}

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  setRequestLocale(locale);

  // ✅ بيجيب الـ messages مباشرة من الملف بدل getMessages()
  // getMessages() بتيجي عربي دايماً بسبب مشكلة في الـ async context
  const messages = (
    await import(`@/lib/i18n/messages/${locale}.json`)
  ).default;

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <LangDirSync locale={locale} />
      <Navigation />
      <main id="main-content">{children}</main>
      <Footer />
    </NextIntlClientProvider>
  );
}