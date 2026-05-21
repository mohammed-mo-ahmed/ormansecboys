import { LocalizedString } from '@/shared/types/common';

export interface Teacher {
  id: string; // ✅ جديد — للـ route /about/teachers/[id]
  name: LocalizedString;
  subject: LocalizedString;
  image: string;
}