// src/features/student/types/student.types.ts

export type Grade = 'grade1' | 'grade2' | 'grade3';

export type Branch = 'adabi' | 'science' | 'math'; // grade3 only

export type StudyPath = 'medicine' | 'engineering' | 'business' | 'arts'; // grade2 only

export type SpecialtySubject =
  | 'physics'
  | 'math'
  | 'chemistry'
  | 'programming'
  | 'accounting'
  | 'businessAdmin'
  | 'psychology'
  | 'secondLang'; // grade2 only

export type StudentType = 'منتظم' | 'خدمات' | 'منازل' | 'دمج';

export type SecondLang = 'german' | 'french' | 'italian' | 'spanish';

export interface StudentProfile {
  id: string; // Firestore auto-id (never expose nationalId as id)
  nationalId: string;
  code: string | null;
  name: string;
  grade: Grade;
  classroom: string | null;
  seatNumber: string | null;
  branch: Branch | null; // grade3
  studentType: StudentType | null;
  secondLang: SecondLang | null;
  phone: string | null;
  parentPhone: string | null;
  path: StudyPath | null; // grade2
  specialtySubject: SpecialtySubject | null; // grade2
  pathConfirmedAt: number | null;
  pathChosenAt: number | null;
  total: string | null;
  createdAt: number;
  updatedAt: number;
}

export const STUDENT_TYPES: StudentType[] = ['منتظم', 'خدمات', 'منازل', 'دمج'];

export const SECOND_LANGS: SecondLang[] = ['german', 'french', 'italian', 'spanish'];

export const GRADES: readonly Grade[] = ['grade1', 'grade2', 'grade3'];

export const BRANCHES: readonly Branch[] = ['adabi', 'science', 'math'];

export const STUDY_PATHS: readonly StudyPath[] = ['medicine', 'engineering', 'business', 'arts'];

/** المادة التخصصية الاختيارية في الصف الثاني — حسب المسار */
export const PATH_SPECIALTY_SUBJECTS: Record<StudyPath, readonly SpecialtySubject[]> = {
  medicine: ['physics', 'math'],
  engineering: ['chemistry', 'programming'],
  business: ['accounting', 'businessAdmin'],
  arts: ['psychology', 'secondLang'],
};

/** الحقول التي يستطيعها الطالب تعديلها بنفسه */
export const STUDENT_EDITABLE_FIELDS = ['phone', 'parentPhone'] as const;