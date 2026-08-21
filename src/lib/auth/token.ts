// src/lib/auth/token.ts
// Tokens HMAC بسيطة (بدون مكتبات إضافية) — format: base64url(payload).base64url(hmac)

import { createHmac, timingSafeEqual } from 'crypto';

export interface TokenPayload {
  exp: number;
  [key: string]: unknown;
}

const SECRET_KEY = 'SESSION_SECRET';

function getSecret(): string {
  const secret = process.env[SECRET_KEY];
  if (!secret || secret.length < 16) {
    throw new Error(`Env var ${SECRET_KEY} must be set (min 16 chars).`);
  }
  return secret;
}

const encode = (value: string) => Buffer.from(value, 'utf8').toString('base64url');
const decode = (value: string) => Buffer.from(value, 'base64url').toString('utf8');

export function signToken(data: Record<string, unknown>, ttlMs: number): string {
  const payload: TokenPayload = { ...data, exp: Date.now() + ttlMs };
  const part = encode(JSON.stringify(payload));
  const sig = createHmac('sha256', getSecret()).update(part).digest('base64url');
  return `${part}.${sig}`;
}

export function verifyToken(token: string): TokenPayload | null {
  if (!token) return null;
  const [part, sig] = token.split('.');
  if (!part || !sig) return null;

  let expected: Buffer;
  try {
    expected = createHmac('sha256', getSecret()).update(part).digest();
  } catch {
    return null;
  }

  let given: Buffer;
  try {
    given = Buffer.from(sig, 'base64url');
  } catch {
    return null;
  }

  if (given.length !== expected.length || !timingSafeEqual(given, expected)) return null;

  let payload: TokenPayload;
  try {
    payload = JSON.parse(decode(part)) as TokenPayload;
  } catch {
    return null;
  }

  if (typeof payload.exp !== 'number' || payload.exp < Date.now()) return null;
  return payload;
}