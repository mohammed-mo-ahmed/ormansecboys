import { getTranslations } from 'next-intl/server';
import { ExternalLink } from 'lucide-react';
import { getResourceLinks } from '../services/resources.service';

interface ResourcesPageProps {
  locale: string;
}

export const ResourcesPage = async ({ locale }: ResourcesPageProps) => {
  const isAr = locale === 'ar';
  const [links, t] = await Promise.all([
    getResourceLinks(),
    getTranslations('resources'),
  ]);

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">{t('title')}</h1>
          <p className="text-xl text-gray-600">{t('subtitle')}</p>
        </div>
        <section>
          <h2 className="text-3xl font-bold mb-8 text-gray-900 flex items-center gap-3">
            <ExternalLink className="w-8 h-8 text-[#0652ba]" aria-hidden="true" />
            {t('platformsTitle')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {links.map(link => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2 border border-gray-100 block focus:outline-none focus:ring-2 focus:ring-[#0652ba] focus:ring-offset-2"
              >
                <h3 className="text-xl font-bold mb-3 text-gray-900 flex items-center gap-2">
                  {link.name[isAr ? 'ar' : 'en']}
                  <ExternalLink className="w-5 h-5 text-[#0652ba] flex-shrink-0" aria-hidden="true" />
                </h3>
                <p className="text-gray-600">{link.description[isAr ? 'ar' : 'en']}</p>
              </a>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};