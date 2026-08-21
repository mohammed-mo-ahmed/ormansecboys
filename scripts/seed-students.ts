// scripts/seed-students.ts
// سكريبت Seed للمطور فقط — يُشغَّل مرة واحدة لتحويل بيانات Excel/CSV إلى Firestore.
// بعد التشغيل، Firestore هو المصدر الوحيد للبيانات (Google Sheets غير مستخدم نهائيًا).
//
// الاستخدام:
//   SET / env: FIREBASE_PROJECT_ID + FIREBASE_CLIENT_EMAIL + FIREBASE_PRIVATE_KEY
//   npm run seed -- --file "scripts/data/الاورمان اولى صباحى.xlsx" --grade grade1
//
// العيوب (حقول ناقصة لا ترفض الطالب):
//   أي حقل مش موجود في الملف يُخزن null، والمديرة تملاه لاحقًا من شاشة التعديل.

import 'dotenv/config';
import * as XLSX from 'xlsx';
import { getDb } from '../src/lib/firebase/admin';
import { birthDateFromNationalId } from '../src/features/student/utils/nationalId';
import type { Grade } from '../src/features/student/types/student.types';

const args = process.argv.slice(2);

const fileArg =
  args.find(a => a.startsWith('--file='))?.split('=').slice(1).join('=') ??
  args[args.indexOf('--file') + 1];
const gradeArg =
  args.find(a => a.startsWith('--grade='))?.split('=').slice(1).join('=') ??
  args[args.indexOf('--grade') + 1];

if (!fileArg) {
  console.error('Usage: npm run seed -- --file "<path.xlsx|csv>" [--grade grade1|grade2|grade3]');
  process.exit(1);
}

const HEADER_ALIASES: Record<string, string[]> = {
  name: ['اسم الطالب', 'الاسم', 'الاسم بالكامل', 'name'],
  nationalId: ['الرقم القومى', 'الرقم القومي', 'nationalId', 'national_id'],
  code: ['كود الطالب', 'الكود', 'code', 'student_code'],
  classroom: ['الفصل', 'classroom', 'class'],
  seatNumber: ['رقم الجلوس', 'seatNumber', 'seat_number', 'seat'],
  grade: ['الصف', 'الصف الدراسي', 'grade'],
  branch: ['الشعبة', 'branch'],
  studentType: ['نوع الطالب', 'studentType', 'student_type'],
  secondLang: ['اللغة الثانية', 'اللغة الثانيه', 'secondLang', 'second_lang'],
  phone: ['رقم الهاتف', 'الهاتف', 'phone'],
  parentPhone: ['رقم ولي الامر', 'رقم ولي الأمر', 'parentPhone', 'parent_phone'],
  path: ['المسار', 'path'],
};

type Row = Record<string, unknown>;

function pick(row: Row, field: string): string | null {
  const keys = HEADER_ALIASES[field] ?? [field];
  for (const key of keys) {
    const value = row[key];
    if (value !== undefined && value !== null && String(value).trim() !== '') {
      return String(value).trim().replace(/\s+/g, ' ');
    }
  }
  return null;
}

function mapGrade(value: string | null, fallback: string | undefined): Grade {
  const v = (value ?? '').toLowerCase();
  if (/^(1|الاول|الاولى|أول|أولى|اولى|اول)$|^أول ثانوي/.test(v)) return 'grade1';
  if (/^(2|الثاني|ثاني)$|^ثانى|^ثاني/.test(v)) return 'grade2';
  if (/^(3|الثالث|ثالث)$|^ثالث/.test(v)) return 'grade3';
  if (fallback === 'grade1' || fallback === 'grade2' || fallback === 'grade3') return fallback;
  return 'grade1';
}

function mapBranch(value: string | null): string | null {
  const v = (value ?? '').trim();
  if (!v) return null;
  if (/أدبي|ادبي/.test(v)) return 'adabi';
  if (/علوم|science/.test(v)) return 'science';
  if (/رياضه|رياضة|math/.test(v)) return 'math';
  if (v === '1') return 'adabi';
  if (v === '2') return 'science';
  if (v === '3') return 'math';
  return null;
}

function mapSecondLang(value: string | null): string | null {
  const v = (value ?? '').trim().toLowerCase();
  if (/ألمان|المان|german|alm/.test(v)) return 'german';
  if (/فرنس|french|فر./.test(v)) return 'french';
  if (/إيطال|ايطال|italian|ital/.test(v)) return 'italian';
  if (/إسبان|اسبان|spain|spanish/.test(v)) return 'spanish';
  return null;
}

function mapPath(value: string | null): string | null {
  const v = (value ?? '').trim().toLowerCase();
  if (/طب|علوم حياة|medical|medicine/.test(v)) return 'medicine';
  if (/هندسه|هندسة|حاسب|engineering|computer/.test(v)) return 'engineering';
  if (/أعمال|اعمال|business|commerce/.test(v)) return 'business';
  if (/آداب|اداب|فنون|أدب|arts/.test(v)) return 'arts';
  return null;
}

function normalizeNationalId(value: string | null): string {
  if (!value) return '';
  const onlyDigits = value.replace(/\D/g, '');
  return onlyDigits.length === 14 ? onlyDigits : onlyDigits;
}

async function main() {
  const wb = XLSX.readFile(fileArg);
  const sheetName = wb.SheetNames[0];
  const rows = XLSX.utils.sheet_to_json<Row>(wb.Sheets[sheetName], { defval: null });

  const db = getDb();
  const collection = db.collection('students');

  let inserted = 0;
  let updated = 0;
  let skipped = 0;
  let warnings = 0;

  for (const row of rows) {
    const name = pick(row, 'name');
    if (!name || name === 'المجموع' || name === 'Total' || name === 'الإجمالي') {
      skipped++;
      continue;
    }

    const nationalId = normalizeNationalId(pick(row, 'nationalId'));
    if (!nationalId) {
      skipped++;
      console.warn(`Skipping student without national ID: "${name}"`);
      continue;
    }

    const exists = await collection.where('nationalId', '==', nationalId).limit(1).get();
    const data = {
      nationalId,
      code: pick(row, 'code'),
      name,
      grade: mapGrade(pick(row, 'grade'), gradeArg),
      classroom: pick(row, 'classroom'),
      seatNumber: pick(row, 'seatNumber'),
      branch: mapBranch(pick(row, 'branch')),
      studentType: pick(row, 'studentType'),
      secondLang: mapSecondLang(pick(row, 'secondLang')),
      phone: pick(row, 'phone'),
      parentPhone: pick(row, 'parentPhone'),
      path: mapPath(pick(row, 'path')),
      specialtySubject: null,
      pathConfirmedAt: null,
      pathChosenAt: null,
      updatedAt: Date.now(),
    };

    if (!birthDateFromNationalId(nationalId)) {
      warnings++;
      console.warn(`Invalid national ID format: "${nationalId}" for "${name}" — still inserted.`);
    }

    if (exists.empty) {
      await collection.add({ ...data, createdAt: Date.now() });
      inserted++;
    } else {
      const docId = exists.docs[0].id;
      const prevCreatedAt = exists.docs[0].data()?.createdAt ?? Date.now();
      await collection.doc(docId).set({ ...data, createdAt: prevCreatedAt }, { merge: true });
      updated++;
    }
  }

  console.log(`\nDone!\n  Inserted: ${inserted}\n  Updated: ${updated}\n  Skipped: ${skipped}${warnings ? `\n  Warnings: ${warnings}` : ''}`);
}

main().catch(err => {
  console.error('Seed failed:', err);
  process.exit(1);
});