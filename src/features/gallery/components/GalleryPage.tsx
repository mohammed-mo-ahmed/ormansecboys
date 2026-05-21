// ✅ Server Component — data fetching + static header
import { getTranslations, getLocale } from 'next-intl/server';
import { getGalleryPhotos, getGalleryVideos } from '../services/gallery.service';
import { GalleryClient } from './GalleryClient';

export const GalleryPage = async () => {
  const [photos, videos, locale, t] = await Promise.all([
    getGalleryPhotos(),
    getGalleryVideos(),
    getLocale(),
    getTranslations('gallery'),
  ]);

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            {t('title')}
          </h1>
          <p className="text-xl text-gray-600">{t('subtitle')}</p>
        </div>

        {/* ✅ كل الـ interactivity في Client Component واحد */}
        <GalleryClient
          photos={photos}
          videos={videos}
          locale={locale}
          labels={{
            photos:     t('tabs.photos'),
            videos:     t('tabs.videos'),
            closeLabel: t('closeLabel'),
          }}
        />
      </div>
    </div>
  );
};