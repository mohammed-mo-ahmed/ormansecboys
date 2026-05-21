// src/app/[locale]/(public)/student-union/page.tsx
import { setRequestLocale } from 'next-intl/server';
import { StudentUnionPage } from '@/features/activities';
type Props = { params: Promise<{ locale: string }> };
export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <StudentUnionPage />;
}