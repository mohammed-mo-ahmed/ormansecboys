// ✅ Server Component كامل
import { getLocale, getTranslations } from 'next-intl/server';

import { JsonLd } from '@/shared/components/seo/JsonLd';
import { siteConfig } from '@/config/site';

type Milestone = {
  year: string;
  title: string;
  description: string;
};

export const HistoryPage = async () => {
  const t = await getTranslations('about.history');
  const locale = await getLocale();

  const milestones = t.raw('milestones') as Milestone[];

  // ✅ JSON-LD Schema
  const historySchema = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: siteConfig.name.en,
    alternateName: siteConfig.name.ar,
    foundingDate: '1944',
    url: siteConfig.url,
    inLanguage: locale,
    address: {
      '@type': 'PostalAddress',
      streetAddress: '3 Madares St.',
      addressLocality: 'Dokki',
      addressRegion: 'Giza',
      addressCountry: 'EG',
    },
  };

  return (
    <>
      {/* ✅ SEO Structured Data */}
      <JsonLd data={historySchema} />

      <div className="min-h-screen bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 space-y-12">

          <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              {t('title')}
            </h1>

            <p className="text-xl text-gray-600">
              {t('subtitle')}
            </p>
          </div>

          {/* ✅ Timeline */}
          <div className="relative">

            {/* Center line */}
            <div className="absolute inset-x-1/2 top-0 bottom-0 w-1 bg-[#0652ba] -translate-x-1/2" />

            {milestones.map((milestone, index) => (
              <div
                key={index}
                className={`mb-12 flex items-center ${
                  index % 2 === 0 ? 'flex-row-reverse' : ''
                }`}
              >
                <div
                  className={`w-1/2 ${
                    index % 2 === 0
                      ? 'text-end pe-12'
                      : 'text-start ps-12'
                  }`}
                >
                  <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">

                    {milestone.year && (
                      <div className="text-3xl font-bold text-[#0652ba] mb-2">
                        {milestone.year}
                      </div>
                    )}

                    <h3 className="text-xl font-bold mb-2 text-gray-900">
                      {milestone.title}
                    </h3>

                    <p className="text-gray-600">
                      {milestone.description}
                    </p>

                  </div>
                </div>

                {/* Timeline dot */}
                <div className="w-6 h-6 bg-[#0652ba] rounded-full border-4 border-white absolute inset-x-1/2 -translate-x-1/2 z-10" />
              </div>
            ))}

          </div>

        </div>
      </div>
    </>
  );
};