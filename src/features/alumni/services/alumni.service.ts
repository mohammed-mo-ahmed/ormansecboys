import type { AlumniStory } from '../types/alumni.types';

export const getAlumniStories = async (): Promise<AlumniStory[]> => [
  {
    id: '1',
    name: { ar: 'د.حسام بدراوي', en: 'Dr. Hossam Badrawi' },
    achievement: {
      ar: 'طبيب وأستاذ جامعي وسياسي مصري بارز، شغل مناصب بارزة في الدولة، منها عضو مجلس الشورى المصري ورئيس لجنة التعليم والبحث العلمي في البرلمان من عام 2000 حتى 2005. كما عُيِّن أمينًا عامًا للحزب الوطني عام 2011.',
      en: 'A prominent Egyptian doctor, university professor, and politician. He served as a member of the Egyptian Shura Council and headed the Education and Scientific Research Committee in Parliament from 2000 to 2005, and was appointed Secretary-General of the National Party in 2011.',
    },
    image: '/images/alumni/dr.hossam-badrawi.jpeg',
    link: {
      ar: 'https://www.hossambadrawi.com/%d8%af-%d8%ad%d8%b3%d8%a7%d9%85-%d8%a8%d8%af%d8%b1%d8%a7%d9%88%d9%8a-%d9%8a%d8%aa%d8%a8%d9%86%d9%8a-%d9%85%d8%a8%d8%a7%d8%af%d8%b1%d8%a9/',
      en: 'https://www.hossambadrawi.com/en/dr-hossam-badrawi-starts-an-initiative-that-begins-with-the-orman-model-school-to-develop-ancient-schools/',
    },
  },
  {
    id: '2',
    name: { ar: 'د.حسام نايل', en: 'Dr. Hossam Nayel' },
    achievement: {
      ar: 'كاتب ومترجم وأستاذ نقد أدبي مصري، نال الدكتوراه من جامعة القاهرة. يعمل مدرسًا للنقد الأدبي بأكاديمية الفنون، وحصل على جائزة الدولة التشجيعية (2013) وجائزة الترجمة (2019).',
      en: 'An Egyptian writer, translator, and professor of literary criticism at the Academy of Arts in Cairo. He received the State Encouragement Award (2013) and the Translation Award (2019).',
    },
    image: '/images/alumni/Dr.Hossam-Nayel.jpeg',
    link: {
      ar: 'https://ar.wikipedia.org/wiki/%D8%AD%D8%B3%D8%A7%D9%85_%D9%86%D8%A7%D9%8A%D9%84',
      en: 'https://ar.wikipedia.org/wiki/%D8%AD%D8%B3%D8%A7%D9%85_%D9%86%D8%A7%D9%8A%D9%84',
    },
  },
];