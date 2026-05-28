'use client';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Send, User, MessageSquare, Phone } from 'lucide-react';

type Status = 'idle' | 'sending' | 'success' | 'error';
type ContactMethod = 'phone' | 'email';

export const ContactForm = () => {
  const t = useTranslations('contact.form');

  const [name, setName]                 = useState('');
  const [contactMethod, setContactMethod] = useState<ContactMethod>('phone');
  const [contactValue, setContactValue] = useState('');
  const [message, setMessage]           = useState('');
  const [status, setStatus]             = useState<Status>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !contactValue.trim() || !message.trim()) return;

    setStatus('sending');

    try {
      // ✅ dynamic import — لا يزيد bundle size لو الصفحة مش بتستخدمه
      const emailjs = (await import('@emailjs/browser')).default;

      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          from_name:    name.trim(),
          contact_info: `${contactMethod === 'phone' ? '📞' : '📧'} ${contactValue.trim()}`,
          message:      message.trim(),
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!,
      );

      setStatus('success');
      setName('');
      setContactValue('');
      setMessage('');
    } catch {
      setStatus('error');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 space-y-6"
    >
      <h2 className="text-2xl font-bold text-gray-900">{t('title')}</h2>

      {/* الاسم */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          {t('name')}
        </label>
        <div className="relative">
          <User className="absolute start-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder={t('namePlaceholder')}
            required
            className="w-full ps-10 pe-4 py-3 border border-gray-200 rounded-xl
              focus:outline-none focus:ring-2 focus:ring-[#0652ba] focus:border-transparent
              transition-all text-gray-900 placeholder:text-gray-400"
          />
        </div>
      </div>

      {/* طريقة التواصل */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          {t('contactMethod')}
        </label>

        {/* Toggle */}
        <div className="flex gap-2 mb-3">
          {(['phone', 'email'] as ContactMethod[]).map(method => (
            <button
              key={method}
              type="button"
              onClick={() => { setContactMethod(method); setContactValue(''); }}
              className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${
                contactMethod === method
                  ? 'bg-[#0652ba] text-white shadow'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {method === 'phone' ? `📞 ${t('phone')}` : `📧 ${t('email')}`}
            </button>
          ))}
        </div>

        <div className="relative">
          <Phone className="absolute start-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type={contactMethod === 'email' ? 'email' : 'tel'}
            value={contactValue}
            onChange={e => setContactValue(e.target.value)}
            placeholder={contactMethod === 'phone' ? t('phonePlaceholder') : t('emailPlaceholder')}
            required
            dir={contactMethod === 'phone' ? 'ltr' : undefined}
            className="w-full ps-10 pe-4 py-3 border border-gray-200 rounded-xl
              focus:outline-none focus:ring-2 focus:ring-[#0652ba] focus:border-transparent
              transition-all text-gray-900 placeholder:text-gray-400"
          />
        </div>
      </div>

      {/* الرسالة */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          {t('message')}
        </label>
        <div className="relative">
          <MessageSquare className="absolute start-3 top-4 w-5 h-5 text-gray-400" />
          <textarea
            value={message}
            onChange={e => setMessage(e.target.value)}
            placeholder={t('messagePlaceholder')}
            required
            rows={4}
            className="w-full ps-10 pe-4 py-3 border border-gray-200 rounded-xl
              focus:outline-none focus:ring-2 focus:ring-[#0652ba] focus:border-transparent
              transition-all text-gray-900 placeholder:text-gray-400 resize-none"
          />
        </div>
      </div>

      {/* زر الإرسال */}
      <button
        type="submit"
        disabled={status === 'sending'}
        className="w-full flex items-center justify-center gap-2 py-3 px-6
          bg-[#0652ba] text-white font-bold rounded-xl
          hover:bg-[#0541a5] active:scale-95 transition-all
          disabled:opacity-60 disabled:cursor-not-allowed"
      >
        <Send className="w-5 h-5" />
        {status === 'sending' ? t('sending') : t('send')}
      </button>

      {/* نتيجة الإرسال */}
      {status === 'success' && (
        <p className="text-center text-green-600 font-semibold bg-green-50 py-3 rounded-xl">
          ✅ {t('successMsg')}
        </p>
      )}
      {status === 'error' && (
        <p className="text-center text-red-600 font-semibold bg-red-50 py-3 rounded-xl">
          ❌ {t('errorMsg')}
        </p>
      )}
    </form>
  );
};