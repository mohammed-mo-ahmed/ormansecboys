'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { useLocale } from 'next-intl';
import { auth } from '@/lib/firebase/client';

interface AuthGuardProps {
  children: React.ReactNode;
}

export const AuthGuard = ({ children }: AuthGuardProps) => {
  const [status, setStatus] = useState<'loading' | 'auth' | 'unauth'>('loading');
  const router = useRouter();
  const locale = useLocale();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        setStatus('auth');
      } else {
        setStatus('unauth');
        router.replace(`/${locale}/login`);
      }
    });
    return () => unsubscribe();
  }, [router, locale]);

  // ✅ Loading state — منع flash of unauthenticated content
  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="w-8 h-8 border-4 border-[#0652ba] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (status === 'unauth') return null;

  return <>{children}</>;
};