
'use client';

import { useTranslations, useLocale } from 'next-intl';

import Image from 'next/image';

import { Users } from 'lucide-react';

import { JsonLd } from '@/shared/components/seo/JsonLd';
import { siteConfig } from '@/config/site';

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const SU_IMAGES = [
  { src: '/images/su/1.jpg', alt: 'Student Union 1' },
  { src: '/images/su/2.jpg', alt: 'Student Union 2' },
  { src: '/images/su/3.jpg', alt: 'Student Union 3' },
];

export const StudentUnionPage = () => {
  const t = useTranslations('activities.studentUnion');

  const locale = useLocale();

  const responsibilities =
    t.raw('responsibilities.items') as string[];

  // ✅ Student Union Schema
  const studentUnionSchema = {
    '@context': 'https://schema.org',

    '@type': 'EducationalOrganization',

    name:
      locale === 'ar'
        ? 'اتحاد الطلاب'
        : 'Student Union',

    url: `${siteConfig.url}/${locale}/student-union`,

    parentOrganization: {
      '@type': 'EducationalOrganization',

      name: siteConfig.name.en,

      alternateName: siteConfig.name.ar,
    },

    image: SU_IMAGES.map(
      (img) => `${siteConfig.url}${img.src}`
    ),
  };

  return (
    <>
      {/* ✅ JSON-LD */}
      <JsonLd data={studentUnionSchema} />

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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
              <Users className="w-12 h-12 text-[#0652ba] mb-4" />

              <h3 className="text-2xl font-bold mb-4 text-gray-900">
                {t('responsibilities.title')}
              </h3>

              <ul className="space-y-3 text-gray-600">

                {responsibilities.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2"
                  >
                    <span className="text-[#0652ba] font-bold mt-0.5">
                      •
                    </span>

                    {item}
                  </li>
                ))}

              </ul>
            </div>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {SU_IMAGES.map((img) => (
              <div
                key={img.src}
                className="relative h-64 rounded-xl overflow-hidden shadow-md"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            ))}

          </div>

          <div className="bg-[#0652ba] text-white py-6 text-center rounded-xl">
            <p className="flex items-center justify-center gap-3 flex-wrap">

              <span>{t('followUs')}</span>

              <a
                href="https://www.facebook.com/profile.php?id=100088099876007"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white text-[#0652ba] px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-all"
              >
                <FacebookIcon className="w-5 h-5" />

                {t('facebook')}
              </a>

            </p>
          </div>

        </div>
      </div>
    </>
  );
};
