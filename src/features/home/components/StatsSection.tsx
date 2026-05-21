'use client';
import { useTranslations } from 'next-intl';

const STATS = [
  { value: '40+',   key: 'years'    },
  { value: '3000+', key: 'students' },
  { value: '50+',   key: 'teachers' },
  { value: '20+',   key: 'awards'   },
] as const;

export const StatsSection = () => {
  const t = useTranslations('home.stats');

  return (
    <section className="py-20 bg-gradient-to-br from-[#0652ba] to-[#0652ba]/90 text-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {STATS.map(({ value, key }) => (
            <div key={key}>
              <div className="text-5xl font-bold mb-2">{value}</div>
              <div className="text-lg opacity-90">{t(key)}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};