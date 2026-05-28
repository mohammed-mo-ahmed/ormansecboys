'use client';
import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import {
  LogOut, GraduationCap,
  Hash, Users, CreditCard,
  MessageSquare, BookOpen,
  Award, CheckCircle2
} from 'lucide-react';
import type { StudentData } from '../services/sheets.service';

interface StudentDashboardProps {
  locale: string;
}

export const StudentDashboard = ({ locale }: StudentDashboardProps) => {
  const t = useTranslations('student');
  const isAr = locale === 'ar';
  const [student, setStudent] = useState<StudentData | null>(null);

  useEffect(() => {
    const raw = sessionStorage.getItem('student_data');
    if (raw) {
      try {
        setStudent(JSON.parse(raw));
      } catch {
        sessionStorage.removeItem('student_data');
      }
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem('student_data');
    window.location.href = `/${locale}`;
  };

  if (!student) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-8 h-8 border-4 border-[#0652ba] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const getBranchLabel = (branch?: string) => {
    if (branch === 'علمي') return t('scientific');
    if (branch === 'أدبي') return t('literary');
    return '';
  };

  const getMessage = () => {
    if (student.message === 'auto_congrats') return t('autoCongrats');
    return student.message || t('noMessages');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col" dir={isAr ? 'rtl' : 'ltr'}>
      {/* Header */}
      <header className="bg-[#0652ba] text-white px-6 py-4 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-3">
          <GraduationCap className="w-8 h-8" />
          <h1 className="text-xl font-bold">{t('portal')}</h1>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all text-sm font-semibold"
        >
          <LogOut className="w-4 h-4" />
          {t('logout')}
        </button>
      </header>

      <main className="flex-1 p-4 md:p-8 max-w-5xl mx-auto w-full space-y-6">
        {/* Student Info Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">{student.name}</h2>
              <div className="flex flex-wrap gap-2 text-[#0652ba] font-medium">
                <span>{student.grade}</span>
                {student.branch && (
                  <>
                    <span>—</span>
                    <span className="bg-blue-50 px-2 rounded-md">{getBranchLabel(student.branch)}</span>
                  </>
                )}
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 flex-shrink-0">
              <div className="flex items-center gap-3 bg-gray-50 px-4 py-3 rounded-xl">
                <Users className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-[10px] text-gray-500 uppercase">{t('class')}</p>
                  <p className="font-bold text-gray-900">{student.classroom}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-gray-50 px-4 py-3 rounded-xl">
                <CreditCard className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-[10px] text-gray-500 uppercase">{t('seatNo')}</p>
                  <p className="font-bold text-gray-900">{student.seatNumber}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Grades Tables */}
          <div className="lg:col-span-2 space-y-6">
            {/* Total Subjects */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-50 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#0652ba]" />
                <h3 className="font-bold text-gray-900">{t('results')}</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-start">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-sm font-semibold text-gray-600">{t('subject')}</th>
                      <th className="px-6 py-3 text-center text-sm font-semibold text-gray-600">{t('score')}</th>
                      <th className="px-6 py-3 text-center text-sm font-semibold text-gray-600">{t('max')}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {student.subjects.map((s, i) => (
                      <tr key={i} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 font-medium text-gray-900">{t(`subjects.${s.id}`)}</td>
                        <td className="px-6 py-4 text-center font-bold text-[#0652ba]">{s.grade}</td>
                        <td className="px-6 py-4 text-center text-gray-500">{s.max}</td>
                      </tr>
                    ))}
                    <tr className="bg-blue-50/50">
                      <td className="px-6 py-4 font-bold text-gray-900">{t('total')}</td>
                      <td className="px-6 py-4 text-center font-black text-[#0652ba] text-lg">{student.totalGrade}</td>
                      <td className="px-6 py-4 text-center font-bold text-gray-700">{student.maxTotal}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Non-Total Subjects */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-50 flex items-center gap-2">
                <Award className="w-5 h-5 text-green-600" />
                <h3 className="font-bold text-gray-900">{t('nonTotalResults')}</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-start">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-sm font-semibold text-gray-600">{t('subject')}</th>
                      <th className="px-6 py-3 text-center text-sm font-semibold text-gray-600">{t('score')}</th>
                      <th className="px-6 py-3 text-center text-sm font-semibold text-gray-600">{t('max')}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {student.nonTotalSubjects.map((s, i) => (
                      <tr key={i} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 font-medium text-gray-900">
                          {s.id === 'english2' ? s.subject : t(`subjects.${s.id}`)}
                        </td>
                        <td className="px-6 py-4 text-center font-bold text-green-600">{s.grade}</td>
                        <td className="px-6 py-4 text-center text-gray-500">{s.max}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Sidebar Stats & Message */}
          <div className="space-y-6">
            {/* Percentage Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 text-center">
              <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full border-8 ${student.percentage >= 50 ? 'border-green-50 border-t-green-500' : 'border-red-50 border-t-red-500'} mb-4`}>
                <span className="text-2xl font-black text-gray-900">{student.percentage.toFixed(1)}%</span>
              </div>
              <h4 className="font-bold text-gray-900 mb-1">{t('percentage')}</h4>
              <p className={`text-sm font-bold ${student.percentage >= 50 ? 'text-green-600' : 'text-red-600'}`}>
                {student.percentage >= 50 ? t('passed') : t('failed')}
              </p>
            </div>

            {/* Message Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center gap-2 mb-4 text-[#0652ba]">
                <MessageSquare className="w-5 h-5" />
                <h4 className="font-bold text-gray-900">{t('adminMessage')}</h4>
              </div>
              <div className="bg-blue-50 rounded-xl p-4 text-sm text-blue-900 leading-relaxed italic flex items-start gap-2">
                {student.message === 'auto_congrats' && <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0 text-green-600" />}
                <span>{getMessage()}</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="py-8 text-center text-gray-400 text-sm">
        <p>© {new Date().getFullYear()} {isAr ? 'مدرسة الأورمان الثانوية العسكرية بنين' : 'Al-Orman Secondary Military School for Boys'}</p>
      </footer>
    </div>
  );
};
