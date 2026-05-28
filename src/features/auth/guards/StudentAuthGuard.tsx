'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import type { StudentData } from '@/features/student/services/sheets.service';

interface StudentAuthGuardProps {
  children: React.ReactNode;
}

export const StudentAuthGuard = ({ children }: StudentAuthGuardProps) => {
  const [status, setStatus] = useState<'loading' | 'auth' | 'unauth'>('loading');
  const [student, setStudent] = useState<StudentData | null>(null);
  const router = useRouter();
  const locale = useLocale();

  useEffect(() => {
    // ✅ قرا من sessionStorage مرة واحدة بس
    const raw = sessionStorage.getItem('student_data');
    if (raw) {
      try {
        const parsed = JSON.parse(raw) as StudentData;
        setStudent(parsed);
        setStatus('auth');
      } catch {
        sessionStorage.removeItem('student_data');
        setStatus('unauth');
        router.replace(`/${locale}/login`);
      }
    } else {
      setStatus('unauth');
      router.replace(`/${locale}/login`);
    }
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
