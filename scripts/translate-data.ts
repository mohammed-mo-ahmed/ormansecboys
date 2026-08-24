import 'dotenv/config';
import { getDb } from '../src/lib/firebase/admin';

async function main() {
  const db = getDb();
  
  // Mapping: English -> Arabic
  const gradeMap: Record<string, string> = {
    'grade1': 'أولى',
    'grade2': 'تانية',
    'grade3': 'تالتة',
  };
  
  const langMap: Record<string, string> = {
    'german': 'ألماني',
    'french': 'فرنسي',
    'italian': 'إيطالي',
    'spanish': 'إسباني',
  };
  
  const branchMap: Record<string, string> = {
    'adabi': 'أدبي',
  };
  
  const pathMap: Record<string, string> = {
    'engineering': 'هندسة',
    'medicine': 'طب',
    'arts': 'آداب',
    'business': 'تجارة',
  };
  
  const subjectMap: Record<string, string> = {
    'programming': 'برمجة',
    'physics': 'فيزياء',
    'chemistry': 'كيمياء',
    'math': 'رياضيات',
    'psychology': 'علم نفس',
    'secondLang': 'لغة ثانية',
    'businessAdmin': 'إدارة أعمال',
    'accounting': 'محاسبة',
  };
  
  // Fetch all students
  const snap = await db.collection('students').get();
  console.log(`Total students: ${snap.size}\n`);
  
  let updatedCount = 0;
  
  for (const doc of snap.docs) {
    const d = doc.data();
    const updates: Record<string, string> = {};
    
    // Grade
    if (d.grade && gradeMap[d.grade]) {
      updates.grade = gradeMap[d.grade];
    }
    
    // Language
    if (d.secondLang && langMap[d.secondLang]) {
      updates.secondLang = langMap[d.secondLang];
    }
    
    // Branch
    if (d.branch && branchMap[d.branch]) {
      updates.branch = branchMap[d.branch];
    }
    
    // Path
    if (d.path && pathMap[d.path]) {
      updates.path = pathMap[d.path];
    }
    
    // Specialty Subject
    if (d.specialtySubject && subjectMap[d.specialtySubject]) {
      updates.specialtySubject = subjectMap[d.specialtySubject];
    }
    
    // Apply updates
    if (Object.keys(updates).length > 0) {
      console.log(`Updating: ${d.name} | ${JSON.stringify(updates)}`);
      await doc.ref.update(updates);
      updatedCount++;
    }
  }
  
  console.log(`\n===== SUMMARY =====`);
  console.log(`Updated: ${updatedCount} students`);
}

main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
