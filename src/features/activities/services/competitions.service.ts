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
    title:  { ar: '',  en: '' },
    date:   { ar: '',                       en: ''                         },
    status: { ar: '',                        en: ''                        },
  },
];