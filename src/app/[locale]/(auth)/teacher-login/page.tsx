// src/app/[locale]/(auth)/teacher-login/page.tsx
// ✅ صفحة placeholder — هتتبني لاحقاً
import { setRequestLocale } from 'next-intl/server';

type Props = { params: Promise<{ locale: string }> };

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isAr = locale === 'ar';

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-4xl">🔒</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-3">
          {isAr ? 'بوابة المعلمين والعاملين' : 'Teacher & Staff Portal'}
        </h1>
        <p className="text-gray-500 mb-6">
          {isAr
            ? 'هذه الصفحة قيد التطوير وستكون متاحة قريباً'
            : 'This page is under development and will be available soon'}
        </p>
        <a
          href={`/${locale}/login`}
          className="text-[#0652ba] hover:underline font-medium text-sm"
        >
          ← {isAr ? 'العودة لتسجيل دخول الطلاب' : 'Back to student login'}
        </a>
      </div>
    </div>
  );
}