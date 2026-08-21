'use client';
// src/features/admin/components/AdminPagesShell.tsx
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { LogOut, LayoutDashboard, Users } from 'lucide-react';

interface Props {
  locale: string;
  children: React.ReactNode;
}

export const AdminPagesShell = ({ locale, children }: Props) => {
  const t = useTranslations('admin');
  const isAr = locale === 'ar';

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    window.location.href = `/${locale}`;
  };

  return (
    <div className="min-h-screen bg-gray-50" dir={isAr ? 'rtl' : 'ltr'}>
      <header className="bg-[#0652ba] text-white px-6 py-4 shadow-lg flex items-center justify-between">
        <div className="flex items-center gap-3">
          <LayoutDashboard className="w-6 h-6" />
          <div className="flex items-center gap-4">
            <span className="font-bold">{t('students')}</span>
            <span className="hidden sm:block text-white/50">•</span>
            <nav className="hidden sm:flex items-center gap-4 text-sm">
              <Link href={`/${locale}/teacher-login/admin`} className="text-white/80 hover:text-white transition-colors flex items-center gap-1.5">
                <LayoutDashboard className="w-4 h-4" />{t('dashboardTitle')}
              </Link>
              <Link href={`/${locale}/teacher-login/admin/students`} className="text-white/80 hover:text-white transition-colors flex items-center gap-1.5">
                <Users className="w-4 h-4" />{t('students')}
              </Link>
            </nav>
          </div>
        </div>
        <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-semibold transition-colors">
          <LogOut className="w-4 h-4" />
          {t('logout')}
        </button>
      </header>
      <main className="p-4 md:p-8 max-w-6xl mx-auto">{children}</main>
    </div>
  );
};