

import { getTranslations } from 'next-intl/server';

import { getGalleryPhotos, getGalleryVideos } from '../services/gallery.service';

import { GalleryClient } from './GalleryClient';

import { JsonLd } from '@/shared/components/seo/JsonLd';
import { siteConfig } from '@/config/site';

interface GalleryPageProps {
  locale: string;
}

export const GalleryPage = async ({ locale }: GalleryPageProps) => {
  const [photos, videos, t] = await Promise.all([
    getGalleryPhotos(),
    getGalleryVideos(),
    getTranslations('gallery'),
  ]);

  // ✅ Gallery Schema
  const gallerySchema = {
    '@context': 'https://schema.org',

    '@type': 'ImageGallery',

    name:
      locale === 'ar'
        ? 'معرض مدرسة الأورمان'
        : 'Al-Orman School Gallery',

    url: `${siteConfig.url}/${locale}/gallery`,

    image: photos
      .filter((p) => p.type === 'image' && p.url)
      .slice(0, 10)
      .map((p) => ({
        '@type': 'ImageObject',

        url: `${siteConfig.url}${p.url}`,

        name:
          p.title[
            locale === 'ar'
              ? 'ar'
              : 'en'
          ],
      })),
  };

  return (
    <>
      {/* ✅ JSON-LD */}
      <JsonLd data={gallerySchema} />

      <div className="min-h-screen bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4">

          <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              {t('title')}
            </h1>

            <p className="text-xl text-gray-600">
              {t('subtitle')}
            </p>
          </div>

          <GalleryClient
            photos={photos}
            videos={videos}
            locale={locale}
            labels={{
              photos: t('tabs.photos'),
              videos: t('tabs.videos'),
              closeLabel: t('closeLabel'),
            }}
          />

        </div>
      </div>
    </>
  );
};
