import 'dotenv/config';
import * as XLSX from 'xlsx';
import { getDb } from '../src/lib/firebase/admin';

async function main() {
  const db = getDb();
  
  // Read comparison file
  const compPath = 'public/مقارنة_بيانات_الطلاب_الفعلية (1).xlsx';
  const compWb = XLSX.readFile(compPath);
  const compData = XLSX.utils.sheet_to_json(compWb.Sheets[compWb.SheetNames[0]]);
  
  // Filter name differences only
  const nameDiffs = compData.filter((row: any) => row['الحقل'] === 'الاسم');
  console.log(`Found ${nameDiffs.length} name differences to fix\n`);
  
  // Get unique national IDs
  const nationalIds = [...new Set(nameDiffs.map((row: any) => row['الرقم القومي 1']))];
  console.log(`Unique students to update: ${nationalIds.length}\n`);
  
  // Build map: nationalId -> correct name from file 1
  const nameMap: Record<string, string> = {};
  nameDiffs.forEach((row: any) => {
    const nid = row['الرقم القومي 1'];
    const correctName = row['قيمة 1']; // file 1 name
    if (nid && correctName) {
      nameMap[nid] = correctName;
    }
  });
  
  // Fetch all grade2 students from Firebase
  const snap = await db.collection('students')
    .where('grade', '==', 'grade2')
    .get();
  
  console.log(`Firebase grade2 students: ${snap.size}\n`);
  
  // Update names
  let updatedCount = 0;
  let notFoundCount = 0;
  
  for (const doc of snap.docs) {
    const d = doc.data();
    const nid = String(d.nationalId || '').trim();
    
    if (nameMap[nid]) {
      const oldName = d.name;
      const newName = nameMap[nid];
      
      if (oldName !== newName) {
        console.log(`Updating: ${nid}`);
        console.log(`  OLD: ${oldName}`);
        console.log(`  NEW: ${newName}`);
        
        await doc.ref.update({ name: newName });
        updatedCount++;
      }
    } else {
      notFoundCount++;
    }
  }
  
  console.log(`\n===== SUMMARY =====`);
  console.log(`Updated: ${updatedCount} students`);
  console.log(`Not found in Firebase: ${notFoundCount}`);
}

main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
