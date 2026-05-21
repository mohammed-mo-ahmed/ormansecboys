'use client'; // ✅ فقط هنا — tabs + lightbox state
import { useState } from 'react';
import Image from 'next/image';
import { ImageIcon, Video } from 'lucide-react';
import { LightboxModal } from './LightboxModal';
import type { GalleryItem, GalleryVideo } from '../types/gallery.types';

interface GalleryClientProps {
  photos: GalleryItem[];
  videos: GalleryVideo[];
  locale: string;
  labels: {
    photos: string;
    videos: string;
    closeLabel: string;
  };
}

export const GalleryClient = ({ photos, videos, locale, labels }: GalleryClientProps) => {
  const [activeTab, setActiveTab] = useState<'photos' | 'videos'>('photos');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const isAr = locale === 'ar';

  return (
    <>
      {/* Tab Switcher */}
      <div className="flex justify-center gap-4 mb-12">
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

      {/* Photos Grid */}
      {activeTab === 'photos' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {photos.map(item => (
            <button
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="group relative aspect-square rounded-xl overflow-hidden 
              shadow-lg hover:shadow-xl transition-all focus:outline-none 
              focus:ring-2 focus:ring-[#0652ba] focus:ring-offset-2"
              aria-label={item.title[isAr ? 'ar' : 'en'] || undefined}
            >
              {/* ✅ next/image مع fill */}
              <Image
                src={item.url}
                alt={item.title[isAr ? 'ar' : 'en']}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-300"
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
              {/* Hover overlay */}
              {item.title[isAr ? 'ar' : 'en'] && (
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent 
                opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-white font-semibold text-sm">
                      {item.title[isAr ? 'ar' : 'en']}
                    </p>
                  </div>
                </div>
              )}
            </button>
          ))}
        </div>
      )}

      {/* Videos Grid */}
      {activeTab === 'videos' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.length === 0 ? (
            // ✅ Empty state بدل placeholder فارغ
            <div className="col-span-full text-center py-20 text-gray-400">
              <Video className="w-16 h-16 mx-auto mb-4 opacity-30" />
              <p className="text-lg">{isAr ? 'قريباً...' : 'Coming soon...'}</p>
            </div>
          ) : (
            videos.map(video => (
              <div
                key={video.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden 
                hover:shadow-xl transition-all border border-gray-100"
              >
                <div className="relative h-48 bg-gray-200">
                  <Image
                    src={video.thumbnail}
                    alt={video.title[isAr ? 'ar' : 'en']}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center">
                      <div className="w-0 h-0 border-y-8 border-y-transparent border-l-[14px] border-l-[#0652ba] ml-1" />
                    </div>
                  </div>
                  {video.duration && (
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-sm">
                      {video.duration}
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900">
                    {video.title[isAr ? 'ar' : 'en']}
                  </h3>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Lightbox */}
      {selectedItem && (
        <LightboxModal
          item={selectedItem}
          closeLabel={labels.closeLabel}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </>
  );
};