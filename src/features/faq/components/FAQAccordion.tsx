'use client'; // ✅ فقط عشان useState للـ accordion
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import type { FAQItem } from '../types/faq.types';
import type { Locale } from '@/lib/i18n/config';

interface FAQAccordionProps {
  items: FAQItem[];
  locale: Locale;
}

export const FAQAccordion = ({ items, locale }: FAQAccordionProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="max-w-4xl mx-auto space-y-4">
      {items.map((faq, index) => (
        <div
          key={faq.id}
          className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden"
        >
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="w-full flex items-center justify-between p-6 hover:bg-gray-50 
            transition-colors text-start"
            aria-expanded={openIndex === index}
          >
            <h3 className="text-lg font-bold text-gray-900 flex-1">
              {faq.question[locale]}
            </h3>
            <ChevronDown
              className={`w-6 h-6 text-[#0652ba] transition-transform flex-shrink-0 ms-4 ${
                openIndex === index ? 'rotate-180' : ''
              }`}
              aria-hidden="true"
            />
          </button>

          {/* ✅ smooth animation بدل conditional render */}
          <div
            className={`overflow-hidden transition-all duration-300 ${
              openIndex === index ? 'max-h-96' : 'max-h-0'
            }`}
          >
            <p className="px-6 pb-6 text-gray-600 leading-relaxed">
              {faq.answer[locale]}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};