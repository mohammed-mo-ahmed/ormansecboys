import type { LocalizedString } from '@/shared/types/common';

export interface Competition {
  id: string;
  title: LocalizedString;
  date: LocalizedString;
  status: LocalizedString;
}

export const getCompetitions = async (): Promise<Competition[]> => [
  {
    id: '1',
    title:  { ar: 'مسابقة جائزة الدولة للمبدع الصغير',  en: 'State Prize Competition for Young Creator' },
    date:   { ar: '31 ديسمبر 2025',                       en: '31 December 2025'                         },
    status: { ar: 'التسجيل مفتوح',                        en: 'Registration Open'                        },
  },
];