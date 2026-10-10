// ✅ Data منفصلة عن الـ UI (Server-side)
// يقرأ فولدر archive في وقت البناء ويرتّب الصور من الأحدث للأقدم
import { existsSync, readdirSync } from 'node:fs';
import path from 'node:path';
import type { GalleryItem, GalleryVideo } from '../types/gallery.types';
import { formatGalleryDate, parseFileDate } from '../utils/galleryDate';

const GALLERY_DIR = path.join(process.cwd(), 'public', 'images', 'gallery');
const ARCHIVE_DIR = path.join(GALLERY_DIR, 'archive');
const THUMBS_DIR = path.join(GALLERY_DIR, 'archive_thumbs');

const encodeSegment = (segment: string) => encodeURIComponent(segment);

const FEATURED_ITEMS: GalleryItem[] = [
  {
    id: 'featured-library',
    type: 'image',
    url: '/images/gallery/12.webp',
    title: { ar: 'المكتبة', en: 'Library' },
    featured: true,
  },
  {
    id: 'featured-sports-field',
    type: 'map',
    url: '/images/gallery/5.webp', // thumbnail يظهر في الـ grid
    embedSrc:
      'https://www.google.com/maps/embed?pb=!4v1760612267962!6m8!1m7!1sCAoSFkNJSE0wb2dLRUlDQWdJRG1vSmZfQ0E.!2m2!1d30.03145829373583!2d31.20882287949921!3f300!4f0!5f0.7820865974627469',
    title: { ar: 'الملعب الرياضي', en: 'Sports Field' },
    featured: true,
  },
];

export const getGalleryPhotos = async (): Promise<GalleryItem[]> => {
  const files = existsSync(ARCHIVE_DIR)
    ? readdirSync(ARCHIVE_DIR).filter((file) => /\.jpe?g$/i.test(file))
    : [];

  const items = files
    .map((file): GalleryItem | null => {
      const parsed = parseFileDate(file);
      if (!parsed) return null;

      const url = `/images/gallery/archive/${encodeSegment(file)}`;

      const thumbFile = `${path.parse(file).name}.webp`;
      const thumbPath = `/images/gallery/archive_thumbs/${encodeSegment(thumbFile)}`;
      const thumbUrl = existsSync(path.join(THUMBS_DIR, thumbFile))
        ? thumbPath
        : url;

      const date = parsed.date;

      return {
        id: `archive-${parsed.sortKey}-${file}`,
        type: 'image',
        url,
        thumbUrl,
        date,
        year: parsed.year,
        sortKey: parsed.sortKey,
        title: { ar: formatGalleryDate(date, 'ar'), en: formatGalleryDate(date, 'en') },
      };
    })
    .filter((item): item is GalleryItem => item !== null)
    .sort((a, b) => (b.sortKey ?? 0) - (a.sortKey ?? 0));

  return [...FEATURED_ITEMS, ...items];
};

export const getGalleryVideos = async (): Promise<GalleryVideo[]> => [
  // 🔜 إضافة فيديوهات مستقبلاً
];