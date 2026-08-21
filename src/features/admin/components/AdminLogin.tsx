'use client';
// src/features/admin/components/AdminLogin.tsx
import { useState } from 'react';
import { Shield, Loader2, AlertCircle, Lock } from 'lucide-react';

interface Props {
  locale: string;
}

export const AdminLogin = ({ locale }: Props) => {
  const isAr = locale === 'ar';
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) return;
    setStatus('loading');
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
        credentials: 'same-origin',
      });
      if (res.ok) {
        setTimeout(() => {
          window.location.href = `/${locale}/teacher-login/admin`;
        }, 100);
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[#0652ba] rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">{isAr ? 'بوابة الإدارة' : 'Admin Portal'}</h1>
          <p className="text-gray-500 text-sm">{isAr ? 'هذه الصفحة خاصة بالعاملين في شؤون المدرسة' : 'This page is for school administration staff only'}</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 space-y-5" noValidate>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              {isAr ? 'كلمة المرور' : 'Password'}
            </label>
            <div className="relative">
              <Lock className="absolute start-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="password"
                value={password}
                onChange={e => { setPassword(e.target.value); setStatus('idle'); }}
                placeholder="••••••••"
                autoFocus
                required
                className="w-full ps-10 pe-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0652ba] transition-all"
              />
            </div>
          </div>

          {status === 'error' && (
            <div className="flex items-center gap-2 text-red-600 bg-red-50 px-4 py-3 rounded-xl text-sm">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              {isAr ? 'كلمة المرور غير صحيحة' : 'Incorrect password'}
            </div>
          )}

          <button
            type="submit"
            disabled={status === 'loading' || !password}
            className="w-full flex items-center justify-center gap-2 py-3 px-6 bg-[#0652ba] text-white font-bold rounded-xl hover:bg-[#0541a5] active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === 'loading' ? <Loader2 className="w-5 h-5 animate-spin" /> : <Shield className="w-5 h-5" />}
            {status === 'loading' ? (isAr ? 'جاري الدخول...' : 'Signing in...') : (isAr ? 'دخول' : 'Sign In')}
          </button>
        </form>
      </div>
    </div>
  );
};