'use client'; // ✅ هنا فقط — tabs + year nav + lightbox state
import { useMemo, useState } from 'react';
import Image from 'next/image';
import { CalendarDays, ImageIcon, Video } from 'lucide-react';
import { LightboxModal } from './LightboxModal';
import { VideoLightbox } from './VideoLightbox';
import { formatGalleryDate } from '../utils/galleryDate';
import type { GalleryItem, GalleryVideo } from '../types/gallery.types';

interface GalleryClientProps {
  photos: GalleryItem[];
  videos: GalleryVideo[];
  locale: string;
  labels: {
    photos: string;
    videos: string;
    closeLabel: string;
    jumpToYear: string;
    nextPhoto: string;
    prevPhoto: string;
  };
}

const GRID_SIZES =
  '(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw';

export const GalleryClient = ({ photos, videos, locale, labels }: GalleryClientProps) => {
  const [activeTab, setActiveTab] = useState<'photos' | 'videos'>('photos');
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<number | null>(null);
  const isAr = locale === 'ar';

  const featured = useMemo(() => photos.filter(p => p.featured), [photos]);
  const dated = useMemo(() => photos.filter(p => !p.featured), [photos]);

  const years = useMemo(
    () => Array.from(new Set(dated.map(p => p.year).filter((y): y is number => !!y))).sort((a, b) => b - a),
    [dated],
  );

  const grouped = useMemo(
    () => years.map(year => ({ year, items: dated.filter(p => p.year === year) })),
    [dated, years],
  );

  const jumpToYear = (year: number) => {
    document.getElementById(`gallery-year-${year}`)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  const caption = (item: GalleryItem) =>
    item.date ? formatGalleryDate(item.date, isAr ? 'ar' : 'en') : item.title[isAr ? 'ar' : 'en'];

  const renderCard = (item: GalleryItem, index: number) => (
    <div
      key={item.id}
      className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all overflow-hidden border border-gray-100"
    >
      <button
        onClick={() => setSelectedIndex(index)}
        className="relative aspect-square w-full block overflow-hidden focus:outline-none focus:ring-2 focus:ring-[#0652ba] focus:ring-offset-2"
        aria-label={caption(item)}
      >
        <Image
          src={item.thumbUrl ?? item.url}
          alt={caption(item)}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes={GRID_SIZES}
        />
      </button>
      <div className="px-3 py-2.5 flex items-center justify-center gap-1.5">
        <CalendarDays className="w-3.5 h-3.5 text-[#0652ba] shrink-0" aria-hidden="true" />
        <p className="text-sm font-semibold text-gray-700 truncate">{caption(item)}</p>
      </div>
    </div>
  );

  return (
    <div dir={isAr ? 'rtl' : 'ltr'}>
      {/* Tab Switcher */}
      <div className="flex justify-center gap-4 mb-8">
        {(['photos', 'videos'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex items-center gap-2 px-8 py-3 rounded-lg font-semibold transition-all ${
              activeTab === tab
                ? 'bg-[#0652ba] text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            {tab === 'photos'
              ? <ImageIcon className="w-5 h-5" aria-hidden="true" />
              : <Video className="w-5 h-5" aria-hidden="true" />
            }
            {labels[tab]}
          </button>
        ))}
      </div>

      {activeTab === 'photos' && (
        <>
          {/* Featured (Library + Sports Field) */}
          <div className="grid grid-cols-2 gap-4 mb-10 max-w-2xl mx-auto">
            {featured.map((item, i) => renderCard(item, i))}
          </div>

          {/* Year Nav */}
          {years.length > 0 && (
            <nav
              aria-label={labels.jumpToYear}
              className="mb-10"
            >
              <div className="flex gap-2 overflow-x-auto pb-1 snap-x">
                {years.map(year => (
                  <button
                    key={year}
                    onClick={() => jumpToYear(year)}
                    aria-label={`${labels.jumpToYear} ${year}`}
                    className="snap-start shrink-0 px-5 py-2 rounded-full bg-white border border-gray-200 hover:border-[#0652ba] hover:bg-[#0652ba] hover:text-white text-gray-800 font-bold transition-all"
                  >
                    {year}
                  </button>
                ))}
              </div>
            </nav>
          )}

          {/* Year Sections */}
          {grouped.map(({ year, items }) => (
            <section key={year} id={`gallery-year-${year}`} className="mb-12 scroll-mt-24">
              <div className="flex items-center gap-4 mb-5">
                <h2 className="text-2xl md:text-3xl font-bold text-[#0652ba]">{year}</h2>
                <div className="flex-1 h-px bg-[#0652ba]/20" />
                <span className="text-sm font-medium text-gray-500">
                  {items.length}
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {items.map(item => renderCard(item, featured.length + dated.indexOf(item)))}
              </div>
            </section>
          ))}
        </>
      )}

      {/* Videos Grid */}
      {activeTab === 'videos' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.length === 0 ? (
            <div className="col-span-full text-center py-20 text-gray-400">
              <Video className="w-16 h-16 mx-auto mb-4 opacity-30" />
              <p className="text-lg">{isAr ? 'قريباً...' : 'Coming soon...'}</p>
            </div>
          ) : (
            videos.map((video, index) => (
              <button
                key={video.id}
                onClick={() => setSelectedVideo(index)}
                className="group text-start bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all border border-gray-100 focus:outline-none focus:ring-2 focus:ring-[#0652ba] focus:ring-offset-2"
              >
                <div className="relative h-48 bg-gray-200 overflow-hidden">
                  <Image
                    src={video.thumbnail}
                    alt={video.title[isAr ? 'ar' : 'en']}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:bg-[#0652ba] group-hover:scale-110 transition-all">
                      <div className="w-0 h-0 border-y-8 border-y-transparent border-l-[14px] border-l-[#0652ba] group-hover:border-l-white ml-1" />
                    </div>
                  </div>
                  {video.duration && (
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-sm">
                      {video.duration}
                    </div>
                  )}
                </div>
              </button>
            ))
          )}
        </div>
      )}

      {/* Photos Lightbox */}
      {selectedIndex !== null && (
        <LightboxModal
          items={photos}
          index={selectedIndex}
          locale={locale}
          labels={{
            closeLabel: labels.closeLabel,
            nextPhoto: labels.nextPhoto,
            prevPhoto: labels.prevPhoto,
          }}
          onClose={() => setSelectedIndex(null)}
          onNavigate={setSelectedIndex}
        />
      )}

      {/* Video Player */}
      {selectedVideo !== null && (
        <VideoLightbox
          videos={videos}
          index={selectedVideo}
          locale={locale}
          labels={{
            closeLabel: labels.closeLabel,
            nextPhoto: labels.nextPhoto,
            prevPhoto: labels.prevPhoto,
          }}
          onClose={() => setSelectedVideo(null)}
          onNavigate={setSelectedVideo}
        />
      )}
    </div>
  );
};