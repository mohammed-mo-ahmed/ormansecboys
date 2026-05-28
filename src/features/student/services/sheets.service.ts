// src/features/student/services/sheets.service.ts
// ✅ بيجيب بيانات الطالب من Google Sheets (Published as CSV)
// الشيت لازم يكون: File → Share → Publish to web → CSV

export interface StudentData {
  nationalId:  string; // رقم قومي
  name:        string; // الاسم
  grade:       string; // الصف (أول / ثاني / ثالث ثانوي)
  classroom:   string; // الفصل
  seatNumber:  string; // رقم الجلوس
  subjects:    SubjectGrade[];
}

export interface SubjectGrade {
  subject: string;
  grade:   number;
  max:     number;
}

// ✅ استبدل الـ SHEET_ID بـ ID الشيت بتاعك
// الرابط بيكون: https://docs.google.com/spreadsheets/d/SHEET_ID/...
const SHEET_CSV_URL = process.env.NEXT_PUBLIC_GOOGLE_SHEET_CSV_URL ?? '';

let cache: StudentData[] | null = null;
let cacheTime = 0;
const CACHE_TTL = 5 * 60 * 1000; // 5 دقايق

export const fetchAllStudents = async (): Promise<StudentData[]> => {
  // ✅ Cache عشان ما نعملش request كل مرة
  if (cache && Date.now() - cacheTime < CACHE_TTL) return cache;

  const res = await fetch(SHEET_CSV_URL, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch sheet');

  const text = await res.text();
  const rows = text.trim().split('\n').slice(1); // احذف أول سطر (headers)

  // ✅ الـ columns المتوقعة في الشيت (بالترتيب):
  // national_id | name | grade | classroom | seat_number | math | arabic | english | physics | chemistry | biology | history | geography | philosophy
  const students: StudentData[] = rows.map(row => {
    const cols = row.split(',').map(c => c.trim().replace(/^"|"$/g, ''));

    return {
      nationalId: cols[0] ?? '',
      name:       cols[1] ?? '',
      grade:      cols[2] ?? '',
      classroom:  cols[3] ?? '',
      seatNumber: cols[4] ?? '',
      subjects: [
        { subject: 'الرياضيات',         grade: Number(cols[5])  || 0, max: 100 },
        { subject: 'اللغة العربية',      grade: Number(cols[6])  || 0, max: 100 },
        { subject: 'اللغة الإنجليزية',   grade: Number(cols[7])  || 0, max: 100 },
        { subject: 'الفيزياء',           grade: Number(cols[8])  || 0, max: 100 },
        { subject: 'الكيمياء',           grade: Number(cols[9])  || 0, max: 100 },
        { subject: 'الأحياء',            grade: Number(cols[10]) || 0, max: 100 },
        { subject: 'التاريخ',            grade: Number(cols[11]) || 0, max: 100 },
        { subject: 'الجغرافيا',          grade: Number(cols[12]) || 0, max: 100 },
        { subject: 'الفلسفة',            grade: Number(cols[13]) || 0, max: 100 },
      ].filter(s => s.grade > 0), // اعرض بس المواد اللي عندها درجة
    };
  }).filter(s => s.nationalId !== '');

  cache = students;
  cacheTime = Date.now();
  return students;
};

export const findStudentByNationalId = async (
  nationalId: string,
): Promise<StudentData | null> => {
  const students = await fetchAllStudents();
  return students.find(s => s.nationalId === nationalId.trim()) ?? null;
};