// src/app/[locale]/(dashboard)/student/page.tsx
import { setRequestLocale } from 'next-intl/server';
import { StudentDashboard } from '@/features/student/components/StudentDashboard';

type Props = { params: Promise<{ locale: string }> };

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <StudentDashboard locale={locale} />;
}