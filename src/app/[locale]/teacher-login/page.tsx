// src/app/[locale]/teacher-login/page.tsx
import { setRequestLocale } from 'next-intl/server';
import { redirect } from 'next/navigation';
import { isAdminSession } from '@/lib/auth/session';
import { AdminLogin } from '@/features/admin/components/AdminLogin';

export const dynamic = 'force-dynamic';

type Props = { params: Promise<{ locale: string }> };

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const ok = await isAdminSession();
  if (ok) {
    redirect(`/${locale}/teacher-login/admin`);
  }

  return <AdminLogin locale={locale} />;
}