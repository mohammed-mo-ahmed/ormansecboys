export type Locale = 'ar' | 'en';

/** مشترك بين كل الـ features */
export interface LocalizedString {
  ar: string;
  en: string;
}

export interface ApiResponse<T> {
  data: T;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}