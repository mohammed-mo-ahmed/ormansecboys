// src/app/api/student/path/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getById, updateStudent } from '@/features/student/services/students.db';
import { PATH_SPECIALTY_SUBJECTS, STUDY_PATHS } from '@/features/student/types/student.types';
import type { SpecialtySubject, StudyPath } from '@/features/student/types/student.types';
import { getStudentFromRequest, isTrustedOrigin } from '@/lib/auth/session';

export const runtime = 'nodejs';

interface PathBody {
  path?: unknown;
  specialtySubject?: unknown;
  confirmed?: unknown;
}

export async function POST(req: NextRequest) {
  if (!isTrustedOrigin(req)) {
    return NextResponse.json({ ok: false, error: 'forbidden' }, { status: 403 });
  }

  const session = getStudentFromRequest(req);
  if (!session) {
    return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 });
  }

  let body: PathBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'bad_request' }, { status: 400 });
  }

  if (body.confirmed !== true) {
    return NextResponse.json({ ok: false, error: 'not_confirmed' }, { status: 400 });
  }

  const path = body.path as StudyPath;
  if (typeof path !== 'string' || !STUDY_PATHS.includes(path)) {
    return NextResponse.json({ ok: false, error: 'invalid_path' }, { status: 400 });
  }

  const specialtySubject = body.specialtySubject as SpecialtySubject;
  if (typeof specialtySubject !== 'string' || !PATH_SPECIALTY_SUBJECTS[path].includes(specialtySubject)) {
    return NextResponse.json({ ok: false, error: 'invalid_subject' }, { status: 400 });
  }

  const student = await getById(session.uid);
  if (!student) {
    return NextResponse.json({ ok: false, error: 'not_found' }, { status: 404 });
  }

  if (student.grade !== 'grade2') {
    return NextResponse.json({ ok: false, error: 'wrong_grade' }, { status: 403 });
  }

  if (student.path) {
    return NextResponse.json({ ok: false, error: 'path_already_chosen' }, { status: 403 });
  }

  const now = Date.now();
  const patch: Record<string, unknown> = {
    path,
    specialtySubject,
    pathChosenAt: now,
    pathConfirmedAt: now,
    updatedAt: now,
  };

  await updateStudent(session.uid, patch as never);

  return NextResponse.json({ ok: true });
}