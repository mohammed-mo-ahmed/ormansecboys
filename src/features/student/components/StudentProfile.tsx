'use client';
// src/features/student/components/StudentProfile.tsx

import { useState } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import {
  LogOut,
  IdCard,
  CalendarDays,
  Hash,
  Users,
  BookOpen,
  Phone,
  UserRound,
  GraduationCap,
  Languages,
  Pencil,
  X,
  Check,
  Route,
  ArrowRight,
  ArrowLeft,
  MapPin,
  Fingerprint,
} from 'lucide-react';
import type { StudentProfile as Student } from '../types/student.types';
import { birthDateFromNationalId, formatBirthDate } from '../utils/nationalId';
import { PATH_COLORS } from '../config/paths';

interface Props {
  student: Student;
  locale: string;
}

const Field = ({
  icon: Icon,
  label,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  children: React.ReactNode;
}) => (
  <div className="bg-gray-50 rounded-xl p-4 print:bg-transparent print:border print:border-gray-200">
    <div className="flex items-center gap-2 text-gray-500 mb-1">
      <Icon className="w-4 h-4" />
      <span className="text-[11px] font-semibold uppercase tracking-wide">{label}</span>
    </div>
    <div className="font-bold text-gray-900 text-sm">{children}</div>
  </div>
);

