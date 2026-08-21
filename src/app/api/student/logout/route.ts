// src/app/api/student/logout/route.ts
import { NextResponse } from 'next/server';
import { clearStudentCookie } from '@/lib/auth/session';

export const runtime = 'nodejs';

export async function POST() {
  const res = NextResponse.json({ ok: true });
  clearStudentCookie(res);
  return res;
}