'use client';
// src/features/auth/components/LoginForm.tsx
import { useState } from 'react';
import { IdCard, LogIn, Loader2, AlertCircle } from 'lucide-react';

interface LoginFormProps {
  locale: string;
}

export const LoginForm = ({ locale }: LoginFormProps) => {
  const isAr = locale === 'ar';

  const [nationalId, setNationalId] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'not_found' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nationalId.trim() || nationalId.length < 14) return;

    setStatus('loading');

    try {
      const res = await fetch('/api/student/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nationalId }),
        credentials: 'same-origin',
      });

      if (res.ok) {
        // الكوكي يتحدد في الـ server — ننتظر انتقال صغير ثم ننتقل
        setTimeout(() => {
          window.location.href = `/${locale}/student`;
        }, 100);
      } else if (res.status === 404) {
        setStatus('not_found');
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {isAr ? 'بوابة الطالب' : 'Student Portal'}
          </h1>
          <p className="text-gray-500">
            {isAr ? 'أدخل رقمك القومي للدخول' : 'Enter your National ID to sign in'}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {isAr ? 'الرقم القومي' : 'National ID'}
              </label>
              <div className="relative">
                <IdCard className="absolute start-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={14}
                  value={nationalId}
                  onChange={e => {
                    setNationalId(e.target.value.replace(/\D/g, ''));
                    setStatus('idle');
                  }}
                  placeholder={isAr ? '14 رقم' : '14 digits'}
                  dir="ltr"
                  required
                  autoFocus
                  className="w-full ps-10 pe-4 py-3 border border-gray-200 rounded-xl
                    focus:outline-none focus:ring-2 focus:ring-[#0652ba] focus:border-transparent
                    transition-all text-gray-900 placeholder:text-gray-400 tracking-widest"
                />
              </div>
            </div>

            {status === 'not_found' && (
              <div className="flex items-center gap-2 text-red-600 bg-red-50 px-4 py-3 rounded-xl text-sm">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                {isAr
                  ? 'الرقم القومي غير مسجل، تواصل مع الإدارة'
                  : 'National ID not found, contact administration'}
              </div>
            )}
            {status === 'error' && (
              <div className="flex items-center gap-2 text-red-600 bg-red-50 px-4 py-3 rounded-xl text-sm">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                {isAr ? 'حدث خطأ في الاتصال، حاول مرة أخرى' : 'Connection error, please try again'}
              </div>
            )}

            <button
              type="submit"
              disabled={status === 'loading' || nationalId.length < 14}
              className="w-full flex items-center justify-center gap-2 py-3 px-6
                bg-[#0652ba] text-white font-bold rounded-xl
                hover:bg-[#0541a5] active:scale-95 transition-all
                disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === 'loading'
                ? <Loader2 className="w-5 h-5 animate-spin" />
                : <LogIn className="w-5 h-5" />
              }
              {status === 'loading'
                ? (isAr ? 'جاري التحقق...' : 'Verifying...')
                : (isAr ? 'دخول' : 'Sign In')
              }
            </button>
          </form>
        </div>

        <p className="text-center mt-6 text-sm text-gray-500 leading-relaxed">
          {isAr ? 'هل أنت عضو هيئة تدريس أو من العاملين؟' : 'Are you a teacher or staff member?'}
          <br />
          <a
            href={`/${locale}/teacher-login`}
            className="text-[#0652ba] hover:underline font-medium mt-1 inline-block"
          >
            {isAr ? 'الدخول كمعلم أو عضو هيئة عاملة' : 'Sign in as teacher or staff'}
          </a>
        </p>
      </div>
    </div>
  );
};