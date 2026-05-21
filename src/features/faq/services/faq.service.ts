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
    name:    { ar: 'أحمد محمد',   en: 'Ahmed Mohamed' },
    role:    { ar: 'طالب - الصف الثالث', en: 'Student - Grade 3' },
    content: {
      ar: 'المدرسة وفرت لي بيئة تعليمية ممتازة ساعدتني على تطوير مهاراتي الأكاديمية والقيادية. المعلمون متميزون والمرافق حديثة.',
      en: 'The school provided me with an excellent learning environment that helped develop my academic and leadership skills. Teachers are outstanding and facilities are modern.',
    },
    image: '',
  },
  {
    id: '2',
    name:    { ar: 'فاطمة حسن',  en: 'Fatma Hassan' },
    role:    { ar: 'ولية أمر',   en: 'Parent' },
    content: {
      ar: 'أنا سعيدة جداً بمستوى التعليم والاهتمام الذي يحصل عليه ابني. المدرسة تهتم بالجانب الأكاديمي والأخلاقي على حد سواء.',
      en: 'I am very pleased with the level of education and attention my son receives. The school cares about both academic and moral aspects equally.',
    },
    image: '',
  },
  {
    id: '3',
    name:    { ar: 'د. محمود علي',     en: 'Dr. Mahmoud Ali' },
    role:    { ar: 'معلم - رياضيات', en: 'Teacher - Mathematics' },
    content: {
      ar: 'العمل في مدرسة الأورمان تجربة رائعة. الإدارة داعمة والطلاب متحمسون للتعلم. أشعر بالفخر لكوني جزء من هذه المؤسسة.',
      en: 'Working at Al-Orman School is a wonderful experience. Management is supportive and students are eager to learn. I am proud to be part of this institution.',
    },
    image: '',
  },
];