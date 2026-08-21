// src/app/[locale]/teacher-login/admin/(panel)/page.tsx
import { setRequestLocale } from 'next-intl/server';
import { getStats } from '@/features/student/services/students.db';
import { AdminDashboard } from '@/features/admin/components/AdminDashboard';

type Props = { params: Promise<{ locale: string }> };

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const stats = await getStats();
  return <AdminDashboard stats={stats} locale={locale} />;
}