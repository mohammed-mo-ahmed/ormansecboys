import { LocalizedString } from '@/shared/types/common';

export interface FAQItem {
  id: string;
  question: LocalizedString;
  answer: LocalizedString;
}

export interface Testimonial {
  id: string;
  name: LocalizedString;
  role: LocalizedString;
  content: LocalizedString;
  image: string;
}