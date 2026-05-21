// src/app/[locale]/(public)/vision/page.tsx
import { setRequestLocale } from 'next-intl/server';
import { VisionPage } from '@/features/about';
type Props = { params: Promise<{ locale: string }> };
export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <VisionPage />;
}