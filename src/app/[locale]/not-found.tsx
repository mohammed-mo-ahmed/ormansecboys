'use client';
import Link from 'next/link';
import { useLocale } from 'next-intl';

export default function NotFound() {
  const locale = useLocale();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 text-center px-4">
      <h1 className="text-8xl font-bold text-[#0652ba]">404</h1>
      <h2 className="text-2xl font-bold text-gray-900">
        {locale === 'ar' ? 'الصفحة غير موجودة' : 'Page Not Found'}
      </h2>
      <p className="text-gray-600">
        {locale === 'ar'
          ? 'الصفحة التي تبحث عنها غير موجودة أو تم نقلها'
          : 'The page you are looking for does not exist or has been moved'}
      </p>
      <Link
        href={`/${locale}`}
        className="px-8 py-3 bg-[#0652ba] text-white rounded-lg font-bold hover:bg-[#0541a5] transition-colors"
      >
        {locale === 'ar' ? 'العودة للرئيسية' : 'Back to Home'}
      </Link>
    </div>
  );
}