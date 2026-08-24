import 'dotenv/config';
import { getDb } from '../src/lib/firebase/admin';

async function main() {
  const db = getDb();
  const snap = await db.collection('students')
    .where('grade', '==', 'grade2')
    .get();
  
  console.log(`Found ${snap.size} grade2 students in Firebase\n`);
  
  // ========== 1) DELETE DUPLICATES + FAKE STUDENT ==========
  console.log('===== 1) Deleting duplicate rows + fake student =====');
  
  // Wrong national IDs to delete (duplicate rows)
  const wrongNationalIds = [
    '31001155102658', // عمر احمد متولى اسماعيل
    '31004202104255', // زيدان محمد حلمى عبد الحميد
    '31006250103755', // محمد ناصر حسين احمد الجمل
    '31007250201991', // عصام محمد عبد المنعم محمد
    '31008312101653', // يوسف احمد عبد الرحيم سيد
    '31009012900593', // محمد جابر عبد الرضى عبده
    '31009143103817', // محمد عادل محمد عبد الفتاح
    '31010012107338', // احمد محمد صلاح على
  ];
  
  // Fake student
  const fakeId = 'SYN2000027';
  
  let deletedCount = 0;
  
  for (const doc of snap.docs) {
    const d = doc.data();
    const nationalId = String(d.nationalId || '').trim();
    
    if (wrongNationalIds.includes(nationalId) || nationalId === fakeId) {
      console.log(`Deleting: ${d.name} | ق.ق: ${nationalId} | كود: ${d.code}`);
      await doc.ref.delete();
      deletedCount++;
    }
  }
  
  console.log(`✅ Deleted ${deletedCount} rows\n`);
  
  // ========== 2) FIX 15 WRONG NATIONAL IDs ==========
  console.log('===== 2) Fixing 15 wrong national IDs =====');
  
  const nationalIdFixes = [
    { code: '470833853', wrong: '30911043100894', correct: '30911042100894' },
    { code: '471221735', wrong: '31005031201194', correct: '31005032101194' },
    { code: '463107768', wrong: '31012250605196', correct: '31012250601596' },
    { code: '471707745', wrong: '31005278100555', correct: '31005278800555' },
    { code: '472668723', wrong: '31102280400459', correct: '31102280500459' },
    { code: '471167331', wrong: '31005156106199', correct: '31005151606199' },
    { code: '471465648', wrong: '31002092100479', correct: '31012092100479' },
    { code: '473303413', wrong: '31003202102938', correct: '31003252102938' },
    { code: '473250342', wrong: '31104013104039', correct: '31104012104039' },
    { code: '474113146', wrong: '30113280600212', correct: '31103280600212' },
    { code: '472920185', wrong: '31003082101099', correct: '31002082101099' },
    { code: '477586681', wrong: '31012182101671', correct: '31012082101671' },
    { code: '468240347', wrong: '30911101201151', correct: '30911102101151' },
    { code: '470242735', wrong: '31004053100953', correct: '31004052100953' },
    { code: '472084639', wrong: '30915172100954', correct: '30910172100954' },
  ];
  
  // Re-fetch after deletions
  const snap2 = await db.collection('students')
    .where('grade', '==', 'grade2')
    .get();
  
  let fixedNidCount = 0;
  
  for (const fix of nationalIdFixes) {
    const doc = snap2.docs.find(d => String(d.data().code || '').trim() === fix.code);
    if (doc) {
      console.log(`Fixing NID: ${doc.data().name} | ${fix.wrong} → ${fix.correct}`);
      await doc.ref.update({ nationalId: fix.correct });
      fixedNidCount++;
    } else {
      console.log(`⚠️ Not found: code ${fix.code}`);
    }
  }
  
  console.log(`✅ Fixed ${fixedNidCount} national IDs\n`);
  
  // ========== 3) FIX 2 SWAPPED CODES ==========
  console.log('===== 3) Fixing 2 swapped codes =====');
  
  // Find the two students by their current (wrong) codes
  const snap3 = await db.collection('students')
    .where('grade', '==', 'grade2')
    .get();
  
  const doc1 = snap3.docs.find(d => String(d.data().code || '').trim() === '468132537');
  const doc2 = snap3.docs.find(d => String(d.data().code || '').trim() === '468785327');
  
  if (doc1 && doc2) {
    const name1 = doc1.data().name;
    const name2 = doc2.data().name;
    const nid1 = doc1.data().nationalId;
    const nid2 = doc2.data().nationalId;
    
    console.log(`Swapping codes between:`);
    console.log(`  ${name1} (ق.ق: ${nid1}) | كود: 468132537 → 468785327`);
    console.log(`  ${name2} (ق.ق: ${nid2}) | كود: 468785327 → 468132537`);
    
    // Use a temp code to avoid collision
    await doc1.ref.update({ code: 'TEMP_SWAP' });
    await doc2.ref.update({ code: '468132537' });
    await doc1.ref.update({ code: '468785327' });
    
    console.log(`✅ Codes swapped\n`);
  } else {
    console.log(`⚠️ Could not find both students to swap codes\n`);
  }
  
  // ========== 4) ADD MISSING STUDENT ==========
  console.log('===== 4) Adding missing student =====');
  
  const missingStudent = {
    name: 'ادهم معز حسن محمود',
    nationalId: '30609092101753',
    code: '458055360',
    grade: 'grade2',
    branch: '',
    studentType: 'منتظم',
    secondLang: '',
    path: '',
    specialtySubject: '',
    phone: '',
    parentPhone: '',
    total: '',
  };
  
  // Check if already exists
  const existsCheck = await db.collection('students')
    .where('code', '==', '458055360')
    .get();
  
  if (existsCheck.empty) {
    await db.collection('students').add(missingStudent);
    console.log(`✅ Added: ${missingStudent.name} | ق.ق: ${missingStudent.nationalId} | كود: ${missingStudent.code}\n`);
  } else {
    console.log(`⚠️ Student already exists, skipping\n`);
  }
  
  // ========== 5) FIX 5 EMPTY LANGUAGE FIELDS ==========
  console.log('===== 5) Fixing 5 empty language fields =====');
  
  const langFixes = [
    { name: 'محمود السيد محمد على', secondLang: 'م' },
    { name: 'عبد الرحمن احمد فوزى الششتاوى', secondLang: 'م' },
    { name: 'مازن محمد مختار سيد', secondLang: 'م' },
    { name: 'عمر مصطفى عبد المنعم طه', secondLang: 'م' },
    { name: 'احمد حسنى محمد احمد', secondLang: 'م' },
  ];
  
  const snap5 = await db.collection('students')
    .where('grade', '==', 'grade2')
    .get();
  
  let fixedLangCount = 0;
  
  for (const fix of langFixes) {
    const doc = snap5.docs.find(d => d.data().name === fix.name);
    if (doc) {
      console.log(`Fixing lang: ${fix.name} | فارغ → ${fix.secondLang}`);
      await doc.ref.update({ secondLang: fix.secondLang });
      fixedLangCount++;
    } else {
      console.log(`⚠️ Not found: ${fix.name}`);
    }
  }
  
  console.log(`✅ Fixed ${fixedLangCount} language fields\n`);
  
  // ========== SUMMARY ==========
  console.log('===== SUMMARY =====');
  console.log(`Deleted: ${deletedCount} rows (8 duplicates + 1 fake)`);
  console.log(`Fixed national IDs: ${fixedNidCount}`);
  console.log(`Swapped codes: ${doc1 && doc2 ? 2 : 0}`);
  console.log(`Added missing student: 1`);
  console.log(`Fixed languages: ${fixedLangCount}`);
}

main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
