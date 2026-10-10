import { useEffect } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import type { GalleryVideo } from '../types/gallery.types';

interface VideoLightboxProps {
  videos: GalleryVideo[];
  index: number;
  locale: string;
  labels: {
    closeLabel: string;
    nextPhoto: string;
    prevPhoto: string;
  };
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export const VideoLightbox = ({
  videos,
  index,
  locale,
  labels,
  onClose,
  onNavigate,
}: VideoLightboxProps) => {
  const isAr = locale === 'ar';
  const video = videos[index];
  const total = videos.length;

  const go = (delta: number) => {
    const next = index + delta;
    if (next < 0 || next >= total) return;
    onNavigate(next);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') go(isAr ? 1 : -1);
      if (e.key === 'ArrowRight') go(isAr ? -1 : 1);
    };

    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, isAr, total, onClose, onNavigate]);

  if (!video) return null;

  return (
    <div
      className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={video.title[isAr ? 'ar' : 'en']}
    >
      {/* Close */}
      <button
        onClick={onClose}
        aria-label={labels.closeLabel}
        className="absolute top-4 end-4 w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors z-10"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Prev / Next */}
      {index > 0 && (
        <button
          onClick={e => { e.stopPropagation(); go(-1); }}
          aria-label={labels.prevPhoto}
          dir={isAr ? 'rtl' : 'ltr'}
          className="absolute start-2 md:start-6 top-1/2 -translate-y-1/2 w-11 h-11 md:w-12 md:h-12 bg-white/95 rounded-full flex items-center justify-center hover:bg-[#0652ba] hover:text-white transition-all z-10 shadow-lg"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}
      {index < total - 1 && (
        <button
          onClick={e => { e.stopPropagation(); go(1); }}
          aria-label={labels.nextPhoto}
          dir={isAr ? 'rtl' : 'ltr'}
          className="absolute end-2 md:end-6 top-1/2 -translate-y-1/2 w-11 h-11 md:w-12 md:h-12 bg-white/95 rounded-full flex items-center justify-center hover:bg-[#0652ba] hover:text-white transition-all z-10 shadow-lg"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}

      {/* Player */}
      <div className="relative w-full max-w-4xl mx-auto" onClick={e => e.stopPropagation()}>
        <div key={video.id} className="relative aspect-video w-full animate-fade-in">
          <iframe
            src={`${video.embedSrc}?autoplay=1&rel=0`}
            className="w-full h-full rounded-lg"
            style={{ border: 0 }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={video.title[isAr ? 'ar' : 'en']}
          />
        </div>

        {/* Caption */}
        <div className="mt-4 flex items-center justify-center">
          <span className="text-white/50 text-sm">
            {index + 1} / {total}
          </span>
        </div>
      </div>
    </div>
  );
};