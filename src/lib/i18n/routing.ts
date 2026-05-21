import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';
import { locales, defaultLocale } from './config';

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: 'always', // /ar/... و /en/...
});

// ✅ استخدم دول بدل next/navigation في كل مكان
export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);