'use client'; // ✅ عشان useState + useEffect + event handlers

import { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronDown, Globe } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import { usePathname, useRouter, Link } from '@/lib/i18n/routing'; // ✅ مش next/navigation
import { navigationItems } from '@/config/routes';
import type { NavigationItem } from '@/config/routes';
import type { Locale } from '@/lib/i18n/config';

export const Navigation = () => {
  const locale = useLocale() as Locale;
  const t = useTranslations('navigation');
  const pathname = usePathname(); // ✅ بيرجع الـ path بدون locale prefix
  const router = useRouter();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement | null>(null);

  // إغلاق عند تغيير الـ route
  useEffect(() => {
    setMobileMenuOpen(false);
    setOpenDropdown(null);
  }, [pathname]);

  // إغلاق عند الضغط خارج الـ nav
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // ✅ تبديل اللغة — next-intl بيتعامل مع الـ URL تلقائياً
  const toggleLocale = () => {
    const nextLocale: Locale = locale === 'ar' ? 'en' : 'ar';
    router.replace(pathname, { locale: nextLocale });
  };

  // ✅ هل المسار ده active؟ — pathname هنا بدون locale
  const isActive = (path?: string) => {
    if (!path) return false;
    return pathname === path || pathname.startsWith(`${path}/`);
  };

  const baseClasses = `
    flex items-center w-full px-5 py-2
    text-sm lg:text-base font-semibold tracking-wide
    transition-colors select-none
  `;

  const renderNavItem = (item: NavigationItem, isMobile = false) => {
    if (item.children) {
      return (
        <div key={item.id} className={`relative ${!isMobile ? 'group' : ''}`}>
          <button
            onClick={() => {
              if (isMobile)
                setOpenDropdown(prev => (prev === item.id ? null : item.id));
            }}
            className={`
              ${baseClasses}
              ${locale === 'ar' ? 'text-right flex-row-reverse' : 'text-left'}
              rounded-md hover:bg-white/20 focus:bg-white/25
              ${!isMobile ? 'justify-center text-center' : 'justify-between'}
            `}
            style={{ minHeight: '50px' }}
          >
            <span
              className={`flex-1 ${
                !isMobile
                  ? 'text-center break-words whitespace-normal leading-tight'
                  : ''
              }`}
            >
              {t(item.id)}
            </span>
            <ChevronDown
              className={`w-4 h-4 flex-shrink-0 transition-transform duration-300
                ${
                  openDropdown === item.id
                    ? 'rotate-180'
                    : !isMobile
                    ? 'group-hover:rotate-180'
                    : ''
                }`}
            />
          </button>

          <div
            className={`${
              isMobile
                ? `overflow-hidden transition-all duration-300 ${
                    openDropdown === item.id
                      ? 'max-h-96 opacity-100'
                      : 'max-h-0 opacity-0'
                  }`
                : 'absolute top-full left-0 mt-1 hidden group-hover:block'
            } bg-[#0652ba] rounded-md shadow-lg py-2 min-w-[200px] z-50`}
          >
            {item.children.map(child => (
              <Link
                key={child.id}
                href={child.path!}
                onClick={() => {
                  if (isMobile) setMobileMenuOpen(false);
                  setOpenDropdown(null);
                }}
                className={`
                  ${baseClasses}
                  ${isActive(child.path) ? 'bg-white/25' : 'hover:bg-white/20'}
                  ${locale === 'ar' ? 'text-right' : 'text-left'}
                  rounded-none
                `}
                style={{ minHeight: '50px' }}
              >
                {t(child.id)}
              </Link>
            ))}
          </div>
        </div>
      );
    }

    return (
      <Link
        key={item.id}
        href={item.path!}
        onClick={() => {
          if (isMobile) setMobileMenuOpen(false);
          setOpenDropdown(null);
        }}
        className={`
          ${baseClasses}
          ${isActive(item.path) ? 'bg-white/25' : 'hover:bg-white/20'}
          rounded-md
          ${!isMobile ? 'justify-center text-center' : ''}
        `}
        style={{ minHeight: '50px' }}
      >
        <span
          className={`block w-full ${
            !isMobile
              ? 'text-center break-words whitespace-normal leading-tight'
              : ''
          }`}
        >
          {t(item.id)}
        </span>
      </Link>
    );
  };

  return (
    <nav
      ref={navRef}
      dir={locale === 'ar' ? 'rtl' : 'ltr'}
      className={`bg-[#0652ba] text-white shadow-lg sticky top-0 z-50 font-[Cairo] ${
        locale === 'ar' ? 'text-right' : 'text-left'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center h-16 justify-between">
          {/* ✅ next/image بدل img */}
          <Link href="/" className="w-40 sm:w-48 md:w-56 lg:w-60 h-auto">
            <Image
              src={
                locale === 'ar'
                  ? '/images/logos/logo-ar.svg'
                  : '/images/logos/logo-en.svg'
              }
              alt={locale === 'ar' ? 'شعار المدرسة' : 'School Logo'}
              width={240}
              height={64}
              className="w-full h-full object-contain"
              priority // ✅ LCP image — يتحمل أول حاجة
            />
          </Link>

          {/* Desktop */}
          <div className="hidden lg:flex items-center gap-2">
            {navigationItems.map(item => renderNavItem(item))}
            <button
              onClick={toggleLocale}
              className="ml-4 px-4 py-2 bg-white/10 rounded-lg hover:bg-white/25 transition-colors flex items-center gap-2"
            >
              <Globe className="w-4 h-4" />
              <span>{locale === 'ar' ? 'EN' : 'عربي'}</span>
            </button>
          </div>

          {/* Mobile */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={toggleLocale}
              className="px-3 py-2 bg-white/10 rounded-lg hover:bg-white/25 transition-colors"
            >
              <Globe className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(s => !s)}
              className="p-2 rounded-lg hover:bg-white/25 transition-colors"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden pb-4 space-y-1">
            {navigationItems.map(item => renderNavItem(item, true))}
          </div>
        )}
      </div>
    </nav>
  );
};