// src/app/[locale]/(auth)/login/page.tsx
import { setRequestLocale } from 'next-intl/server';
import { LoginForm } from '@/features/auth/components/LoginForm';

type Props = { params: Promise<{ locale: string }> };

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <LoginForm locale={locale} />;
}