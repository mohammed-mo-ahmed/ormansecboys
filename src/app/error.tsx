'use client'; // ✅ مطلوب — Next.js بيشترط error.tsx يكون Client Component

import { useEffect } from 'react';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-center px-4">
      <h2 className="text-2xl font-bold text-gray-900">حدث خطأ ما</h2>
      <p className="text-gray-600">Something went wrong</p>
      <button
        onClick={reset}
        className="px-6 py-3 bg-[#0652ba] text-white rounded-lg hover:bg-[#0541a5] transition-colors"
      >
        حاول مجدداً / Try again
      </button>
    </div>
  );
}