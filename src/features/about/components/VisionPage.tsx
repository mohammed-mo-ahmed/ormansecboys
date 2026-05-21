// ✅ Server Component كامل
import { getTranslations } from 'next-intl/server';
import { Eye, Target } from 'lucide-react';

export const VisionPage = async () => {
  const t = await getTranslations('about.vision');
  // ✅ t.raw() بترجع الـ array من الـ JSON مباشرة
  const goals = t.raw('goals.items') as string[];

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 space-y-12">

        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            {t('title')}
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            { key: 'vision',  Icon: Eye    },
            { key: 'mission', Icon: Target },
          ].map(({ key, Icon }) => (
            <div key={key} className="bg-white p-10 rounded-xl shadow-lg border-t-4 border-[#0652ba]">
              <div className="w-20 h-20 bg-[#0652ba] rounded-full flex items-center justify-center mx-auto mb-6">
                <Icon className="w-10 h-10 text-white" aria-hidden="true" />
              </div>
              <h2 className="text-3xl font-bold mb-6 text-center text-gray-900">
                {t(`${key}.title`)}
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed text-center">
                {t(`${key}.content`)}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-gray-50 p-10 rounded-xl border border-gray-100">
          <h3 className="text-2xl font-bold mb-6 text-gray-900">{t('goals.title')}</h3>
          <ul className="space-y-4">
            {goals.map((goal, i) => (
              <li key={i} className="flex items-start gap-4">
                <div className="w-8 h-8 bg-[#0652ba] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white font-bold text-sm">{i + 1}</span>
                </div>
                <p className="text-lg text-gray-700">{goal}</p>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  );
};