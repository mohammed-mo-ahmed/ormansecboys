'use client';
// src/features/admin/components/AdminDashboard.tsx
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { LogOut, Users, BookOpen, LayoutDashboard, Route, UsersRound, CheckCircle2, Hourglass } from 'lucide-react';
import type { AdminStats } from '../types';
import { PATH_COLORS } from '@/features/student/config/paths';
import type { Branch, StudyPath } from '@/features/student/types/student.types';

interface Props {
  stats: AdminStats;
  locale: string;
}

export const AdminDashboard = ({ stats, locale }: Props) => {
  const t = useTranslations('admin');
  const ts = useTranslations('student');
  const tp = useTranslations('paths');
  const isAr = locale === 'ar';

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    window.location.href = `/${locale}`;
  };

  const pathKeys: StudyPath[] = ['medicine', 'engineering', 'business', 'arts'];
  const branchKeys: Branch[] = ['adabi', 'science', 'math'];

  return (
    <div className="min-h-screen bg-gray-50" dir={isAr ? 'rtl' : 'ltr'}>
      <header className="bg-[#0652ba] text-white px-6 py-4 shadow-lg flex items-center justify-between">
        <div className="flex items-center gap-3">
          <LayoutDashboard className="w-7 h-7" />
          <div>
            <h1 className="text-lg font-bold">{t('dashboardTitle')}</h1>
            <p className="text-xs text-white/70">{t('loginSubtitle')}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link href={`/${locale}/teacher-login/admin/students`} className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-semibold transition-colors">
            {t('students')}
          </Link>
          <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-semibold transition-colors">
            <LogOut className="w-4 h-4" />
            {t('logout')}
          </button>
        </div>
      </header>

      <main className="p-4 md:p-8 max-w-6xl mx-auto space-y-6">
        {/* Total + grades */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center shrink-0"><Users className="w-6 h-6 text-[#0652ba]" /></div>
            <div>
              <p className="text-2xl font-black text-gray-900">{stats.total}</p>
              <p className="text-xs text-gray-500">{t('stats.total')}</p>
            </div>
          </div>
          {(['grade1', 'grade2', 'grade3'] as const).map(g => (
            <div key={g} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex items-center gap-4">
              <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center shrink-0"><BookOpen className="w-6 h-6 text-green-600" /></div>
              <div>
                <p className="text-2xl font-black text-gray-900">{stats.byGrade[g]}</p>
                <p className="text-xs text-gray-500">{ts(g)}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Paths (grade 2) */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-2 mb-4 text-[#0652ba]">
            <Route className="w-5 h-5" />
            <h2 className="font-bold text-gray-900">{t('stats.studentsPerPath')}</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {pathKeys.map(id => (
              <Link
                key={id}
                href={`/${locale}/teacher-login/admin/students?path=${id}`}
                className={`rounded-xl border-2 p-4 transition-transform hover:scale-[1.02] ${PATH_COLORS[id]}`}
              >
                <p className="text-3xl font-black">{stats.paths[id]}</p>
                <p className="font-bold text-sm mt-1">{tp(`${id}.name`)}</p>
              </Link>
            ))}
          </div>
          <div className="mt-5 flex flex-col sm:flex-row gap-3">
            <div className="flex-1 flex items-center gap-3 bg-green-50 border border-green-200 rounded-xl px-4 py-3">
              <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
              <p className="text-sm font-bold text-green-800">{t('stats.chosen')}: <span className="text-lg">{stats.pathChosen}</span></p>
            </div>
            <div className="flex-1 flex items-center gap-3 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
              <Hourglass className="w-5 h-5 text-amber-600 shrink-0" />
              <p className="text-sm font-bold text-amber-800">{t('stats.notChosen')}: <span className="text-lg">{stats.pathNotChosen}</span></p>
            </div>
            <Link
              href={`/${locale}/teacher-login/admin/students?grade=grade2`}
              className="flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 rounded-xl px-4 py-3 text-sm font-bold text-gray-700 transition-colors"
            >
              <UsersRound className="w-5 h-5 shrink-0" />
              {t('stats.grade2')}: {stats.byGrade.grade2}
            </Link>
          </div>
        </div>

        {/* Branches (grade 3) */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="font-bold text-gray-900 mb-4">{t('stats.branches3')}</h2>
          <div className="grid grid-cols-3 gap-4">
            {branchKeys.map(b => (
              <Link key={b} href={`/${locale}/teacher-login/admin/students?branch=${b}`} className="rounded-xl border border-gray-200 p-4 text-center hover:bg-gray-50 transition-colors">
                <p className="text-3xl font-black text-gray-900">{stats.branches[b]}</p>
                <p className="font-bold text-sm text-gray-500 mt-1">{ts(`branches.${b}`)}</p>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};