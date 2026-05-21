// src/app/[locale]/(public)/clubs/page.tsx
import { setRequestLocale } from 'next-intl/server';
import { ClubsPage } from '@/features/activities';
type Props = { params: Promise<{ locale: string }> };
export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ClubsPage />;
}