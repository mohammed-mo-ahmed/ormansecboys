// src/app/[locale]/(public)/history/page.tsx
import { setRequestLocale } from 'next-intl/server';
import { HistoryPage } from '@/features/about';
type Props = { params: Promise<{ locale: string }> };
export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <HistoryPage />;
}