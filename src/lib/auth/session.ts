// src/lib/auth/session.ts
// إدارة كوكيز الجلسات (HttpOnly + Secure + SameSite) للطالب والمديرة

import { cookies } from 'next/headers';
import type { NextRequest, NextResponse } from 'next/server';
import { signToken, verifyToken, type TokenPayload } from './token';

const STUDENT_COOKIE = 'student_session';
const ADMIN_COOKIE = 'admin_session';
const SESSION_TTL_MS = 8 * 60 * 60 * 1000; // 8 ساعات

interface StudentClaims extends TokenPayload {
  uid: string;
  role: 'student';
}

const isSecure = () => process.env.NODE_ENV === 'production';

// ---------- قراءة (Server Components / Route Handlers) ----------

export async function getStudentSession(): Promise<StudentClaims | null> {
  try {
    const store = await cookies();
    const raw = store.get(STUDENT_COOKIE)?.value;
    if (!raw) return null;
    const payload = verifyToken(raw);
    if (!payload || payload.role !== 'student' || typeof payload.uid !== 'string') return null;
    return payload as StudentClaims;
  } catch {
    return null;
  }
}

export async function isAdminSession(): Promise<boolean> {
  try {
    const store = await cookies();
    const raw = store.get(ADMIN_COOKIE)?.value;
    if (!raw) return false;
    const payload = verifyToken(raw);
    return payload?.role === 'admin';
  } catch {
    return false;
  }
}

/** قراءة جلسة الطالب من request الخاص بـ Route Handler */
export function getStudentFromRequest(req: NextRequest): StudentClaims | null {
  const raw = req.cookies.get(STUDENT_COOKIE)?.value;
  if (!raw) return null;
  const payload = verifyToken(raw);
  if (!payload || payload.role !== 'student' || typeof payload.uid !== 'string') return null;
  return payload as StudentClaims;
}

export function isAdminFromRequest(req: NextRequest): boolean {
  const raw = req.cookies.get(ADMIN_COOKIE)?.value;
  if (!raw) return false;
  try {
    return verifyToken(raw)?.role === 'admin';
  } catch {
    return false;
  }
}

/** فحص Origin ضد CSRF للطلبات المغيّرة — يجب أن يطابق الـ host */
export function isTrustedOrigin(req: NextRequest): boolean {
  const origin = req.headers.get('origin');
  if (!origin) return false;
  try {
    return new URL(origin).host === req.headers.get('host');
  } catch {
    return false;
  }
}

// ---------- كتابة (Route Handlers فقط) ----------

export function setStudentCookie(res: NextResponse, uid: string): NextResponse {
  res.cookies.set(STUDENT_COOKIE, signToken({ uid, role: 'student' }, SESSION_TTL_MS), {
    httpOnly: true,
    secure: isSecure(),
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_TTL_MS / 1000,
  });
  return res;
}

export function clearStudentCookie(res: NextResponse): NextResponse {
  res.cookies.set(STUDENT_COOKIE, '', { maxAge: 0, path: '/' });
  return res;
}

export function setAdminCookie(res: NextResponse): NextResponse {
  res.cookies.set(ADMIN_COOKIE, signToken({ role: 'admin' }, SESSION_TTL_MS), {
    httpOnly: true,
    secure: isSecure(),
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_TTL_MS / 1000,
  });
  return res;
}

export function clearAdminCookie(res: NextResponse): NextResponse {
  res.cookies.set(ADMIN_COOKIE, '', { maxAge: 0, path: '/' });
  return res;
}