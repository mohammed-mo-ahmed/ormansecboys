import Image from 'next/image';
import type { AlumniStory } from '../types/alumni.types';
import type { Locale } from '@/lib/i18n/config';

interface AlumniCardProps {
  alumni: AlumniStory;
  locale: Locale;
}

export const AlumniCard = ({ alumni, locale }: AlumniCardProps) => (
  <a href={alumni.link[locale]} target="_blank" rel="noopener noreferrer" className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all transform hover:-translate-y-2 border border-gray-100 block focus:outline-none focus:ring-2 focus:ring-[#0652ba] focus:ring-offset-2">
    <div className="relative h-64 bg-gray-200">
      <Image src={alumni.image} alt={alumni.name[locale]} fill className="object-cover" sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" />
    </div>
    <div className="p-6">
      <h3 className="text-xl font-bold mb-3 text-gray-900">{alumni.name[locale]}</h3>
      <p className="text-gray-600 leading-relaxed line-clamp-4">{alumni.achievement[locale]}</p>
    </div>
  </a>
);