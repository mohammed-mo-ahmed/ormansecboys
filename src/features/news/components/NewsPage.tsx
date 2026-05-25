// src/features/news/components/NewsPage.tsx
import { getTranslations } from 'next-intl/server';
import { getNewsItems } from '../services/news.service';
import { NewsGrid } from './NewsGrid';

interface NewsPageProps {
  locale: string;
}

export const NewsPage = async ({ locale }: NewsPageProps) => {
  const [items, t] = await Promise.all([
    getNewsItems(),
    getTranslations('news'),
  ]);

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">{t('title')}</h1>
          <p className="text-xl text-gray-600">{t('subtitle')}</p>
        </div>
        <NewsGrid items={items} locale={locale} readMoreText={t('readMore')} />
      </div>
    </div>
  );
};