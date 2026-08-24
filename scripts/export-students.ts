import 'dotenv/config';
import * as XLSX from 'xlsx';
import { getDb } from '../src/lib/firebase/admin';

async function main() {
  const db = getDb();
  const snap = await db.collection('students').get();
  console.log(`Loaded ${snap.size} students`);

  const rows = snap.docs.map(doc => {
    const d = doc.data();
    return {
      'الاسم': d.name ?? '',
      'الرقم القومي': d.nationalId ?? '',
      'الكود': d.code ?? '',
      'الصف': d.grade ?? '',
      'الشعبة': d.branch ?? '',
      'نوع الطالب': d.studentType ?? '',
      'اللغة الثانية': d.secondLang ?? '',
      'المسار': d.path ?? '',
      'المادة التخصصية': d.specialtySubject ?? '',
      'رقم الهاتف': d.phone ?? '',
      'رقم ولي الأمر': d.parentPhone ?? '',
      'المجموع': d.total ?? '',
    };
  });

  const ws = XLSX.utils.json_to_sheet(rows);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'الطلاب');

  const outPath = 'public/students-export-v3.xlsx';
  XLSX.writeFile(wb, outPath);
  console.log(`Exported to ${outPath}`);
}

main().catch(err => { console.error(err); process.exit(1); });
