import type { LocalizedString } from '@/shared/types/common';

export interface NewsItem {
  id: string;
  slug: string;
  title: LocalizedString;
  date: string;
  content: LocalizedString;
  image: string;
  link: string;
  zoomable?: boolean; // ✅ بيحدد إذا الصورة قابلة للتكبير
}