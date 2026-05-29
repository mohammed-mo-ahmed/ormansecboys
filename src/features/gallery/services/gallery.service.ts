// ✅ Data منفصلة عن الـ UI
// 🔜 مستقبلاً: Firebase Storage + Firestore
import type { GalleryItem, GalleryVideo } from '../types/gallery.types';

export const getGalleryPhotos = async (): Promise<GalleryItem[]> => [
  {
    id: '1',
    type: 'image',
    url: '/images/gallery/1.webp',
    title: { ar: 'انتخابات المكتب التنفيذي', en: 'Executive Office Elections' },
  },
  {
    id: '2',
    type: 'image',
    url: '/images/gallery/2.webp',
    title: { ar: 'انتخابات المكتب التنفيذي', en: 'Executive Office Elections' },
  },
  {
    id: '3',
    type: 'image',
    url: '/images/gallery/3.webp',
    title: { ar: 'قاعة المحاضرات', en: 'Lecture Hall' },
  },
  {
    id: '4',
    type: 'image',
    url: '/images/gallery/4.webp',
    title: { ar: 'نادي الفنون', en: 'Arts Club' },
  },
  {
    id: '5',
    type: 'image',
    url: '/images/gallery/12.webp',
    title: { ar: 'المكتبة', en: 'Library' },
  },
  {
    id: '6',
    type: 'map',
    url: '/images/gallery/5.webp', // thumbnail يظهر في الـ grid
    embedSrc:
      'https://www.google.com/maps/embed?pb=!4v1760612267962!6m8!1m7!1sCAoSFkNJSE0wb2dLRUlDQWdJRG1vSmZfQ0E.!2m2!1d30.03145829373583!2d31.20882287949921!3f300!4f0!5f0.7820865974627469',
    title: { ar: 'الملعب الرياضي', en: 'Sports Field' },
  },
  {
    id: '7',
    type: 'image',
    url: '/images/gallery/6.webp',
    title: { ar: 'نادي الموسيقى', en: 'Music Club' },
  },
  {
    id: '8',
    type: 'image',
    url: '/images/gallery/7.webp',
    title: { ar: 'طابور الصباح', en: 'Morning Assembly' },
  },
  { id: '9',  type: 'image', url: '/images/gallery/8.webp',  title: { ar: '', en: '' } },
  { id: '10', type: 'image', url: '/images/gallery/9.webp',  title: { ar: '', en: '' } },
  { id: '11', type: 'image', url: '/images/gallery/10.webp', title: { ar: '', en: '' } },
  { id: '12', type: 'image', url: '/images/gallery/11.webp', title: { ar: '', en: '' } },
];

export const getGalleryVideos = async (): Promise<GalleryVideo[]> => [
  // 🔜 إضافة فيديوهات مستقبلاً
];