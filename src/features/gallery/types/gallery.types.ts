import type { LocalizedString } from '@/shared/types/common';

export type GalleryItemType = 'image' | 'map';

export interface GalleryItem {
  id: string;
  type: GalleryItemType;
  url: string;         // للـ image: الصورة نفسها — للـ map: الـ thumbnail
  embedSrc?: string;   // فقط للـ map: iframe src
  title: LocalizedString;
}

export interface GalleryVideo {
  id: string;
  thumbnail: string;
  embedSrc: string;
  title: LocalizedString;
  duration: string;
}