export const StudentProfile = ({ student: initial, locale }: Props) => {
  const t = useTranslations('student');
  const tp = useTranslations('paths');
  const isAr = locale === 'ar';

  const [student, setStudent] = useState<Student>(initial);
  const [editing, setEditing] = useState<'phone' | 'parentPhone' | null>(null);
  const [editValue, setEditValue] = useState('');
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState<'saved' | 'error' | null>(null);

  const birthDate = birthDateFromNationalId(student.nationalId);

  const handleLogout = async () => {
    await fetch('/api/student/logout', { method: 'POST' });
    window.location.href = `/${locale}`;
  };

  const startEdit = (field: 'phone' | 'parentPhone') => {
    setEditing(field);
    setEditValue(student[field] ?? '');
    setSaveMsg(null);
  };

  const handleSave = async () => {
    if (!editing) return;
    setSaving(true);
    try {
      const res = await fetch('/api/student/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ [editing]: editValue }),
        credentials: 'same-origin',
      });
      if (!res.ok) throw new Error();
      const data = await res.json();
      setStudent(prev => (data.student ? { ...prev, ...data.student } : { ...prev, [editing]: editValue || null }));
      setEditing(null);
      setSaveMsg('saved');
      setTimeout(() => setSaveMsg(null), 2500);
    } catch {
      setSaveMsg('error');
    } finally {
      setSaving(false);
    }
  };

  const renderValue = (value: string | null | undefined) =>
    value ? <span>{value}</span> : <span className="text-gray-400">—</span>;

  const pathLabel = student.path ? tp(`${student.path}.name`) : null;
  const branchLabel = student.branch ? t(`branches.${student.branch}`) : null;
  const typeLabel = student.studentType ? t(`studentTypes.${student.studentType}`) : null;
  const langLabel = student.secondLang ? t(`secondLangs.${student.secondLang}`) : null;
  const subjectLabel = student.specialtySubject ? t(`specialtySubjects.${student.specialtySubject}`) : null;

  const editableField = (field: 'phone' | 'parentPhone') => {
    if (editing === field) {
      return (
        <div className="flex items-center gap-1.5">
          <input
            value={editValue}
            onChange={e => setEditValue(e.target.value)}
            dir="ltr"
            autoFocus
            className="flex-1 min-w-0 px-2 py-1 border border-gray-300 rounded-md text-sm font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0652ba]"
          />
          <button onClick={handleSave} disabled={saving} className="p-1.5 rounded-lg bg-green-600 text-white hover:bg-green-700 disabled:opacity-50" aria-label={t('save')}>
            <Check className="w-4 h-4" />
          </button>
          <button onClick={() => setEditing(null)} className="p-1.5 rounded-lg bg-gray-200 hover:bg-gray-300" aria-label={t('cancel')}>
            <X className="w-4 h-4" />
          </button>
        </div>
      );
    }
    return (
      <div className="flex items-center justify-between gap-1.5">
        <span className="truncate" dir="ltr">
          {renderValue(student[field])}
        </span>
        <button onClick={() => startEdit(field)} className="p-1.5 rounded-lg bg-[#0652ba]/10 text-[#0652ba] hover:bg-[#0652ba]/20 no-print shrink-0" aria-label={t('edit')}>
          <Pencil className="w-3.5 h-3.5" />
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col print:bg-white" dir={isAr ? 'rtl' : 'ltr'}>
      <style jsx global>{`
        @media print {
          @page { size: auto; margin: 12mm; }
          body { background: #fff !important; }
          .no-print { display: none !important; }
          .print-only { display: block !important; }
          .shadow-sm, .shadow-lg { box-shadow: none !important; border: 1px solid #eee !important; }
          .bg-gray-50, .bg-gray-100 { background: transparent !important; }
          .bg-[#0652ba] { color: #0652ba !important; background: transparent !important; border-bottom: 2px solid #0652ba !important; }
          header h1 { color: #0652ba !important; }
        }
      `}</style>

      {/* Header */}
      <header className="bg-[#0652ba] text-white px-6 py-4 flex items-center justify-between shadow-lg print:border-b-2 print:border-[#0652ba] print:px-0">
        <div className="flex items-center gap-3">
          <GraduationCap className="w-8 h-8" />
          <h1 className="text-lg sm:text-xl font-bold">{isAr ? 'مدرسة الأورمان الثانوية العسكرية بنين' : 'Al-Orman Secondary Military School for Boys'}</h1>
        </div>
        <div className="flex gap-2 no-print">

          <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all text-sm font-semibold">
            <LogOut className="w-4 h-4" />
            {t('logout')}
          </button>
        </div>
      </header>

      <main className="flex-1 p-4 md:p-8 max-w-5xl mx-auto w-full space-y-6 print:p-0 print:max-w-none print:space-y-4">
        {/* Save feedback */}
        {saveMsg && (
          <div className={`no-print text-sm font-bold px-4 py-3 rounded-xl ${saveMsg === 'saved' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
            {saveMsg === 'saved' ? t('saved') : t('saveError')}
          </div>
        )}

        {/* Identity card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 print:border-0 print:px-0">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">{student.name}</h2>
              <div className="flex flex-wrap items-center gap-2 text-[#0652ba] font-medium text-sm">
                <span className="bg-blue-50 px-2.5 py-1 rounded-md">{t(student.grade)}</span>
                {student.path ? (
                  <span className={`px-2.5 py-1 rounded-md border ${PATH_COLORS[student.path]}`}>{pathLabel}</span>
                ) : student.branch ? (
                  <span className="bg-green-50 text-green-700 px-2.5 py-1 rounded-md">{branchLabel}</span>
                ) : null}
              </div>
            </div>
            <div className="flex items-center gap-3 bg-gray-50 px-4 py-3 rounded-xl print:bg-transparent print:border print:border-gray-100">
              <IdCard className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-[10px] text-gray-500 uppercase">{t('nationalId')}</p>
                <p className="font-bold text-gray-900 tracking-wider" dir="ltr">{student.nationalId}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Path call-to-action (grade 2 only, no-print) */}
        {student.grade === 'grade2' && (
          <div className="no-print">
            {!student.path ? (
              <Link
                href={`/${locale}/student/choose-path`}
                className="group flex items-center justify-between gap-4 bg-gradient-to-l from-[#0652ba] to-[#0541a5] text-white rounded-2xl p-6 shadow-lg hover:shadow-xl hover:scale-[1.01] transition-all"
              >
                <div className="flex items-center gap-4">
                  <Route className="w-10 h-10 text-white/90" />
                  <div>
                    <p className="text-xl font-black">{t('choosePath')}</p>
                    <p className="text-sm text-white/80">{t('choosePathDesc')}</p>
                  </div>
                </div>
                {isAr ? <ArrowLeft className="w-7 h-7 group-hover:-translate-x-1 transition-transform" /> : <ArrowRight className="w-7 h-7 group-hover:translate-x-1 transition-transform" />}
              </Link>
            ) : null}
          </div>
        )}

        {/* Data grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 printable-grid">
          <Field icon={Users} label={t('classroom')}>{renderValue(student.classroom)}</Field>
          <Field icon={Hash} label={t('seatNumber')}>{renderValue(student.seatNumber)}</Field>
          <Field icon={Fingerprint} label={t('code')}>{renderValue(student.code)}</Field>
          <Field icon={CalendarDays} label={t('birthDate')}>
            <span>{formatBirthDate(birthDate, locale)}</span>
          </Field>
          <Field icon={BookOpen} label={t('pathBranch')}>
            {student.grade === 'grade2'
              ? student.path
                ? <span>{pathLabel}</span>
                : renderValue(null)
              : student.grade === 'grade3'
                ? student.branch ? <span>{branchLabel}</span> : renderValue(null)
                : renderValue(null)}
          </Field>
          {student.grade === 'grade2' && student.specialtySubject && (
            <Field icon={BookOpen} label={t('specialtySubjectLabel')}>
              <span>{subjectLabel}</span>
            </Field>
          )}
          <Field icon={UserRound} label={t('studentType')}>{typeLabel ? <span>{typeLabel}</span> : renderValue(null)}</Field>
          <Field icon={Languages} label={t('secondLang')}>{langLabel ? <span>{langLabel}</span> : renderValue(null)}</Field>
          <Field icon={Phone} label={t('phone')}>{editableField('phone')}</Field>
          <Field icon={MapPin} label={t('parentPhone')}>{editableField('parentPhone')}</Field>
        </div>
      </main>

    </div>
  );
};