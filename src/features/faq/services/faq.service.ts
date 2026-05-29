// ✅ Content data منفصل عن الـ UI
// النصوص ده content مش UI labels — عشان كده هنا مش في ar.json
import type { FAQItem, Testimonial } from '../types/faq.types';

export const getFAQItems = async (): Promise<FAQItem[]> => [
  {
    id: '1',
    question: {
      ar: 'ما هي شروط القبول في المدرسة؟',
      en: 'What are the admission requirements?',
    },
    answer: {
      ar: 'يجب أن يكون الطالب حاصلاً على شهادة إتمام المرحلة الإعدادية بمجموع لا يقل عن 225، واجتياز المقابلة الشخصية والكشف الطبي.',
      en: 'Students must have completed preparatory education with a minimum average of 85%, and pass a personal interview and medical examination.',
    },
  },
  {
    id: '2',
    question: {
      ar: 'ما هي الإدارة التعليمية التابعة لها المدرسة؟',
      en: 'What educational administration does the school belong to?',
    },
    answer: {
      ar: 'الإدارة التعليمية التابعة لها المدرسة هي إدارة الدقي.',
      en: 'The school is affiliated with the Dokki Educational Administration.',
    },
  },
  {
    id: '3',
    question: {
      ar: 'ما هي تكاليف الدراسة؟',
      en: 'What are the tuition fees?',
    },
    answer: {
      ar: 'تختلف الرسوم حسب البرنامج الدراسي. يرجى التواصل مع إدارة المدرسة للحصول على معلومات مفصلة.',
      en: 'Fees vary according to the academic program. Please contact the school administration for detailed information.',
    },
  },
  {
    id: '4',
    question: {
      ar: 'ما هي مواعيد الدراسة؟',
      en: 'What are the school hours?',
    },
    answer: {
      ar: 'تبدأ الدراسة من الساعة 7:30 صباحاً حتى 1:00 مساءً.',
      en: 'School starts at 7:30 AM and ends at 1:00 PM.',
    },
  },
  {
    id: '5',
    question: {
      ar: 'هل يمكن للطلاب المشاركة في الأنشطة الرياضية؟',
      en: 'Can students participate in sports activities?',
    },
    answer: {
      ar: 'بالتأكيد، نشجع جميع الطلاب على المشاركة في الأنشطة الرياضية المتنوعة.',
      en: 'Absolutely, we encourage all students to participate in various sports activities.',
    },
  },
];

export const getTestimonials = async (): Promise<Testimonial[]> => [
  {
  id: '1',
  name:    { ar: 'يوسف أحمد',   en: 'Youssef Ahmed' },
  role:    { ar: 'طالب (اتحاد الطلاب)', en: 'Student (Student Union)' },
  content: {
    ar: 'الشكر كله لمدرسين المدرسة الكبار زي مستر عبد اللطيف مكاوي في الرياضة ومستر إسلام محسن في الإنجليزي.. تعبوا معانا وقدموا مراجعات متميزة سهلت علينا المنهج',
    en: 'All thanks to the great school teachers such as Mr. Abdel Latif Makawi in Mathematics and Mr. Islam Mohsen in English. They worked hard with us and provided outstanding revision sessions that made the curriculum much easier.',
  },
  image: '/images/teachers/unknown.jpg',
},
{
  id: '2',
  name:    { ar: 'ميادة محسن',  en: 'Mayada Mohsen' },
  role:    { ar: 'ولية أمر',   en: 'Parent' },
  content: {
    ar: 'المدرسة ممتازة وملتزمة جداً بالتعليمات والضوابط، وبتلتزم بكثافة محددة وهي 45 طالباً فقط في الفصل لضمان استيعاب الطلاب ومصلحتهم',
    en: 'The school is excellent and highly committed to rules and regulations. It also maintains a limited class size of only 45 students per classroom to ensure better understanding and the students’ best interest.',
  },
  image: '/images/teachers/unknown.jpg',
},
{
  id: '3',
  name:    { ar: 'مينا مكرم',     en: 'Mina Makram' },
  role:    { ar: 'خريج المدرسة', en: 'School Graduate' },
  content: {
    ar: 'مدرسة الأورمان العسكرية مدرسة عريقة تخرّج منها رجال.. الانضباط العسكري فيها بيعلم الطالب الالتزام والاعتماد على النفس من صغره',
    en: 'Al-Orman Military School is a prestigious institution that has graduated generations of strong men. Its military discipline teaches students commitment and self-reliance from an early age.',
  },
  image: '/images/teachers/unknown.jpg',
},
];