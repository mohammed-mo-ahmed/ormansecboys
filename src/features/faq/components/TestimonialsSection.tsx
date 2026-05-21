// ✅ Server Component — pure display, no interactivity
import { Star, Quote } from 'lucide-react';
import type { Testimonial } from '../types/faq.types';
import type { Locale } from '@/lib/i18n/config';

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
  locale: Locale;
  title: string;
  subtitle: string;
}

export const TestimonialsSection = ({
  testimonials,
  locale,
  title,
  subtitle,
}: TestimonialsSectionProps) => (
  <section className="mb-20">
    <div className="text-center mb-12">
      <h2 className="text-4xl font-bold mb-6 text-gray-900">{title}</h2>
      <p className="text-xl text-gray-600">{subtitle}</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {testimonials.map(testimonial => (
        <div
          key={testimonial.id}
          className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 
          relative hover:shadow-xl transition-all"
        >
          {/* Decorative quote */}
          <Quote
            className="w-12 h-12 text-[#0652ba] opacity-20 absolute top-4 end-4"
            aria-hidden="true"
          />

          {/* Avatar + Name */}
          <div className="flex items-center gap-4 mb-4">
            {testimonial.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={testimonial.image}
                alt={testimonial.name[locale]}
                className="w-16 h-16 rounded-full object-cover"
              />
            ) : (
              // ✅ Fallback avatar بالحرف الأول
              <div
                className="w-16 h-16 rounded-full bg-[#0652ba]/10 flex items-center 
                justify-center text-[#0652ba] text-2xl font-bold flex-shrink-0"
                aria-hidden="true"
              >
                {testimonial.name[locale][0]}
              </div>
            )}
            <div>
              <h3 className="font-bold text-gray-900">{testimonial.name[locale]}</h3>
              <p className="text-sm text-[#0652ba]">{testimonial.role[locale]}</p>
            </div>
          </div>

          {/* Stars */}
          <div className="flex gap-1 mb-4" aria-label="5 stars">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" aria-hidden="true" />
            ))}
          </div>

          <p className="text-gray-600 leading-relaxed relative z-10">
            {testimonial.content[locale]}
          </p>
        </div>
      ))}
    </div>
  </section>
);