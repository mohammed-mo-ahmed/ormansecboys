import { LocalizedString } from '@/shared/types/common';

export interface AlumniStory {
  id: string;
  name: LocalizedString;
  achievement: LocalizedString;
  image: string;
  link: LocalizedString;
}