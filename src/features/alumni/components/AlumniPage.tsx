// ✅ Server Component كامل — مفيش أي useState
import { getTranslations, getLocale } from 'next-intl/server';
import { GraduationCap } from 'lucide-react';
import { getAlumniStories } from '../services/alumni.service';
import { AlumniCard } from './AlumniCard';
import { JsonLd } from '@/shared/components/seo/JsonLd';
import { siteConfig } from '@/config/site';
import type { Locale } from '@/lib/i18n/config';

export const AlumniPage = async () => {
  const [stories, locale, t] = await Promise.all([
    getAlumniStories(),
    getLocale(),
    getTranslations('alumni'),
  ]);

  // ✅ Person schema لكل خريج بارز — SEO ممتاز
  const alumniSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: locale === 'ar' ? 'خريجو مدرسة الأورمان' : 'Al-Orman School Alumni',
    url: `${siteConfig.url}/${locale}/alumni`,
    itemListElement: stories.map((alumni, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Person',
        name: alumni.name.en,
        alternateName: alumni.name.ar,
        description: alumni.achievement.en,
        url: alumni.link.en,
        alumniOf: {
          '@type': 'EducationalOrganization',
          name: siteConfig.name.en,
        },
      },
    })),
  };

  return (
    <>
      <JsonLd data={alumniSchema} />

      <div className="min-h-screen bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4">

          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              {t('title')}
            </h1>
            <p className="text-xl text-gray-600">{t('subtitle')}</p>
          </div>

          {/* Stat */}
          <div className="flex justify-center mb-16">
            <div className="bg-white p-8 rounded-xl shadow-lg text-center border border-gray-100 w-[400px] md:w-[500px]">
              <div className="w-16 h-16 bg-[#0652ba] rounded-full flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="w-8 h-8 text-white" aria-hidden="true" />
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">50,000+</div>
              <div className="text-gray-600">{t('stat.label')}</div>
            </div>
          </div>

          {/* Stories */}
          <section>
            <h2 className="text-3xl font-bold mb-8 text-gray-900 text-center">
              {t('successStories')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {stories.map(alumni => (
                <AlumniCard
                  key={alumni.id}
                  alumni={alumni}
                  locale={locale as Locale}
                />
              ))}
            </div>
          </section>

        </div>
      </div>
    </>
  );
};