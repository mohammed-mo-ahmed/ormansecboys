// src/app/[locale]/teacher-login/admin/(panel)/layout.tsx
import { NextIntlClientProvider } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { redirect } from 'next/navigation';
import { isAdminSession } from '@/lib/auth/session';

export const dynamic = 'force-dynamic';

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function AdminPanelLayout({ children, params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const ok = await isAdminSession();
  if (!ok) {
    redirect(`/${locale}/teacher-login`);
  }

  const messages = (
    await import(`@/lib/i18n/messages/${locale}.json`)
  ).default;

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <div className="min-h-screen bg-gray-50">{children}</div>
    </NextIntlClientProvider>
  );
}