export interface ParsedDate {
  date: string;  // 'YYYY-MM-DD' أو 'YYYY'
  year: number;
  month: number; // 0 إذا غير معروف
  day: number;   // 0 إذا غير معروف
  sortKey: number;
}

const AR_MONTHS = [
  'يناير',
  'فبراير',
  'مارس',
  'أبريل',
  'مايو',
  'يونيو',
  'يوليو',
  'أغسطس',
  'سبتمبر',
  'أكتوبر',
  'نوفمبر',
  'ديسمبر',
];

const EN_MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const pad = (value: number) => String(value).padStart(2, '0');

/** يقرأ التاريخ من اسم الملف: "2026-04-20 (3).jpg" أو "2011-00-00.jpg" (سنة فقط) */
export function parseFileDate(fileName: string): ParsedDate | null {
  const match = fileName.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (!match) return null;

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);

  const hasDay = day > 0;

  return {
    date: hasDay
      ? `${year}-${pad(month)}-${pad(day)}`
      : `${year}`,
    year,
    month: month > 0 ? month : 0,
    day: hasDay ? day : 0,
    sortKey: year * 10000 + Math.max(month, 0) * 100 + Math.max(day, 0),
  };
}

/** تاريخ حسب اللغة: "6 أكتوبر 2026" / "6 October 2026" — والسنة فقط تعرض "2011" */
export function formatGalleryDate(
  date: string | undefined,
  locale: 'ar' | 'en' = 'ar',
): string {
  if (!date) return '';

  const [y, mo, d] = date.split('-');
  const year = Number(y);
  const month = Number(mo || 0);
  const day = Number(d || 0);

  if (!month || !day) return String(year);

  const monthName = (locale === 'en' ? EN_MONTHS : AR_MONTHS)[month - 1] ?? '';
  return `${day} ${monthName} ${year}`;
}