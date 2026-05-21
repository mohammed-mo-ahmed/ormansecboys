// ✅ Dashboard layout — Auth protection بـ Firebase client-side
// مع output: 'export' مفيش server-side auth، بنستخدم Firebase Auth على الـ client
import { setRequestLocale } from 'next-intl/server';
import { AuthGuard } from '@/features/auth/guards/AuthGuard';

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function DashboardLayout({ children, params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    // ✅ AuthGuard هو Client Component بيتحقق من Firebase Auth
    <AuthGuard>
      <div className="min-h-screen bg-gray-100 flex">
        {/* Sidebar — هيتبني لاحقاً */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </AuthGuard>
  );
}