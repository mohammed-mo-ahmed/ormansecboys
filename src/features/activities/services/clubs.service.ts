import type { LocalizedString } from '@/shared/types/common';

export interface Club {
  id: string;
  name: LocalizedString;
  description: LocalizedString;
  icon: string;
}

export const getClubs = async (): Promise<Club[]> => [
  { id: '1', name: { ar: 'نادي البرمجة والإلكترونيات', en: 'Programming & Electronics Club' }, description: { ar: 'تطوير التطبيقات والمشاريع الإلكترونية', en: 'Application and hardware projects development' }, icon: '💻' },
  { id: '2', name: { ar: 'نادي الرياضيات',             en: 'Math Club'                       }, description: { ar: 'حل المسائل والمنافسات',                  en: 'Problem solving and competitions'           }, icon: '📐' },
  { id: '3', name: { ar: 'نادي الفيزياء',              en: 'Physics Club'                    }, description: { ar: 'حل المسائل والمنافسات',                  en: 'Problem solving and competitions'           }, icon: '⚛️' },
  { id: '4', name: { ar: 'نادي الشطرنج',               en: 'Chess Club'                      }, description: { ar: 'الاستراتيجية والتفكير المنطقي',           en: 'Strategy and logical thinking'             }, icon: '♟️' },
  { id: '5', name: { ar: 'نادي القراءة',               en: 'Reading Club'                    }, description: { ar: 'نادي يهتم بقراءة الكتب ومناقشتها',       en: 'A club focused on reading and discussing books' }, icon: '📖' },
  { id: '6', name: { ar: 'نادي الفنون',                en: 'Arts Club'                       }, description: { ar: 'الرسم والتصميم الإبداعي',                 en: 'Drawing and creative design'                }, icon: '🎨' },
  { id: '7', name: { ar: 'نادي الموسيقى',              en: 'Music Club'                      }, description: { ar: 'العزف والإنشاد',                          en: 'Playing instruments and singing'            }, icon: '🎵' },
];