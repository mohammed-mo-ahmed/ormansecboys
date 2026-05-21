import type { LocalizedString } from '@/shared/types/common';

export interface Achievement {
  id: string;
  title: LocalizedString;
  year: string;
  image: string;
}

export interface TopStudentGrade {
  id: string;
  title: LocalizedString;
  image: string;
}

export const getAchievements = async (): Promise<Achievement[]> => [
  // 🔜 إضافة إنجازات حقيقية مستقبلاً
  { id: '1', title: { ar: '', en: '' }, year: '2025', image: '' },
];

export const getTopStudentGrades = async (): Promise<TopStudentGrade[]> => [
  { id: '1', title: { ar: 'الصف الأول الثانوي',  en: 'First Secondary Grade'  }, image: '' },
  { id: '2', title: { ar: 'الصف الثاني الثانوي', en: 'Second Secondary Grade' }, image: '' },
  { id: '3', title: { ar: 'الصف الثالث الثانوي', en: 'Third Secondary Grade'  }, image: '' },
];