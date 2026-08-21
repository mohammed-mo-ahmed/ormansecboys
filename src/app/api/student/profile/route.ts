// src/app/api/student/profile/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getById, updateStudent } from '@/features/student/services/students.db';
import { getStudentFromRequest, isTrustedOrigin } from '@/lib/auth/session';

export const runtime = 'nodejs';

const MAX_LEN = 40;

export async function PUT(req: NextRequest) {
  if (!isTrustedOrigin(req)) {
    return NextResponse.json({ ok: false, error: 'forbidden' }, { status: 403 });
  }

  const session = getStudentFromRequest(req);
  if (!session) {
    return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'bad_request' }, { status: 400 });
  }

  // الطالب يعدّل فقط الهاتف ورقم ولي الأمر — أي حقل آخر يُرفض
  const patch: Record<string, unknown> = {};
  for (const field of ['phone', 'parentPhone'] as const) {
    if (body[field] !== undefined) {
      const value = String(body[field]).trim();
      if (value.length > MAX_LEN) {
        return NextResponse.json({ ok: false, error: 'too_long' }, { status: 400 });
      }
      patch[field] = value === '' ? null : value;
    }
  }

  if (Object.keys(patch).length === 0) {
    return NextResponse.json({ ok: false, error: 'nothing_to_update' }, { status: 400 });
  }

  const student = await getById(session.uid);
  if (!student) {
    return NextResponse.json({ ok: false, error: 'not_found' }, { status: 404 });
  }

  await updateStudent(session.uid, { ...patch, updatedAt: Date.now() } as never);

  const updated = await getById(session.uid);
  return NextResponse.json({ ok: true, student: updated });
}