import type { LocalizedString } from '@/shared/types/common';

export type GalleryItemType = 'image' | 'map';

export interface GalleryItem {
  id: string;
  type: GalleryItemType;
  url: string;         // للـ image: الصورة نفسها — للـ map: الـ thumbnail
  thumbUrl?: string;   // مصغّرة خفيفة للشبكة
  embedSrc?: string;   // فقط للـ map: iframe src
  title: LocalizedString;
  date?: string;       // 'YYYY-MM-DD' أو 'YYYY' للسنة فقط
  year?: number;       // مستخرج للترتيب والتجميع
  sortKey?: number;    // مفتاح رقمي للترتيب (تنازلي = الأحدث الأول)
  featured?: boolean;  // صور مثبتة في أول المعرض (مكتبة / ملعب)
}

export interface GalleryYearGroup {
  year: number;
  items: GalleryItem[];
}

export interface GalleryVideo {
  id: string;
  thumbnail: string;
  embedSrc: string;
  title: LocalizedString;
  duration: string;
}