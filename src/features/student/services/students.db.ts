// src/features/student/services/students.db.ts
// الوصول إلى Firestore (Server-only) — لا تُستورد في client components

import { getDb } from '@/lib/firebase/admin';
import type { StudentProfile } from '../types/student.types';

const COLLECTION = 'students';

interface StudentDoc {
  nationalId: string;
  code: string | null;
  name: string;
  grade: string;
  classroom: string | null;
  seatNumber: string | null;
  branch: string | null;
  studentType: string | null;
  secondLang: string | null;
  phone: string | null;
  parentPhone: string | null;
  path: string | null;
  specialtySubject: string | null;
  pathConfirmedAt: number | null;
  pathChosenAt: number | null;
  createdAt: number;
  updatedAt: number;
}

function toProfile(doc: FirebaseFirestore.DocumentSnapshot): StudentProfile {
  const d = doc.data() as StudentDoc;
  return {
    id: doc.id,
    nationalId: d.nationalId ?? '',
    code: d.code ?? null,
    name: d.name ?? '',
    grade: (d.grade as StudentProfile['grade']) ?? 'grade1',
    classroom: d.classroom ?? null,
    seatNumber: d.seatNumber ?? null,
    branch: (d.branch as StudentProfile['branch']) ?? null,
    studentType: (d.studentType as StudentProfile['studentType']) ?? null,
    secondLang: (d.secondLang as StudentProfile['secondLang']) ?? null,
    phone: d.phone ?? null,
    parentPhone: d.parentPhone ?? null,
    path: (d.path as StudentProfile['path']) ?? null,
    specialtySubject: (d.specialtySubject as StudentProfile['specialtySubject']) ?? null,
    pathConfirmedAt: d.pathConfirmedAt ?? null,
    pathChosenAt: d.pathChosenAt ?? null,
    createdAt: d.createdAt ?? Date.now(),
    updatedAt: d.updatedAt ?? Date.now(),
  };
}

export async function findByNationalId(nationalId: string): Promise<StudentProfile | null> {
  const snap = await getDb()
    .collection(COLLECTION)
    .where('nationalId', '==', nationalId)
    .limit(1)
    .get();
  if (snap.empty) return null;
  return toProfile(snap.docs[0]);
}

/** فحص تكرار الرقم القومي بين الطلاب (بيستثني id معين لو اتحدد) */
export async function nationalIdExists(nationalId: string, exceptId?: string): Promise<boolean> {
  const snap = await getDb()
    .collection(COLLECTION)
    .where('nationalId', '==', nationalId)
    .limit(1)
    .get();
  if (snap.empty) return false;
  return !exceptId || (snap.docs[0].id !== exceptId && snap.docs[0].data()?.nationalId === nationalId);
}

export async function getById(id: string): Promise<StudentProfile | null> {
  const doc = await getDb().collection(COLLECTION).doc(id).get();
  if (!doc.exists) return null;
  return toProfile(doc);
}

export async function listAll(): Promise<StudentProfile[]> {
  const snap = await getDb().collection(COLLECTION).orderBy('name').get();
  return snap.docs.map(toProfile);
}

export async function updateStudent(
  id: string,
  patch: Partial<Omit<StudentProfile, 'id'>> & { updatedAt: number },
): Promise<void> {
  await getDb().collection(COLLECTION).doc(id).update(patch);
}

/** إحصائيات لوحة الإدارة */
export async function getStats() {
  const students = await listAll();
  const grade2 = students.filter(s => s.grade === 'grade2');
  const grade3 = students.filter(s => s.grade === 'grade3');

  const paths = {
    medicine: grade2.filter(s => s.path === 'medicine').length,
    engineering: grade2.filter(s => s.path === 'engineering').length,
    business: grade2.filter(s => s.path === 'business').length,
    arts: grade2.filter(s => s.path === 'arts').length,
  };
  const pathChosen = grade2.filter(s => s.path).length;
  const pathNotChosen = grade2.length - pathChosen;

  const branches = {
    adabi: grade3.filter(s => s.branch === 'adabi').length,
    science: grade3.filter(s => s.branch === 'science').length,
    math: grade3.filter(s => s.branch === 'math').length,
  };

  return {
    total: students.length,
    byGrade: {
      grade1: students.filter(s => s.grade === 'grade1').length,
      grade2: grade2.length,
      grade3: grade3.length,
    },
    paths,
    pathChosen,
    pathNotChosen,
    branches,
  };
}