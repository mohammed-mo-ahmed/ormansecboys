'use client';
// src/features/home/components/HeroSection.tsx
import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { LayoutDashboard } from 'lucide-react';
import { ROUTES } from '@/config/routes';

const TypewriterTitle = ({ text }: { text: string }) => (
  <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 overflow-hidden leading-relaxed min-h-[5rem] sm:min-h-[6rem] md:min-h-[8rem]">
    {text.split('').map((char, i) => (
      <span
        key={i}
        className="opacity-0 inline"
        style={{ animation: 'typewriter-char 0.3s forwards', animationDelay: `${0.5 + i * 0.03}s` }}
      >
        {char}
      </span>
    ))}
  </h1>
);

export const HeroSection = () => {
  const t      = useTranslations('home.hero');
  const locale = useLocale();

  return (
    <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/backgrounds/backgroundhome.webp"
          alt=""
          fill
          className="object-cover"
          priority
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-[#0652ba]/40 to-[#0652ba]/60 z-10" />

      <div className="relative z-20 text-center text-white px-4 max-w-4xl">
        <TypewriterTitle text={t('title')} />
        <p className="text-lg sm:text-xl mb-8 leading-relaxed opacity-0 animate-fade-in">
          {t('subtitle')}
        </p>

        <div className="flex flex-wrap gap-4 justify-center">
          {/* ✅ يروح /login مباشرة بدون modal */}
          <Link
            href={`/${locale}/login`}
            className="flex items-center gap-2 px-8 py-3 bg-white text-[#0652ba] rounded-lg
              font-bold text-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg"
          >
            <LayoutDashboard className="w-5 h-5" />
            {t('dashboard')}
          </Link>

          <Link
            href={`/${locale}${ROUTES.contact}`}
            className="px-8 py-3 bg-transparent border-2 border-white text-white rounded-lg
              font-bold text-lg hover:bg-white hover:text-[#0652ba] transition-all transform hover:scale-105"
          >
            {t('contactUs')}
          </Link>
        </div>
      </div>
    </section>
  );
};