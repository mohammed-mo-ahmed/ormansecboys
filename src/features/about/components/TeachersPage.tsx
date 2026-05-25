// src/features/about/components/TeachersPage.tsx
import { getTranslations } from 'next-intl/server';
import { getTeachers, groupTeachersBySubject } from '../services/teachers.service';
import { TeacherAccordion } from './TeacherAccordion';
import type { Locale } from '@/lib/i18n/config';

interface TeachersPageProps {
  locale: string;
}

export const TeachersPage = async ({ locale }: TeachersPageProps) => {
  const [teachers, t] = await Promise.all([
    getTeachers(),
    getTranslations('about.teachers'),
  ]);
  const groups = groupTeachersBySubject(teachers);

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 space-y-12">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">{t('title')}</h1>
          <p className="text-xl text-gray-600">{t('subtitle')}</p>
        </div>
        <TeacherAccordion groups={groups} locale={locale as Locale} />
      </div>
    </div>
  );
};