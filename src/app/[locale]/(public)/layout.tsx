import { setRequestLocale } from 'next-intl/server';

// ✅ Public route group — بس بيعمل setRequestLocale، مفيش UI إضافي
type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function PublicLayout({ children, params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <>{children}</>;
}