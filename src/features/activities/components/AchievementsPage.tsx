// ✅ Server Component — data fetch + header
import { getTranslations, getLocale } from 'next-intl/server';
import { getAchievements, getTopStudentGrades } from '../services/achievements.service';
import { AchievementsClient } from './AchievementsClient';

export const AchievementsPage = async () => {
  const [achievements, topStudents, locale, t] = await Promise.all([
    getAchievements(),
    getTopStudentGrades(),
    getLocale(),
    getTranslations('activities.achievements'),
  ]);

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 space-y-12">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">{t('title')}</h1>
          <p className="text-xl text-gray-600">{t('subtitle')}</p>
        </div>

        <AchievementsClient
          achievements={achievements}
          topStudents={topStudents}
          locale={locale}
          labels={{
            yearLabel:             t('yearLabel'),
            notDefined:            t('notDefined'),
            noImage:               t('noImage'),
            clickToEnlarge:        t('clickToEnlarge'),
            topStudents:           t('topStudents'),
            topStudentsPlaceholder: t('topStudentsPlaceholder'),
            closeLabel:            t('closeLabel'),
          }}
        />
      </div>
    </div>
  );
};