'use client';
import { useTranslations } from 'next-intl';
import { GraduationCap, Shield, Users, Award, BookOpen, Target } from 'lucide-react';

const FEATURES = [
  { key: 'education',    Icon: GraduationCap },
  { key: 'military',     Icon: Shield        },
  { key: 'activities',   Icon: Users         },
  { key: 'achievements', Icon: Award         },
  { key: 'resources',    Icon: BookOpen      },
  { key: 'vision',       Icon: Target        },
] as const;

export const FeaturesSection = () => {
  const t = useTranslations('home.features');

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-4 text-gray-900">{t('sectionTitle')}</h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">{t('sectionSubtitle')}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES.map(({ key, Icon }) => (
            <div key={key} className="bg-gray-50 p-8 rounded-xl hover:shadow-xl transition-all transform hover:-translate-y-2 border border-gray-100">
              <div className="w-16 h-16 bg-[#0652ba] rounded-lg flex items-center justify-center mb-4">
                <Icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">{t(`${key}.title`)}</h3>
              <p className="text-gray-600">{t(`${key}.description`)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};