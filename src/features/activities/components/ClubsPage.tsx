// src/features/activities/components/ClubsPage.tsx
// ✅ يستقبل locale كـ prop
import { getTranslations } from 'next-intl/server';
import { getClubs } from '../services/clubs.service';
import type { Locale } from '@/lib/i18n/config';

interface ClubsPageProps {
  locale: string;
}

export const ClubsPage = async ({ locale }: ClubsPageProps) => {
  const [clubs, t] = await Promise.all([
    getClubs(),
    getTranslations('activities.clubs'),
  ]);
  const isAr = (locale as Locale) === 'ar';

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 space-y-12">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">{t('title')}</h1>
          <p className="text-xl text-gray-600">{t('subtitle')}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {clubs.map(club => (
            <div key={club.id} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2 border border-gray-100">
              <div className="text-6xl mb-4" aria-hidden="true">{club.icon}</div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">
                {club.name[isAr ? 'ar' : 'en']}
              </h3>
              <p className="text-gray-600">{club.description[isAr ? 'ar' : 'en']}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};