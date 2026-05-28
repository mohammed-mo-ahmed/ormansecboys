// ✅ Server Component — يستقبل locale كـ prop
import { getTranslations } from 'next-intl/server';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { JsonLd } from '@/shared/components/seo/JsonLd';
import { ContactForm } from './ContactForm';
import { siteConfig } from '@/config/site';

interface ContactPageProps {
  locale: string;
}

export const ContactPage = async ({ locale }: ContactPageProps) => {
  const t = await getTranslations('contact');

  const schoolSchema = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: siteConfig.name.en,
    alternateName: siteConfig.name.ar,
    url: siteConfig.url,
    logo: `${siteConfig.url}${siteConfig.ogImage}`,
    sameAs: [siteConfig.facebook],
    address: {
      '@type': 'PostalAddress',
      streetAddress: '3 Madares St.',
      addressLocality: 'Dokki',
      addressRegion: 'Giza',
      addressCountry: 'EG',
    },
    telephone: '33350503',
    email: 'orman.sec.boys@gmail.com',
    openingHours: 'Su-Th 08:00-14:00',
  };

  const contactItems = [
    { key: 'address', Icon: MapPin, value: t('info.address.value'), dir: undefined },
    { key: 'phone',   Icon: Phone,  value: '33350503',                dir: 'ltr' as const },
    { key: 'email',   Icon: Mail,   value: 'orman.sec.boys@gmail.com', dir: undefined },
    { key: 'hours',   Icon: Clock,  value: null,                       dir: undefined },
  ] as const;

  return (
    <>
      <JsonLd data={schoolSchema} />

      <div className="min-h-screen bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4">

          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              {t('title')}
            </h1>
            <p className="text-xl text-gray-600">{t('subtitle')}</p>
          </div>

          {/* Grid: معلومات + فورم */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-12">

            {/* معلومات التواصل */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">{t('info.sectionTitle')}</h2>
              {contactItems.map(({ key, Icon, value, dir }) => (
                <div key={key} className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#0652ba] rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-white" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">{t(`info.${key}.label`)}</h3>
                    {key === 'hours' ? (
                      <>
                        <p className="text-gray-600">{t('info.hours.weekdays')}</p>
                        <p className="text-gray-600">{t('info.hours.weekend')}</p>
                      </>
                    ) : (
                      <p className="text-gray-600" dir={dir}>{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* ✅ فورم التواصل */}
            <ContactForm />
          </div>

          {/* خريطة */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
            <div className="aspect-video w-full">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3454.1234567890123!2d31.2088227!3d30.031471!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x145846d0f2f8bc57%3A0x1fc6282cc4517f94!2sAl-Orman%20School!5e0!3m2!1sar!2seg!4v1700000000000!5m2!1sar!2seg"
                className="w-full h-full"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                title={t('mapTitle')}
              />
            </div>
          </div>

        </div>
      </div>
    </>
  );
};