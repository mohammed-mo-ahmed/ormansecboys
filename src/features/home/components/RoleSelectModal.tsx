'use client';
// src/features/home/components/RoleSelectModal.tsx
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { X, GraduationCap, BookOpen, Shield } from 'lucide-react';

interface RoleSelectModalProps {
  onClose: () => void;
}

const ROLES = [
  {
    key:     'student',
    icon:    GraduationCap,
    labelAr: 'طالب',
    labelEn: 'Student',
    descAr:  'الدخول برقمك القومي',
    descEn:  'Sign in with your National ID',
    path:    '/login',           // ✅ يروح صفحة login
    color:   'bg-blue-50 hover:bg-blue-100 border-blue-200',
    textColor: 'text-blue-700',
    iconBg:  'bg-[#0652ba]',
  },
  {
    key:     'teacher',
    icon:    BookOpen,
    labelAr: 'معلم',
    labelEn: 'Teacher',
    descAr:  'بوابة المعلم — قريباً',
    descEn:  'Teacher Portal — Coming Soon',
    path:    null,               // قريباً
    color:   'bg-gray-50 border-gray-200 opacity-60 cursor-not-allowed',
    textColor: 'text-gray-500',
    iconBg:  'bg-gray-400',
  },
  {
    key:     'admin',
    icon:    Shield,
    labelAr: 'مسؤول',
    labelEn: 'Admin',
    descAr:  'لوحة الإدارة — قريباً',
    descEn:  'Admin Panel — Coming Soon',
    path:    null,               // قريباً
    color:   'bg-gray-50 border-gray-200 opacity-60 cursor-not-allowed',
    textColor: 'text-gray-500',
    iconBg:  'bg-gray-400',
  },
] as const;

export const RoleSelectModal = ({ onClose }: RoleSelectModalProps) => {
  const router = useRouter();
  const locale = useLocale();
  const isAr   = locale === 'ar';

  const handleSelect = (path: string | null) => {
    if (!path) return;
    onClose();
    router.push(`/${locale}${path}`);
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 relative"
        onClick={e => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 end-4 w-8 h-8 flex items-center justify-center
            rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          aria-label={isAr ? 'إغلاق' : 'Close'}
        >
          <X className="w-4 h-4 text-gray-600" />
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {isAr ? 'الدخول للبوابة' : 'Enter Portal'}
          </h2>
          <p className="text-gray-500 text-sm">
            {isAr ? 'اختر نوع حسابك للمتابعة' : 'Choose your account type to continue'}
          </p>
        </div>

        {/* Roles */}
        <div className="space-y-3">
          {ROLES.map(({ key, icon: Icon, labelAr, labelEn, descAr, descEn, path, color, textColor, iconBg }) => (
            <button
              key={key}
              onClick={() => handleSelect(path)}
              disabled={!path}
              className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all
                active:scale-95 ${color} ${textColor}`}
            >
              <div className={`w-12 h-12 ${iconBg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <div className={isAr ? 'text-right' : 'text-left'}>
                <p className="font-bold text-lg">{isAr ? labelAr : labelEn}</p>
                <p className="text-sm opacity-70">{isAr ? descAr : descEn}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};