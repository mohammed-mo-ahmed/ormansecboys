// src/features/student/config/paths.ts
// البيانات الهيكلية للمسارات الدراسية — النصوص في ملفات i18n (ar/en.json)

import type { StudyPath, SpecialtySubject } from '../types/student.types';

export interface PathSummary {
  id: StudyPath;
  /** مفتاح الترجمة داخل namespace paths (مثل paths.medicine) */
  labelKey: string;
}

export const PATHS_CONFIG: PathSummary[] = [
  { id: 'medicine', labelKey: 'medicine' },
  { id: 'engineering', labelKey: 'engineering' },
  { id: 'business', labelKey: 'business' },
  { id: 'arts', labelKey: 'arts' },
];

/**
 * خيارات المادة التخصصية للصف الثاني لكل مسار.
 * المعرّف هو مفتاح ترجمة داخل paths.specialtySubjects
 */
export const PATH_SPECIALTY_SUBJECTS: Record<StudyPath, SpecialtySubject[]> = {
  medicine: ['physics', 'math'],
  engineering: ['chemistry', 'programming'],
  business: ['accounting', 'businessAdmin'],
  arts: ['psychology', 'secondLang'],
};

export const PATH_COLORS: Record<StudyPath, string> = {
  medicine: 'bg-red-50 border-red-200 text-red-700',
  engineering: 'bg-blue-50 border-blue-200 text-blue-700',
  business: 'bg-amber-50 border-amber-200 text-amber-700',
  arts: 'bg-purple-50 border-purple-200 text-purple-700',
};