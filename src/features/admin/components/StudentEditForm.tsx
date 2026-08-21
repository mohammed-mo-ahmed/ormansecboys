'use client';
// src/features/admin/components/StudentEditForm.tsx
import { useState } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { ArrowRight, ArrowLeft, Save, Loader2, AlertCircle, CheckCircle2, CalendarDays } from 'lucide-react';
import type { StudentProfile, Grade, StudyPath, SpecialtySubject } from '@/features/student/types/student.types';
import { GRADES, STUDY_PATHS, PATH_SPECIALTY_SUBJECTS, STUDENT_TYPES, SECOND_LANGS, BRANCHES } from '@/features/student/types/student.types';
import { birthDateFromNationalId, formatBirthDate } from '@/features/student/utils/nationalId';

interface Props {
  student: StudentProfile;
  locale: string;
}

interface FormState {
  name: string;
  code: string;
  nationalId: string;
  grade: Grade;
  classroom: string;
  seatNumber: string;
  branch: string;
  path: string;
  specialtySubject: string;
  studentType: string;
  secondLang: string;
  phone: string;
  parentPhone: string;
  total: string;
}

const Field = ({ label, children, hint }: { label: string; children: React.ReactNode; hint?: string }) => (
  <div>
    <label className="block text-xs font-bold text-gray-600 mb-1.5">{label}</label>
    {children}
    {hint && <p className="text-[11px] text-gray-400 mt-1">{hint}</p>}
  </div>
);

