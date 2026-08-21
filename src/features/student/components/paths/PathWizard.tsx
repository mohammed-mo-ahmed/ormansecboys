'use client';
// src/features/student/components/paths/PathWizard.tsx

import { useState } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { ArrowLeft, ArrowRight, CheckCircle2, ShieldCheck, Route, Loader2, AlertCircle, Check } from 'lucide-react';
import type { StudentProfile as Student, StudyPath, SpecialtySubject } from '../../types/student.types';
import { PATH_SPECIALTY_SUBJECTS } from '../../types/student.types';
import { PATHS_CONFIG, PATH_COLORS } from '../../config/paths';

interface Props {
  student: Student;
  locale: string;
}

export const PathWizard = ({ student, locale }: Props) => {
  const t = useTranslations('paths');
  const ts = useTranslations('student');
  const isAr = locale === 'ar';

  const [step, setStep] = useState<'info' | 'form' | 'done'>('info');
  const [confirmed, setConfirmed] = useState(false);
  const [selectedPath, setSelectedPath] = useState<StudyPath | null>(student.path);
  const [selectedSubject, setSelectedSubject] = useState<SpecialtySubject | ''>(student.specialtySubject ?? '');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const Arrow = isAr ? ArrowLeft : ArrowRight;

  const selectPath = (id: StudyPath) => {
    setSelectedPath(id);
    const existing = student.specialtySubject;
    setSelectedSubject(existing && PATH_SPECIALTY_SUBJECTS[id].includes(existing) ? existing : '');
  };

  const handleSubmit = async () => {
    if (!selectedPath || !selectedSubject) {
      setError(ts('choosePathDesc'));
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch('/api/student/path', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path: selectedPath, specialtySubject: selectedSubject, confirmed: true }),
        credentials: 'same-origin',
      });
      if (!res.ok) throw new Error();
      setStep('done');
    } catch {
      setError(ts('saveError'));
    } finally {
      setSubmitting(false);
    }
  };

  // ---------- Path already chosen: show locked warning ----------
  if (student.path) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4" dir={isAr ? 'rtl' : 'ltr'}>
        <div className="text-center max-w-md bg-white rounded-2xl shadow-sm border border-gray-100 p-10">
          <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-10 h-10 text-red-600" />
          </div>
          <h1 className="text-2xl font-black text-gray-900 mb-2">{t('alreadyChosenTitle')}</h1>
          <p className="text-red-600 font-bold mb-2">{t('alreadyChosenNote')}</p>
          <p className="text-gray-500 text-sm mb-6">{t('alreadyChosenNote')}</p>
          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <p className="font-bold text-[#0652ba]">{t(`${student.path}.name`)}</p>
            {student.specialtySubject && (
              <p className="text-sm text-gray-500 mt-1">{ts(`specialtySubjects.${student.specialtySubject}`)}</p>
            )}
          </div>
          <Link href={`/${locale}/student`} className="inline-flex items-center gap-2 px-6 py-3 bg-[#0652ba] text-white rounded-xl font-bold hover:bg-[#0541a5] transition-colors">
            {isAr ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
            {ts('profileTitle')}
          </Link>
        </div>
      </div>
    );
  }

  // ---------- Step 2: النموذج ----------
  if (step === 'form') {
    return (
      <div className="min-h-screen bg-gray-50" dir={isAr ? 'rtl' : 'ltr'}>
        <div className="max-w-3xl mx-auto p-4 md:p-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-black text-gray-900">{t('chooseYourPath')}</h1>
            <button onClick={() => setStep('info')} className="flex items-center gap-1.5 text-sm font-bold text-gray-500 hover:text-gray-800 transition-colors">
              {isAr ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}{t('back')}
            </button>
          </div>

          <div className="space-y-3">
            {PATHS_CONFIG.map(({ id }) => {
              const active = selectedPath === id;
              return (
                <button
                  key={id}
                  onClick={() => selectPath(id)}
                  className={`w-full text-start flex items-center justify-between gap-3 p-5 rounded-2xl border-2 transition-all active:scale-[0.99] ${
                    active ? 'border-[#0652ba] bg-[#0652ba]/5 ring-2 ring-[#0652ba]/30' : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <div>
                    <p className="font-black text-gray-900">{t(`${id}.name`)}</p>
                    <p className="text-sm text-gray-500 line-clamp-2">{t(`${id}.intro`)}</p>
                  </div>
                  <span className={`shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center ${active ? 'border-[#0652ba] bg-[#0652ba]' : 'border-gray-300'}`}>
                    {active && <Check className="w-4 h-4 text-white" />}
                  </span>
                </button>
              );
            })}
          </div>

          {selectedPath && (
            <div className="mt-6 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <label className="block text-sm font-bold text-gray-700 mb-2">{t('subjectLabel')}</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {PATH_SPECIALTY_SUBJECTS[selectedPath].map(subj => (
                  <button
                    key={subj}
                    onClick={() => setSelectedSubject(subj)}
                    className={`w-full text-start px-4 py-3 rounded-xl border transition-all ${
                      selectedSubject === subj ? 'border-[#0652ba] bg-[#0652ba] text-white font-bold' : 'border-gray-200 bg-gray-50 hover:border-gray-300'
                    }`}
                  >
                    {ts(`specialtySubjects.${subj}`)}
                  </button>
                ))}
              </div>
            </div>
          )}

          {error && (
            <p className="mt-4 flex items-center gap-2 text-red-600 bg-red-50 px-4 py-3 rounded-xl text-sm font-bold">
              <AlertCircle className="w-4 h-4 shrink-0" />{error}
            </p>
          )}

          <div className="mt-6 bg-red-50 border-2 border-red-300 rounded-2xl p-5 text-center">
            <p className="text-red-700 font-black text-lg">{t('lockedWarning')}</p>
          </div>

          <button
            onClick={handleSubmit}
            disabled={!selectedPath || !selectedSubject || submitting}
            className="mt-6 w-full flex items-center justify-center gap-2 py-4 bg-[#0652ba] text-white rounded-2xl font-black text-lg hover:bg-[#0541a5] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <ShieldCheck className="w-5 h-5" />}
            {t('submitPath')}
          </button>
        </div>
      </div>
    );
  }

  // ---------- Step 3: تم ----------
  if (step === 'done') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4" dir={isAr ? 'rtl' : 'ltr'}>
        <div className="text-center max-w-md bg-white rounded-2xl shadow-sm border border-gray-100 p-10">
          <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-2xl font-black text-gray-900 mb-2">{t('success')}</h1>
          {selectedPath && (
            <p className="text-[#0652ba] font-bold mb-4">
              {t(`${selectedPath}.name`)} — {ts(`specialtySubjects.${selectedSubject as SpecialtySubject}`)}
            </p>
          )}
          <Link href={`/${locale}/student`} className="inline-flex items-center gap-2 px-6 py-3 bg-[#0652ba] text-white rounded-xl font-bold hover:bg-[#0541a5] transition-colors">
            {isAr ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
            {ts('profileTitle')}
          </Link>
        </div>
      </div>
    );
  }

  // ---------- Step 1: المعلومات + التأكيد ----------
  return (
    <div className="min-h-screen bg-gray-50 pb-16" dir={isAr ? 'rtl' : 'ltr'}>
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-8">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-2xl md:text-3xl font-black text-gray-900">{t('pageTitle')}</h1>
          <Link href={`/${locale}/student`} className="flex items-center gap-1.5 text-sm font-bold text-gray-500 hover:text-gray-800 transition-colors">
            {isAr ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}{ts('profileTitle')}
          </Link>
        </div>

        {/* Intro */}
        <div className="bg-[#0652ba] text-white rounded-2xl p-6 md:p-8 mb-6 shadow-lg">
          <h2 className="text-xl font-black mb-2">{t('introTitle')}</h2>
          <p className="text-white/90 leading-relaxed">{t('intro')}</p>
          <p className="mt-3 text-amber-200 font-bold text-sm flex items-start gap-2">
            <ShieldCheck className="w-5 h-5 shrink-0 mt-0.5" />{t('readCarefully')}
          </p>
        </div>

        {/* Paths list */}
        <div className="space-y-6">
          {PATHS_CONFIG.map(({ id }) => (
            <section key={id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className={`px-6 py-4 border-b flex items-center gap-3 ${PATH_COLORS[id]}`}>
                <Route className="w-6 h-6 shrink-0" />
                <h3 className="text-lg font-black">{t(`${id}.name`)}</h3>
              </div>
              <div className="p-6 space-y-4">
                <p className="text-gray-600 leading-relaxed">{t(`${id}.intro`)}</p>

                <div>
                  <p className="text-sm font-bold text-gray-900 mb-2">{t(`${id}.secondSubjectTitle`)}</p>
                  <div className="flex flex-wrap gap-2">
                    {PATH_SPECIALTY_SUBJECTS[id].map(subj => (
                      <span key={subj} className="px-3 py-1.5 bg-blue-50 text-blue-800 rounded-lg text-sm font-bold">{ts(`specialtySubjects.${subj}`)}</span>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-sm font-bold text-gray-900 mb-2">{t(`${id}.thirdSubjectsTitle`)}</p>
                  <div className="flex flex-wrap gap-2">
                    {t.raw(`${id}.thirdSubjects`).map((item: string, i: number) => (
                      <span key={i} className="px-3 py-1.5 bg-purple-50 text-purple-800 rounded-lg text-sm font-bold">{item}</span>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-sm font-bold text-gray-900 mb-2">{t(`${id}.collegesTitle`)}</p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 list-disc list-inside text-gray-600">
                    {t.raw(`${id}.colleges`).map((item: string, i: number) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
          ))}
        </div>

        {/* Common subjects */}
        <section className="mt-6 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h3 className="text-lg font-black text-gray-900 mb-1">{t('common.title')}</h3>
          <p className="text-gray-500 mb-4">— {t('common.intro')}</p>
          <div className="space-y-4 text-sm">
            <div>
              <p className="font-bold text-gray-900 mb-2">{t('common.secondTitle')}</p>
              <div className="flex flex-wrap gap-2">
                {t.raw('common.secondTotal').map((item: string, i: number) => (
                  <span key={i} className="px-3 py-1.5 bg-green-50 text-green-800 rounded-lg font-bold">{item}</span>
                ))}
              </div>
              <p className="mt-1.5 text-gray-500">{t('common.secondTotalNote')}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {t.raw('common.secondOther').map((item: string, i: number) => (
                  <span key={i} className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg font-bold">{item}</span>
                ))}
              </div>
            </div>
            <div>
              <p className="font-bold text-gray-900 mb-2">{t('common.thirdTitle')}</p>
              <div className="flex flex-wrap gap-2">
                {t.raw('common.third').map((item: string, i: number) => (
                  <span key={i} className="px-3 py-1.5 bg-amber-50 text-amber-800 rounded-lg font-bold">{item}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Shared colleges */}
        <section className="mt-6 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h3 className="text-lg font-black text-gray-900 mb-2">{t('sharedColleges.title')}</h3>
          <p className="text-gray-500 mb-4 leading-relaxed">{t('sharedColleges.note')}</p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 list-disc list-inside text-gray-600">
            {t.raw('sharedColleges.list').map((item: string, i: number) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </section>

        {/* Before choosing */}
        <section className="mt-6 bg-amber-50 border border-amber-200 rounded-2xl p-6">
          <h3 className="text-lg font-black text-amber-900 mb-2">{t('beforeChoosing.title')}</h3>
          <p className="text-amber-900/80 leading-relaxed">{t('beforeChoosing.text')}</p>
        </section>

        {/* Confirmation gate */}
        <div className="mt-8 bg-white rounded-2xl border-2 border-[#0652ba]/20 shadow-lg p-6">
          <label className="flex items-start gap-3 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={confirmed}
              onChange={e => setConfirmed(e.target.checked)}
              className="mt-1 w-5 h-5 accent-[#0652ba]"
            />
            <span className="font-bold text-gray-800 leading-relaxed">{t('confirm')}</span>
          </label>
          <button
            onClick={() => setStep('form')}
            disabled={!confirmed}
            className="mt-5 w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-[#0652ba] text-white rounded-2xl font-black text-lg hover:bg-[#0541a5] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            {t('continue')}
            <Arrow className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};