// ✅ الـ data انفصلت عن الـ UI
// 🔜 مستقبلاً: استبدال الـ array بـ Firebase Firestore fetch
import type { NewsItem } from '../types/news.types';

export const getNewsItems = async (): Promise<NewsItem[]> => {
  // TODO: استبدل بـ Firebase query
  return [
 {
    id: '',
    slug: '',
    title: {
      ar: '',
      en: '',
    },
    date: '',
    content: {
      ar: '',
      en: '',
    },
    image: '',
    link: '',
  },
  {
    id: '',
    slug: '',
    title: {
      ar: '',
      en: '',
    },
    date: '',
    content: {
      ar: '',
      en: '',
    },
    image: '',
    link: '',
    zoomable: false,
  },
  {
    id: '',
    slug: '',
    title: {
      ar: '',
      en: '',
    },
    date: '',
    content: {
      ar: '',
      en: '',
    },
    image: '',
    link: '',
    zoomable: false,
  },
  ];
};