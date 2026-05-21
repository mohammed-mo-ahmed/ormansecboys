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

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
};

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