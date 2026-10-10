// ✅ لا يحتاج 'use client' — الـ parent (GalleryClient) هو Client Component
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { formatGalleryDate } from '../utils/galleryDate';
import type { GalleryItem } from '../types/gallery.types';

interface LightboxModalProps {
  items: GalleryItem[];
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

const SWIPE_START_THRESHOLD = 8;

export const LightboxModal = ({
  items,
  index,
  locale,
  labels,
  onClose,
  onNavigate,
}: LightboxModalProps) => {
  const isAr = locale === 'ar';
  const item = items[index];
  const total = items.length;

  const dragStart = useRef<{ x: number; y: number; active: boolean }>({
    x: 0,
    y: 0,
    active: false,
  });

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

  if (!item) return null;

  return (
    <div
      className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={item.date ? formatGalleryDate(item.date, isAr ? 'ar' : 'en') : item.title[isAr ? 'ar' : 'en']}
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

      {/* Image / Map */}
      <div
        className="relative w-full max-w-5xl mx-auto select-none"
        style={{ touchAction: 'pan-y' }}
        onClick={e => e.stopPropagation()}
        onPointerDown={e => {
          dragStart.current = { x: e.clientX, y: e.clientY, active: true };
          (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
        }}
        onPointerMove={e => {
          if (!dragStart.current.active) return;
          const dx = e.clientX - dragStart.current.x;
          const dy = e.clientY - dragStart.current.y;
          if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > SWIPE_START_THRESHOLD) {
            dragStart.current.active = false;
            go(dx < 0 ? 1 : -1);
          }
        }}
        onPointerUp={() => { dragStart.current.active = false; }}
        onPointerCancel={() => { dragStart.current.active = false; }}
      >
        {item.type === 'image' ? (
          <div key={item.id} className="relative h-[78vh] min-h-[320px] animate-fade-in">
            <Image
              src={item.url}
              alt={item.date ? formatGalleryDate(item.date, isAr ? 'ar' : 'en') : item.title[isAr ? 'ar' : 'en']}
              fill
              className="object-contain"
              sizes="100vw"
            />
          </div>
        ) : (
          <iframe
            src={item.embedSrc}
            className="w-full h-[78vh] min-h-[320px] rounded-lg"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={item.title[isAr ? 'ar' : 'en']}
          />
        )}

        {/* Caption */}
        <div className="mt-4 flex items-center justify-center gap-3">
          <p className="px-4 py-1.5 bg-white/10 text-white rounded-full text-sm md:text-base font-semibold">
            {item.date ? formatGalleryDate(item.date, isAr ? 'ar' : 'en') : item.title[isAr ? 'ar' : 'en']}
          </p>
          <span className="text-white/50 text-sm">
            {index + 1} / {total}
          </span>
        </div>
      </div>
    </div>
  );
};