export const StudentEditForm = ({ student, locale }: Props) => {
  const t = useTranslations('admin');
  const ts = useTranslations('student');
  const tp = useTranslations('paths');
  const isAr = locale === 'ar';

  const [form, setForm] = useState<FormState>({
    name: student.name ?? '',
    code: student.code ?? '',
    nationalId: student.nationalId ?? '',
    grade: student.grade,
    classroom: student.classroom ?? '',
    seatNumber: student.seatNumber ?? '',
    branch: student.branch ?? '',
    path: student.path ?? '',
    specialtySubject: student.specialtySubject ?? '',
    studentType: student.studentType ?? '',
    secondLang: student.secondLang ?? '',
    phone: student.phone ?? '',
    parentPhone: student.parentPhone ?? '',
    total: student.total ?? '',
  });
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'ok' | 'err'; msg: string } | null>(null);

  const set = (key: keyof FormState, value: string) =>
    setForm(prev => ({ ...prev, [key]: value }));

  const selectPath = (value: string) => {
    const path = value as StudyPath;
    setForm(prev => {
      const existing = prev.specialtySubject;
      const subject = existing && PATH_SPECIALTY_SUBJECTS[path].includes(existing as SpecialtySubject)
        ? existing
        : '';
      return { ...prev, path: value, specialtySubject: subject };
    });
  };

  const birthDate = birthDateFromNationalId(form.nationalId);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setFeedback(null);
    const payload = {
      id: student.id,
      name: form.name.trim(),
      code: form.code.trim() || null,
      nationalId: form.nationalId.trim(),
      grade: form.grade,
      classroom: form.classroom.trim() || null,
      seatNumber: form.seatNumber.trim() || null,
      branch: form.branch || null,
      path: form.path || null,
      specialtySubject: form.specialtySubject || null,
      studentType: form.studentType || null,
      secondLang: form.secondLang || null,
      phone: form.phone.trim() || null,
      parentPhone: form.parentPhone.trim() || null,
      total: form.total.trim() || null,
    };
    try {
      const res = await fetch('/api/admin/student', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        credentials: 'same-origin',
      });
      if (res.status === 409) {
        setFeedback({ type: 'err', msg: isAr ? 'هذا الرقم القومي مسجل لطالب آخر' : 'This National ID already exists for another student' });
        return;
      }
      if (!res.ok) {
        setFeedback({ type: 'err', msg: t('saveError') });
        return;
      }
      setFeedback({ type: 'ok', msg: t('saved') });
      const data = await res.json();
      if (data.student) {
        setForm({
          name: data.student.name ?? '',
          code: data.student.code ?? '',
          nationalId: data.student.nationalId ?? '',
          grade: data.student.grade,
          classroom: data.student.classroom ?? '',
          seatNumber: data.student.seatNumber ?? '',
          branch: data.student.branch ?? '',
          path: data.student.path ?? '',
          specialtySubject: data.student.specialtySubject ?? '',
          studentType: data.student.studentType ?? '',
          secondLang: data.student.secondLang ?? '',
          phone: data.student.phone ?? '',
          parentPhone: data.student.parentPhone ?? '',
          total: data.student.total ?? '',
        });
      }
    } catch {
      setFeedback({ type: 'err', msg: t('saveError') });
    } finally {
      setSaving(false);
    }
  };

  const inputCls =
    'w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0652ba] transition-all';
  const selectCls = inputCls;

  return (
    <div dir={isAr ? 'rtl' : 'ltr'}>
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-5">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-black text-gray-900">{t('editTitle')}</h1>
          <Link href={`/${locale}/teacher-login/admin/students`} className="flex items-center gap-1.5 text-sm font-bold text-gray-500 hover:text-gray-800 transition-colors">
            {isAr ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
            {t('backToList')}
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Field label={ts('name')}>
            <input value={form.name} onChange={e => set('name', e.target.value)} className={inputCls} required />
          </Field>
          <Field label={ts('code')}>
            <input value={form.code} onChange={e => set('code', e.target.value)} className={inputCls} />
          </Field>
          <Field label={ts('nationalId')}>
            <input value={form.nationalId} onChange={e => set('nationalId', e.target.value.replace(/\D/g, '').slice(0, 14))} dir="ltr" className={`${inputCls} tracking-widest`} required />
          </Field>
          <Field label={ts('birthDate')} hint={ts('birthAuto')}>
            <div className="flex items-center gap-2 px-3 py-2.5 bg-gray-50 border border-dashed border-gray-300 rounded-xl text-sm font-bold text-gray-500">
              <CalendarDays className="w-4 h-4" />
              {formatBirthDate(birthDate, locale)}
            </div>
          </Field>
          <Field label={ts('grade')}>
            <select value={form.grade} onChange={e => set('grade', e.target.value)} className={selectCls}>
              {GRADES.map(g => <option key={g} value={g}>{ts(g)}</option>)}
            </select>
          </Field>
          <Field label={ts('classroom')}>
            <input value={form.classroom} onChange={e => set('classroom', e.target.value)} className={inputCls} />
          </Field>
          <Field label={ts('seatNumber')}>
            <input value={form.seatNumber} onChange={e => set('seatNumber', e.target.value)} className={inputCls} />
          </Field>
          <Field label={ts('studentType')}>
            <select value={form.studentType} onChange={e => set('studentType', e.target.value)} className={selectCls}>
              <option value="">{`${t('select')}...`}</option>
              {STUDENT_TYPES.map(st => <option key={st} value={st}>{ts(`studentTypes.${st}`)}</option>)}
            </select>
          </Field>
          <Field label={ts('secondLang')}>
            <select value={form.secondLang} onChange={e => set('secondLang', e.target.value)} className={selectCls}>
              <option value="">{`${t('select')}...`}</option>
              {SECOND_LANGS.map(l => <option key={l} value={l}>{ts(`secondLangs.${l}`)}</option>)}
            </select>
          </Field>

          {form.grade === 'grade2' && (
            <>
              <Field label={`${ts('pathBranch')} — ${ts('grade2')}`}>
                <select value={form.path} onChange={e => selectPath(e.target.value)} className={selectCls}>
                  <option value="">{`${t('select')}...`}</option>
                  {STUDY_PATHS.map(p => <option key={p} value={p}>{tp(`${p}.name`)}</option>)}
                </select>
              </Field>
              {form.path ? (
                <Field label={tp('subjectLabel')}>
                  <select value={form.specialtySubject} onChange={e => set('specialtySubject', e.target.value)} className={selectCls}>
                    <option value="">{`${t('select')}...`}</option>
                    {PATH_SPECIALTY_SUBJECTS[form.path as StudyPath].map(s => (
                      <option key={s} value={s}>{ts(`specialtySubjects.${s}`)}</option>
                    ))}
                  </select>
                </Field>
              ) : null}
            </>
          )}

          {form.grade === 'grade3' && (
            <Field label={`${ts('pathBranch')} — ${ts('grade3')}`}>
              <select value={form.branch} onChange={e => set('branch', e.target.value)} className={selectCls}>
                <option value="">{`${t('select')}...`}</option>
                {BRANCHES.map(b => <option key={b} value={b}>{ts(`branches.${b}`)}</option>)}
              </select>
            </Field>
          )}

          <Field label={ts('phone')}>
            <input value={form.phone} onChange={e => set('phone', e.target.value)} dir="ltr" className={inputCls} />
          </Field>
          <Field label={ts('parentPhone')}>
            <input value={form.parentPhone} onChange={e => set('parentPhone', e.target.value)} dir="ltr" className={inputCls} />
          </Field>
          <Field label={ts('total')}>
            <input value={form.total} onChange={e => set('total', e.target.value)} dir="ltr" className={inputCls} />
          </Field>
        </div>

        {feedback && (
          <div className={`flex items-center gap-2 text-sm font-bold px-4 py-3 rounded-xl ${feedback.type === 'ok' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
            {feedback.type === 'ok' ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
            {feedback.msg}
          </div>
        )}

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-8 py-3 bg-[#0652ba] text-white rounded-xl font-black hover:bg-[#0541a5] disabled:opacity-50 transition-all"
          >
            {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
            {saving ? t('saving') : t('save')}
          </button>
        </div>
      </form>
    </div>
  );
};