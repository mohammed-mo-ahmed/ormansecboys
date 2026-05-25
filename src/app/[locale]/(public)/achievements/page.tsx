import { setRequestLocale } from 'next-intl/server';
import { AchievementsPage } from '@/features/activities';

type Props = { params: Promise<{ locale: string }> };

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <AchievementsPage locale={locale} />;
}