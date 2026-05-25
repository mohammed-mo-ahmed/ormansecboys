// ✅ Server Component — يستقبل locale كـ prop بدل getLocale()
import { getTranslations } from 'next-intl/server';
import { Target, Users } from 'lucide-react';

interface OverviewPageProps {
  locale: string;
}

export const OverviewPage = async ({ locale }: OverviewPageProps) => {
  const t = await getTranslations('about.overview');

  const VALUES_KEYS = ['excellence', 'discipline', 'leadership'] as const;

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 space-y-12">

        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            {t('title')}
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">{t('subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            { key: 'academic', Icon: Target },
            { key: 'military', Icon: Users },
          ].map(({ key, Icon }) => (
            <div key={key} className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
              <div className="w-16 h-16 bg-[#0652ba] rounded-lg flex items-center justify-center mb-4">
                <Icon className="w-8 h-8 text-white" aria-hidden="true" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">
                {t(`${key}.title`)}
              </h3>
              <p className="text-gray-600 leading-relaxed">{t(`${key}.description`)}</p>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-[#0652ba] to-[#0652ba]/90 text-white p-12 rounded-xl">
          <h3 className="text-3xl font-bold mb-6 text-center">{t('values.title')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {VALUES_KEYS.map(key => (
              <div key={key} className="text-center">
                <div className="text-4xl font-bold mb-2">{t(`values.${key}.title`)}</div>
                <p className="opacity-90">{t(`values.${key}.subtitle`)}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};