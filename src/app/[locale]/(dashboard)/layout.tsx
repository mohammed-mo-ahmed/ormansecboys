// ✅ Dashboard layout — Auth protection بـ sessionStorage للطلاب
// بيتحقق من student_data في sessionStorage بدل Firebase Auth
import { setRequestLocale } from 'next-intl/server';
import { StudentAuthGuard } from '@/features/auth/guards/StudentAuthGuard';

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function DashboardLayout({ children, params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    // ✅ StudentAuthGuard هو Client Component بيتحقق من sessionStorage
    <StudentAuthGuard>
      <div className="min-h-screen bg-gray-100 flex">
        {/* Sidebar — هيتبني لاحقاً */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </StudentAuthGuard>
  );
}