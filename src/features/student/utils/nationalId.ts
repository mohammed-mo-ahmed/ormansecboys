// src/features/student/utils/nationalId.ts
// الرقم القومي المصري 14 رقم: [1] القرن، [2-3] السنة، [4-5] الشهر، [6-7] اليوم

export function isValidEgyptianNationalId(nid: string): boolean {
  if (!/^\d{14}$/.test(nid)) return false;

  const centuryCode = Number(nid[0]);
  if (centuryCode !== 2 && centuryCode !== 3) return false;

  const month = Number(nid.slice(3, 5));
  const day = Number(nid.slice(5, 7));
  if (month < 1 || month > 12 || day < 1 || day > 31) return false;

  const year = (centuryCode === 3 ? 2000 : 1900) + Number(nid.slice(1, 3));
  const date = new Date(Date.UTC(year, month - 1, day));
  return (
    date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day
  );
}

/** يحسب تاريخ الميلاد من الرقم القومي، يرجع "YYYY-MM-DD" أو null لو غير صالح */
export function birthDateFromNationalId(nid: string): string | null {
  if (!isValidEgyptianNationalId(nid)) return null;
  const centuryCode = Number(nid[0]);
  const year = (centuryCode === 3 ? 2000 : 1900) + Number(nid.slice(1, 3));
  const month = nid.slice(3, 5);
  const day = nid.slice(5, 7);
  return `${year}-${month}-${day}`;
}

/** تحويل تاريخ ISO إلى صيغة عرض محلية */
export function formatBirthDate(iso: string | null, locale: 'ar' | 'en' | string): string {
  if (!iso) return '—';
  const [y, m, d] = iso.split('-').map(Number);
  const date = new Date(Date.UTC(y, m - 1, d));
  return new Intl.DateTimeFormat(locale === 'ar' ? 'ar-EG' : 'en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}