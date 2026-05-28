// src/features/student/services/sheets.service.ts
// ✅ بيجيب بيانات الطالب من Google Sheets (Published as CSV)
// الشيت لازم يكون: File → Share → Publish to web → CSV

export interface StudentData {
  nationalId:  string; // رقم قومي
  name:        string; // الاسم
  grade:       string; // الصف (أول / ثاني / ثالث ثانوي)
  classroom:   string; // الفصل
  seatNumber:  string; // رقم الجلوس
  branch?:     string; // الشعبة (1: علمي / 2: أدبي)
  message?:    string; // خانة الرسائل
  subjects:    SubjectGrade[];
  nonTotalSubjects: SubjectGrade[]; // مواد غير مضافة للمجموع
  totalGrade:  number; // المجموع الكلي للطالب
  maxTotal:    number; // المجموع الكلي النهائي للمواد
  percentage:  number; // النسبة المئوية
}

export interface SubjectGrade {
  id:      string; // معرف المادة للترجمة
  subject: string; // اسم المادة بالعربي
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
  // 0: national_id | 1: name | 2: grade | 3: classroom | 4: seat_number | 5: branch (1:علمي، 2:أدبي) | 6: message
  // المواد المضافة للمجموع (7-12)
  // المواد غير المضافة للمجموع (13-17)
  // 18: اسم اللغة الأجنبية الثانية (ألماني، فرنساوي، إلخ)
  const students: StudentData[] = rows.map(row => {
    const cols = row.split(',').map(c => c.trim().replace(/^"|"$/g, ''));

    const nationalId = cols[0] ?? '';
    const name = cols[1] ?? '';
    const grade = cols[2] ?? '';
    const classroom = cols[3] ?? '';
    const seatNumber = cols[4] ?? '';
    const branchCode = cols[5] ?? '';
    let message = cols[6] ?? '';
    const secondLangCode = cols[18] ?? '';

    let subjects: SubjectGrade[] = [];
    let nonTotalSubjects: SubjectGrade[] = [];

    // تحويل رمز الشعبة
    const branch = branchCode === '1' ? 'علمي' : branchCode === '2' ? 'أدبي' : '';

    // تحويل رمز اللغة الثانية
    const secondLangId = 
      secondLangCode === '1' ? 'french' : 
      secondLangCode === '2' ? 'german' : 
      secondLangCode === '3' ? 'italian' : 
      secondLangCode === '4' ? 'spanish' : 'english2';

    // تحديد المواد بناءً على الصف والشعبة
    if (grade.includes('أول') || grade.includes('1')) {
      subjects = [
        { id: 'arabic', subject: 'اللغة العربية', grade: Number(cols[7]) || 0, max: 80 },
        { id: 'english1', subject: 'اللغة الأجنبية الأولى', grade: Number(cols[8]) || 0, max: 60 },
        { id: 'integrated_science', subject: 'علوم متكاملة', grade: Number(cols[9]) || 0, max: 60 },
        { id: 'history', subject: 'التاريخ', grade: Number(cols[10]) || 0, max: 40 },
        { id: 'philosophy', subject: 'الفلسفة والمنطق', grade: Number(cols[11]) || 0, max: 40 },
        { id: 'math', subject: 'الرياضيات', grade: Number(cols[12]) || 0, max: 80 },
      ];
    } else if (grade.includes('ثاني') || grade.includes('2')) {
      if (branchCode === '1') { // علمي
        subjects = [
          { id: 'arabic', subject: 'اللغة العربية', grade: Number(cols[7]) || 0, max: 80 },
          { id: 'english1', subject: 'اللغة الأجنبية الأولى', grade: Number(cols[8]) || 0, max: 60 },
          { id: 'chemistry', subject: 'الكيمياء', grade: Number(cols[9]) || 0, max: 60 },
          { id: 'biology', subject: 'الأحياء', grade: Number(cols[10]) || 0, max: 60 },
          { id: 'physics', subject: 'الفيزياء', grade: Number(cols[11]) || 0, max: 60 },
          { id: 'math', subject: 'الرياضيات', grade: Number(cols[12]) || 0, max: 80 },
        ];
      } else if (branchCode === '2') { // أدبي
        subjects = [
          { id: 'arabic', subject: 'اللغة العربية', grade: Number(cols[7]) || 0, max: 80 },
          { id: 'english1', subject: 'اللغة الأجنبية الأولى', grade: Number(cols[8]) || 0, max: 60 },
          { id: 'geography', subject: 'الجغرافيا', grade: Number(cols[9]) || 0, max: 60 },
          { id: 'history', subject: 'التاريخ', grade: Number(cols[10]) || 0, max: 60 },
          { id: 'psychology', subject: 'علم النفس', grade: Number(cols[11]) || 0, max: 60 },
          { id: 'math', subject: 'الرياضيات', grade: Number(cols[12]) || 0, max: 80 },
        ];
      }
    }

    // مواد غير مضافة للمجموع (مشتركة)
    nonTotalSubjects = [
      { id: 'religion', subject: 'تربية دينية', grade: Number(cols[13]) || 0, max: 40 },
      { id: secondLangId, subject: 'لغة أجنبية ثانية', grade: Number(cols[14]) || 0, max: 40 },
      { id: 'sports', subject: 'تربية رياضية', grade: Number(cols[15]) || 0, max: 10 },
      { id: 'national_edu', subject: 'التربية الوطنية', grade: Number(cols[16]) || 0, max: 10 },
      { id: 'activity', subject: 'نشاط تربوي', grade: Number(cols[17]) || 0, max: 10 },
    ];

    const totalGrade = subjects.reduce((sum, s) => sum + s.grade, 0);
    const maxTotal = subjects.reduce((sum, s) => sum + s.max, 0);
    const percentage = maxTotal > 0 ? (totalGrade / maxTotal) * 100 : 0;

    // رسالة أوتوماتيكية للناجحين
    if (!message && percentage >= 50) {
      message = 'auto_congrats'; // سنقوم بترجمتها في ملفات i18n
    }

    return {
      nationalId,
      name,
      grade,
      classroom,
      seatNumber,
      branch,
      message,
      subjects,
      nonTotalSubjects,
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