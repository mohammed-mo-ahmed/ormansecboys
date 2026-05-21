import type { LocalizedString } from '@/shared/types/common';

export interface ResourceLink {
  id: string;
  name: LocalizedString;
  url: string;
  description: LocalizedString;
}

export const getResourceLinks = async (): Promise<ResourceLink[]> => [
  {
    id: '1',
    name: { ar: 'موقع الوزارة', en: 'Ministry Website' },
    url: 'https://moe.gov.eg/',
    description: { ar: 'وزارة التربية والتعليم والتعليم الفني', en: 'Ministry of Education and Technical Education' },
  },
  {
    id: '2',
    name: { ar: 'منصة مدرستنا PLUS', en: 'Madrasetna PLUS Platform' },
    url: 'https://madrasetnaplus.eg/sign-in',
    description: { ar: 'منصة تعليمية بتقدم تجربة جديدة في تقديم المحتوى التعليمي والترفيهي للطلاب في مصر', en: 'An educational platform that offers a new experience in providing educational and entertainment content to students in Egypt' },
  },
  {
    id: '3',
    name: { ar: 'المكتبة الإلكترونية', en: 'Electronic Library' },
    url: 'https://ellibrary.moe.gov.eg/',
    description: { ar: 'منصة شاملة لكل ما يحتاجه الطالب في رحلته التعليمية', en: 'A comprehensive platform for everything a student needs in their educational journey' },
  },
  {
    id: '4',
    name: { ar: 'التقييمات', en: 'Weekly Evaluations' },
    url: 'https://ellibrary.moe.gov.eg/cha/',
    description: { ar: 'التقييمات الأسبوعية والأداءات الصفية والواجبات المنزلية', en: 'Weekly evaluations, class performance, and homework' },
  },
  {
    id: '5',
    name: { ar: 'منصة البث المباشر', en: 'Live Broadcast Platform' },
    url: 'https://stream.moe.gov.eg/',
    description: { ar: 'منصة للتواصل المباشر بين المعلمين ذوي الخبرة والطلاب', en: 'A platform for direct communication between experienced teachers and students' },
  },
  {
    id: '6',
    name: { ar: 'منصة QUREO', en: 'QUREO Platform' },
    url: 'https://me-portal.qureo.education/login',
    description: { ar: 'منصة البرمجة للصف الأول الثانوي', en: 'Programming platform for the first year of secondary school' },
  },
  {
    id: '7',
    name: { ar: 'أكاديمية خان', en: 'Khan Academy' },
    url: 'https://www.khanacademy.org',
    description: { ar: 'دروس مجانية في جميع المواد', en: 'Free lessons in all subjects' },
  },
  {
    id: '8',
    name: { ar: 'إدراك', en: 'Edraak' },
    url: 'https://www.edraak.org',
    description: { ar: 'منصة تعليمية عربية', en: 'Arabic educational platform' },
  },
];