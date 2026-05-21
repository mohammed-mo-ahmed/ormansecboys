import type { LocalizedString } from '@/shared/types/common';

export interface LibrarySection {
  id: string;
  title: LocalizedString;
  desc: LocalizedString;
  icon: string;
}

export const getLibrarySections = async (): Promise<LibrarySection[]> => [
  { id: '1', title: { ar: 'الكتب العلمية',     en: 'Scientific Books'     }, desc: { ar: 'كتب في الفيزياء والكيمياء والأحياء',                   en: 'Books on physics, chemistry, and biology'                }, icon: '🔬' },
  { id: '2', title: { ar: 'الكتب الأدبية',     en: 'Literature Books'     }, desc: { ar: 'روايات، شعر، ومقالات أدبية',                          en: 'Novels, poetry, and literary essays'                     }, icon: '📖' },
  { id: '3', title: { ar: 'قسم التكنولوجيا',   en: 'Technology Section'   }, desc: { ar: 'كتب عن البرمجة، الإلكترونيات، والذكاء الاصطناعي',     en: 'Books on programming, electronics, and AI'               }, icon: '💻' },
  { id: '4', title: { ar: 'قسم اللغات',        en: 'Language Section'     }, desc: { ar: 'كتب لتعلم الإنجليزية والألمانية ولغات أخرى',          en: 'Books for learning English, German, and more'            }, icon: '🌍' },
  { id: '5', title: { ar: 'المراجع والموارد',  en: 'Reference Materials'  }, desc: { ar: 'كتب مرجعية، خرائط، ومواد متنوعة للطلاب',             en: 'Reference books, maps, and other resources for students' }, icon: '📂' },
  { id: '6', title: { ar: 'ركن القراءة الهادئة', en: 'Quiet Reading Corner' }, desc: { ar: 'مساحة مريحة للقراءة الفردية والاسترخاء',            en: 'A cozy space for personal reading and relaxation'        }, icon: '☕' },
];