'use client'; // ✅ يحتاج 'use client' عشان useState للـ zoom
import { useState } from 'react';
import { NewsCard } from './NewsCard';
import { ImageZoomModal } from '@/shared/components/ui/ImageZoomModal';
import type { NewsItem } from '../types/news.types';

interface NewsGridProps {
  items: NewsItem[];
  locale: string;
  readMoreText: string;
}

export const NewsGrid = ({ items, locale, readMoreText }: NewsGridProps) => {
  const [zoomSrc, setZoomSrc] = useState<string | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.map(item => (
          <NewsCard
            key={item.id}
            item={item}
            locale={locale}
            readMoreText={readMoreText}
            onZoom={setZoomSrc}
          />
        ))}
      </div>

      {zoomSrc && (
        <ImageZoomModal src={zoomSrc} onClose={() => setZoomSrc(null)} />
      )}
    </>
  );
};