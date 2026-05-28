// Dashboard layout - Student auth protection via sessionStorage
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
    <StudentAuthGuard>
      <div className="min-h-screen bg-gray-100 flex">
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </StudentAuthGuard>
  );
}
