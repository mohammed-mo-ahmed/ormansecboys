import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase/client';
import type { Role } from '../types/auth.types';

export const getUserRole = async (uid: string): Promise<Role | null> => {
  const snap = await getDoc(doc(db, 'users', uid));
  if (!snap.exists()) return null;
  return (snap.data().role as Role) ?? null;
};