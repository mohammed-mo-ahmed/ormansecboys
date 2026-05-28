// src/features/student/services/sheets.service.ts
// ✅ بيجيب بيانات الطالب من Google Sheets (Published as CSV)
// الشيت لازم يكون: File → Share → Publish to web → CSV

export interface StudentData {
  nationalId:  string; // رقم قومي
  name:        string; // الاسم
  grade:       string; // الصف (أول / ثاني / ثالث ثانوي)
  classroom:   string; // الفصل
  seatNumber:  string; // رقم الجلوس
  branch?:     string; // الشعبة (علمي / أدبي) - للصف الثاني
  message?:    string; // خانة الرسائل
  subjects:    SubjectGrade[];
  totalGrade:  number; // المجموع الكلي للطالب
  maxTotal:    number; // المجموع الكلي النهائي للمواد
  percentage:  number; // النسبة المئوية
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
  // 0: national_id | 1: name | 2: grade | 3: classroom | 4: seat_number | 5: branch | 6: message
  // المواد (من 7 فما فوق حسب الصف والشعبة)
  const students: StudentData[] = rows.map(row => {
    const cols = row.split(',').map(c => c.trim().replace(/^"|"$/g, ''));

    const nationalId = cols[0] ?? '';
    const name = cols[1] ?? '';
    const grade = cols[2] ?? '';
    const classroom = cols[3] ?? '';
    const seatNumber = cols[4] ?? '';
    const branch = cols[5] ?? '';
    const message = cols[6] ?? '';

    let subjects: SubjectGrade[] = [];

    // تحديد المواد بناءً على الصف والشعبة
    if (grade.includes('أول') || grade.includes('1')) {
      subjects = [
        { subject: 'اللغة العربية', grade: Number(cols[7]) || 0, max: 80 },
        { subject: 'اللغة الأجنبية الأولى', grade: Number(cols[8]) || 0, max: 60 },
        { subject: 'علوم متكاملة', grade: Number(cols[9]) || 0, max: 60 },
        { subject: 'التاريخ', grade: Number(cols[10]) || 0, max: 40 },
        { subject: 'الفلسفة والمنطق', grade: Number(cols[11]) || 0, max: 40 },
        { subject: 'الرياضيات', grade: Number(cols[12]) || 0, max: 80 },
      ];
    } else if (grade.includes('ثاني') || grade.includes('2')) {
      if (branch.includes('علمي')) {
        subjects = [
          { subject: 'اللغة العربية', grade: Number(cols[7]) || 0, max: 80 },
          { subject: 'اللغة الأجنبية الأولى', grade: Number(cols[8]) || 0, max: 60 },
          { subject: 'الكيمياء', grade: Number(cols[9]) || 0, max: 60 },
          { subject: 'الأحياء', grade: Number(cols[10]) || 0, max: 60 },
          { subject: 'الفيزياء', grade: Number(cols[11]) || 0, max: 60 },
          { subject: 'الرياضيات', grade: Number(cols[12]) || 0, max: 80 },
        ];
      } else if (branch.includes('أدبي')) {
        subjects = [
          { subject: 'اللغة العربية', grade: Number(cols[7]) || 0, max: 80 },
          { subject: 'اللغة الأجنبية الأولى', grade: Number(cols[8]) || 0, max: 60 },
          { subject: 'الجغرافيا', grade: Number(cols[9]) || 0, max: 60 },
          { subject: 'التاريخ', grade: Number(cols[10]) || 0, max: 60 },
          { subject: 'علم النفس', grade: Number(cols[11]) || 0, max: 60 },
          { subject: 'الرياضيات', grade: Number(cols[12]) || 0, max: 80 },
        ];
      }
    }

    const totalGrade = subjects.reduce((sum, s) => sum + s.grade, 0);
    const maxTotal = subjects.reduce((sum, s) => sum + s.max, 0);
    const percentage = maxTotal > 0 ? (totalGrade / maxTotal) * 100 : 0;

    return {
      nationalId,
      name,
      grade,
      classroom,
      seatNumber,
      branch,
      message,
      subjects,
      totalGrade,
      maxTotal,
      percentage
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