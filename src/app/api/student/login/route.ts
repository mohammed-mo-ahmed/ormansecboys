// src/app/api/student/login/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { findByNationalId } from '@/features/student/services/students.db';
import { isValidEgyptianNationalId } from '@/features/student/utils/nationalId';
import { isTrustedOrigin, setStudentCookie } from '@/lib/auth/session';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  if (!isTrustedOrigin(req)) {
    return NextResponse.json({ ok: false, error: 'forbidden' }, { status: 403 });
  }

  let body: { nationalId?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'bad_request' }, { status: 400 });
  }

  const nationalId = String(body.nationalId ?? '').replace(/\D/g, '');
  if (!isValidEgyptianNationalId(nationalId)) {
    return NextResponse.json({ ok: false, error: 'not_found' }, { status: 404 });
  }

  const student = await findByNationalId(nationalId);
  if (!student) {
    return NextResponse.json({ ok: false, error: 'not_found' }, { status: 404 });
  }

  const res = NextResponse.json({ ok: true });
  setStudentCookie(res, student.id);
  return res;
}