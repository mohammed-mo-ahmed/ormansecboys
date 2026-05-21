// ✅ FAQPage JSON-LD — بيخلي Google يعرض rich snippets في نتائج البحث
import type { FAQItem } from '../types/faq.types';
import type { Locale } from '@/lib/i18n/config';

export const buildFAQSchema = (items: FAQItem[], locale: Locale) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: items.map(item => ({
    '@type': 'Question',
    name: item.question[locale],
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer[locale],
    },
  })),
});