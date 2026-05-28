'use client';
// src/features/auth/hooks/useStudentAuth.ts
import { useState } from 'react';
import { findStudentByNationalId, type StudentData } from '@/features/student/services/sheets.service';

type Status = 'idle' | 'loading' | 'success' | 'not_found' | 'error';

export const useStudentAuth = () => {
  const [status,  setStatus]  = useState<Status>('idle');
  const [student, setStudent] = useState<StudentData | null>(null);

  const login = async (nationalId: string) => {
    if (!nationalId.trim()) return;
    setStatus('loading');

    try {
      const data = await findStudentByNationalId(nationalId);
      if (data) {
        // ✅ حفظ في sessionStorage عشان يفضل logged in لحد ما يقفل التاب
        sessionStorage.setItem('student_data', JSON.stringify(data));
        setStudent(data);
        setStatus('success');
      } else {
        setStatus('not_found');
      }
    } catch {
      setStatus('error');
    }
  };

  const logout = () => {
    sessionStorage.removeItem('student_data');
    setStudent(null);
    setStatus('idle');
  };

  // ✅ استرجاع البيانات لو الصفحة اتحدثت
  const restore = (): StudentData | null => {
    try {
      const raw = sessionStorage.getItem('student_data');
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  };

  return { status, student, login, logout, restore };
};