// ✅ الـ data انفصلت عن الـ UI
// 🔜 مستقبلاً: استبدال الـ array بـ Firebase Firestore fetch
import type { NewsItem } from '../types/news.types';

export const getNewsItems = async (): Promise<NewsItem[]> => {
  // TODO: استبدل بـ Firebase query
  return [
    {
      id: '1',
      slug: 'state-prize-competition-2025', // ✅ جديد للـ SEO
      title: {
        ar: 'مسابقة جائزة الدولة للمبدع الصغير',
        en: 'State Prize Competition for Young Creator',
      },
      date: '2025-12-31',
      content: {
        ar: 'جائزة الدولة للمبدع الصغير، تحت رعاية السيدة انتصار السيسي، تُنظمها وزارة الثقافة لاكتشاف ودعم مواهب الأطفال من سن 5 إلى 18 سنة في مجالات الأدب والفنون والابتكار، بجوائز قيمتها 40 ألف جنيه. آخر موعد للتقديم 31 ديسمبر 2025.',
        en: "The State Prize for Young Creator, under the patronage of Mrs. Entissar El-Sisi, is organized by the Ministry of Culture to discover and support children's talents aged 5 to 18 in literature, arts, and innovation, with prizes worth 40,000 EGP. Deadline: December 31, 2025.",
      },
      image: '/images/news/state-prize-competition.png',
      link: 'http://giza.gov.eg/DocLib4/%D8%A7%D9%84%D8%AA%D9%81%D8%A7%D8%B5%D9%8A%D9%84%20%D8%A7%D9%84%D9%83%D8%A7%D9%85%D9%84%D8%A9%20%D8%A7%D9%84%D8%AF%D9%88%D8%B1%D8%A9%20%D8%A7%D9%84%D8%B3%D8%A7%D8%AF%D8%B3%D8%A9%202026.pdf',
    },
    {
      id: '2',
      slug: 'october-exam-schedule-giza-2025',
      title: {
        ar: 'جدول امتحان شهر أكتوبر لطلاب الصف الثانوى فى الجيزة',
        en: 'October Exam Schedule for Secondary Students in Giza',
      },
      date: '2025-10-20',
      content: {
        ar: 'أعلنت مديرية التربية والتعليم بالجيزة جدول امتحانات شهر أكتوبر لطلاب الصفوف الثانوية، والتي تبدأ في 20 أكتوبر وتشمل جميع المواد الدراسية الأساسية.',
        en: 'The Directorate of Education in Giza has announced the October exam schedule for secondary students, starting on October 20 and covering all core subjects.',
      },
      image: '/images/news/october-exam.png',
      link: 'https://m2.youm7.com/story/2025/10/20/7164963',
      zoomable: true,
    },
    {
      id: '3',
      slug: 'quran-recitation-competition-2025',
      title: {
        ar: 'مسابقة القرآن الكريم',
        en: 'Quran Recitation Competition',
      },
      date: '2025-11-03',
      content: {
        ar: 'تُقام مسابقة القرآن الكريم بمدرسة الشهيد أبو دهب بنين في تمام الساعة الثامنة والنصف صباحًا، لمدة أربعة أيام من الإثنين ٣ نوفمبر حتى الخميس ٦ نوفمبر، وتشمل المدارس الحكومية والخاصة.',
        en: 'The Quran Recitation Competition will be held at El-Shaheed Abu Dahab Boys School at 8:30 AM, running for four days from Monday, November 3 to Thursday, November 6, for both public and private schools.',
      },
      image: '/images/news/quran.png',
      link: '',
      zoomable: true,
    },
  ];
};