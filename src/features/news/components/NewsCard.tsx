import Image from 'next/image';
import { Calendar } from 'lucide-react';
import type { NewsItem } from '../types/news.types';

interface NewsCardProps {
  item: NewsItem;
  locale: string;
  readMoreText: string;
  onZoom?: (src: string) => void;
}

export const NewsCard = ({ item, locale, readMoreText, onZoom }: NewsCardProps) => {
  const isAr = locale === 'ar';

  return (
    <article className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all transform hover:-translate-y-2 border border-gray-100">
      <div className={`relative h-48 bg-gray-200 overflow-hidden ${item.zoomable && onZoom ? 'cursor-zoom-in' : ''}`} onClick={() => item.zoomable && onZoom?.(item.image)}>
        <Image src={item.image} alt={item.title[isAr ? 'ar' : 'en']} fill className="object-cover hover:scale-110 transition-transform duration-300" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
      </div>
      <div className="p-6">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
          <Calendar className="w-4 h-4" />
          <time dateTime={item.date}>{item.date}</time>
        </div>
        <h2 className="text-xl font-bold mb-3 text-gray-900 line-clamp-2">{item.title[isAr ? 'ar' : 'en']}</h2>
        <p className="text-gray-600 line-clamp-3 mb-4">{item.content[isAr ? 'ar' : 'en']}</p>
        {item.link && (
          <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-[#0652ba] font-semibold hover:underline">
            {readMoreText} →
          </a>
        )}
      </div>
    </article>
  );
};