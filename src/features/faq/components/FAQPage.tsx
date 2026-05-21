// ✅ Server Component — data fetching + JSON-LD + layout
import { getTranslations, getLocale } from 'next-intl/server';
import { getFAQItems, getTestimonials } from '../services/faq.service';
import { buildFAQSchema } from '../utils/buildFAQSchema';
import { FAQAccordion } from './FAQAccordion';
import { TestimonialsSection } from './TestimonialsSection';
import { JsonLd } from '@/shared/components/seo/JsonLd';
import { Link } from '@/lib/i18n/routing';
import { ROUTES } from '@/config/routes';
import type { Locale } from '@/lib/i18n/config';

export const FAQPage = async () => {
  const [faqs, testimonials, locale, t] = await Promise.all([
    getFAQItems(),
    getTestimonials(),
    getLocale(),
    getTranslations('faq'),
  ]);

  // ✅ FAQPage schema — بيعمل rich snippets في Google (سؤال وجواب في نتائج البحث)
  const faqSchema = buildFAQSchema(faqs, locale as Locale);

  return (
    <>
      <JsonLd data={faqSchema} />

      <div className="min-h-screen bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4">

          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              {t('title')}
            </h1>
            <p className="text-xl text-gray-600">{t('subtitle')}</p>
          </div>

          {/* ✅ Accordion — Client Component عشان useState */}
          <section className="mb-20">
            <FAQAccordion items={faqs} locale={locale as Locale} />
          </section>

          {/* ✅ Testimonials — Server Component */}
          <TestimonialsSection
            testimonials={testimonials}
            locale={locale as Locale}
            title={t('testimonials.title')}
            subtitle={t('testimonials.subtitle')}
          />

          {/* CTA */}
          <section className="mt-16 bg-[#0652ba] text-white rounded-xl p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">{t('cta.title')}</h2>
            <p className="text-xl mb-8 opacity-90">{t('cta.subtitle')}</p>
            <Link
              href={ROUTES.contact}
              className="px-8 py-3 bg-white text-[#0652ba] rounded-lg font-bold text-lg 
              hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg inline-block"
            >
              {t('cta.button')}
            </Link>
          </section>

        </div>
      </div>
    </>
  );
};