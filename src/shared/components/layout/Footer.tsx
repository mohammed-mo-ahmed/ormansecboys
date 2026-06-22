'use client';
import { useTranslations, useLocale } from 'next-intl';
import { Mail, Phone, MapPin } from 'lucide-react';
import Link from 'next/link';
import { ROUTES } from '@/config/routes';

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

export const Footer = () => {
  const t      = useTranslations('footer');
  const locale = useLocale();

  const quickLinks = [
    { path: ROUTES.resources, key: 'resources' },
    { path: ROUTES.news,      key: 'news'      },
    { path: ROUTES.gallery,   key: 'gallery'   },
    { path: ROUTES.alumni,    key: 'alumni'     },
    { path: ROUTES.faq,       key: 'faq'        },
  ] as const;

  return (
    <footer className="bg-[#0c0c14] text-white pt-12 pb-6" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">

          <div>
            <h3 className="text-xl font-bold mb-4">{t('schoolName')}</h3>
            <p className="text-gray-400 mb-4">{t('description')}</p>
            <a href="https://www.facebook.com/profile.php?id=61572987415403" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="inline-flex w-10 h-10 bg-[#0652ba] rounded-full items-center justify-center hover:bg-[#0652ba]/80 transition-colors">
              <FacebookIcon className="w-5 h-5" />
            </a>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">{t('quickLinks')}</h3>
            <ul className="space-y-2 text-gray-400">
              {quickLinks.map(link => (
                <li key={link.path}>
                  <Link href={`/${locale}${link.path}`} className="hover:text-white transition-colors">
                    {t(`links.${link.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">{t('contactUs')}</h3>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-[#0652ba] shrink-0" />
                <span>{t('address')}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#0652ba] shrink-0" />
                <span dir="ltr">33350503</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#0652ba] shrink-0" />
                <span>ormansecboys@googlegroups.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 text-center text-gray-400">
          <p>{t('copyright')}</p>
          <p className="mt-2">
            {t('developedBy')}{' '}
            <a href={t('developerWhatsapp')} target="_blank" rel="noopener noreferrer" className="text-[#0652ba] hover:underline">
              {t('developerName')}
            </a>
            {' '}- {t('developerRole')}
          </p>
        </div>
      </div>
    </footer>
  );
};