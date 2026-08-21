// src/app/api/admin/logout/route.ts
import { NextResponse } from 'next/server';
import { clearAdminCookie } from '@/lib/auth/session';

export const runtime = 'nodejs';

export async function POST() {
  const res = NextResponse.json({ ok: true });
  clearAdminCookie(res);
  return res;
}