// src/features/activities/components/CompetitionsPage.tsx
import { getTranslations } from 'next-intl/server';
import { getCompetitions } from '../services/competitions.service';
import type { Locale } from '@/lib/i18n/config';

interface CompetitionsPageProps {
  locale: string;
}

export const CompetitionsPage = async ({ locale }: CompetitionsPageProps) => {
  const [competitions, t] = await Promise.all([
    getCompetitions(),
    getTranslations('activities.competitions'),
  ]);
  const isAr = (locale as Locale) === 'ar';
  const lang = isAr ? 'ar' : 'en';

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 space-y-12">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">{t('title')}</h1>
          <p className="text-xl text-gray-600">{t('subtitle')}</p>
        </div>
        <div className="space-y-6">
          {competitions.map(comp => (
            <div key={comp.id} className="bg-white p-8 rounded-xl shadow-lg border-s-4 border-[#0652ba] hover:shadow-xl transition-all">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-bold mb-2 text-gray-900">{comp.title[lang]}</h3>
                  <p className="text-gray-600">{comp.date[lang]}</p>
                </div>
                <div className="px-6 py-2 bg-[#0652ba] text-white rounded-lg font-semibold whitespace-nowrap">
                  {comp.status[lang]}
                </div>
              </div>
            </div>
          ))}
        </div>
        <p className="text-center mt-12 text-lg text-gray-700 font-medium">{t('moreDetails')}</p>
      </div>
    </div>
  );
};