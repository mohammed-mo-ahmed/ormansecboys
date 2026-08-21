// src/app/api/admin/student/route.ts
// تعديل بيانات طالب فقط (لا إنشاء، لا حذف)
import { NextRequest, NextResponse } from 'next/server';
import {
  getById,
  nationalIdExists,
  updateStudent,
} from '@/features/student/services/students.db';
import {
  BRANCHES,
  GRADES,
  PATH_SPECIALTY_SUBJECTS,
  SECOND_LANGS,
  STUDENT_TYPES,
  STUDY_PATHS,
} from '@/features/student/types/student.types';
import type { Branch, Grade, SecondLang, SpecialtySubject, StudyPath, StudentType } from '@/features/student/types/student.types';
import { isValidEgyptianNationalId } from '@/features/student/utils/nationalId';
import { isAdminFromRequest, isTrustedOrigin } from '@/lib/auth/session';

export const runtime = 'nodejs';

interface AdminStudentBody {
  id?: unknown;
  name?: unknown;
  code?: unknown;
  nationalId?: unknown;
  grade?: unknown;
  classroom?: unknown;
  seatNumber?: unknown;
  branch?: unknown;
  studentType?: unknown;
  secondLang?: unknown;
  phone?: unknown;
  parentPhone?: unknown;
  path?: unknown;
  specialtySubject?: unknown;
  total?: unknown;
}

const text = (v: unknown): string | null => (v === undefined || v === null ? null : String(v).trim());

export async function PUT(req: NextRequest) {
  if (!isTrustedOrigin(req)) {
    return NextResponse.json({ ok: false, error: 'forbidden' }, { status: 403 });
  }
  if (!isAdminFromRequest(req)) {
    return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 });
  }

  let body: AdminStudentBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'bad_request' }, { status: 400 });
  }

  const id = String(body.id ?? '');
  if (!id) return NextResponse.json({ ok: false, error: 'missing_id' }, { status: 400 });

  const existing = await getById(id);
  if (!existing) {
    return NextResponse.json({ ok: false, error: 'not_found' }, { status: 404 });
  }

  const patch: Record<string, unknown> = {};

  // ---- نص عادي ----
  const name = text(body.name);
  if (body.name !== undefined && !name) {
    return NextResponse.json({ ok: false, error: 'invalid_name' }, { status: 400 });
  }
  if (name !== null) patch.name = name;

  for (const field of ['code', 'classroom', 'seatNumber', 'phone', 'parentPhone', 'total'] as const) {
    if (body[field] !== undefined) patch[field] = text(body[field]);
  }

  // ---- الرقم القومي (فريد) ----
  if (body.nationalId !== undefined) {
    const nid = String(body.nationalId ?? '').replace(/\D/g, '');
    if (!isValidEgyptianNationalId(nid)) {
      return NextResponse.json({ ok: false, error: 'invalid_nationalId' }, { status: 400 });
    }
    if (await nationalIdExists(nid, id)) {
      return NextResponse.json({ ok: false, error: 'duplicate_nationalId' }, { status: 409 });
    }
    patch.nationalId = nid;
  }

  // ---- الصف الدراسي ----
  let grade: Grade = existing.grade;
  if (body.grade !== undefined) {
    if (!GRADES.includes(body.grade as Grade)) {
      return NextResponse.json({ ok: false, error: 'invalid_grade' }, { status: 400 });
    }
    grade = body.grade as Grade;
    patch.grade = grade;
  }

  // ---- الشعبة (الصف الثالث فقط) ----
  if (grade !== 'grade3') {
    patch.branch = null;
  } else if (body.branch !== undefined) {
    const branch = text(body.branch) as Branch | null;
    if (branch !== null && !BRANCHES.includes(branch as Branch)) {
      return NextResponse.json({ ok: false, error: 'invalid_branch' }, { status: 400 });
    }
    patch.branch = branch;
  }

  // ---- المسار + المادة التخصصية (الصف الثاني فقط) ----
  if (grade !== 'grade2') {
    patch.path = null;
    patch.specialtySubject = null;
  } else {
    let path: StudyPath | null = existing.path;
    let specialty: SpecialtySubject | null = existing.specialtySubject;

    if (body.path !== undefined) {
      const p = text(body.path) as StudyPath | null;
      if (p !== null && !STUDY_PATHS.includes(p)) {
        return NextResponse.json({ ok: false, error: 'invalid_path' }, { status: 400 });
      }
      path = p;
      if (path && !PATH_SPECIALTY_SUBJECTS[path].includes(existing.specialtySubject as SpecialtySubject)) {
        specialty = null;
      }
    }

    if (body.specialtySubject !== undefined) {
      const s = text(body.specialtySubject) as SpecialtySubject | null;
      if (s !== null) {
        if (!path) {
          return NextResponse.json({ ok: false, error: 'subject_requires_path' }, { status: 400 });
        }
        if (!PATH_SPECIALTY_SUBJECTS[path].includes(s)) {
          return NextResponse.json({ ok: false, error: 'invalid_subject' }, { status: 400 });
        }
      }
      specialty = s;
    }

    patch.path = path;
    patch.specialtySubject = specialty;
  }

  // ---- نوع الطالب ----
  if (body.studentType !== undefined) {
    const t = text(body.studentType) as StudentType | null;
    if (t !== null && !STUDENT_TYPES.includes(t)) {
      return NextResponse.json({ ok: false, error: 'invalid_studentType' }, { status: 400 });
    }
    patch.studentType = t;
  }

  // ---- اللغة الثانية ----
  if (body.secondLang !== undefined) {
    const l = text(body.secondLang) as SecondLang | null;
    if (l !== null && !SECOND_LANGS.includes(l)) {
      return NextResponse.json({ ok: false, error: 'invalid_secondLang' }, { status: 400 });
    }
    patch.secondLang = l;
  }

  patch.updatedAt = Date.now();
  await updateStudent(id, patch as never);

  const updated = await getById(id);
  return NextResponse.json({ ok: true, student: updated });
}