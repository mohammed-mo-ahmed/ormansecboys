// src/features/activities/components/LibraryPage.tsx
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { getLibrarySections } from '../services/library.service';
import type { Locale } from '@/lib/i18n/config';

interface LibraryPageProps {
  locale: string;
}

export const LibraryPage = async ({ locale }: LibraryPageProps) => {
  const [sections, t] = await Promise.all([
    getLibrarySections(),
    getTranslations('activities.library'),
  ]);
  const isAr = (locale as Locale) === 'ar';

  return (
    <section className="relative flex flex-col justify-center items-center px-6 min-h-screen">
      <div className="absolute inset-0">
        <Image src="/images/backgrounds/backgroundlibarary.png" alt="" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-white/70 backdrop-blur-sm" />
      </div>
      <div className="relative z-10 w-full max-w-7xl text-center py-20 space-y-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 drop-shadow-md">{t('title')}</h1>
          <p className="text-xl text-gray-800 leading-relaxed">{t('subtitle')}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sections.map(item => (
            <div key={item.id} className="bg-white/85 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 border border-gray-200 backdrop-blur-md text-center">
              <div className="text-6xl mb-4" aria-hidden="true">{item.icon}</div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">{item.title[isAr ? 'ar' : 'en']}</h3>
              <p className="text-gray-700">{item.desc[isAr ? 'ar' : 'en']}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};