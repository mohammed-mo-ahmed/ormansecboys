import 'dotenv/config';
import { getDb } from '../src/lib/firebase/admin';

async function main() {
  const db = getDb();
  const col = db.collection('students');
  const testNationalId = '29905011234567';
  const exists = await col.where('nationalId', '==', testNationalId).limit(1).get();
  if (!exists.empty) {
    await exists.docs[0].ref.delete();
    console.log('Deleted old:', exists.docs[0].id);
  }
  const doc = await col.add({
    nationalId: testNationalId,
    code: 'T002',
    name: 'طالب تجريبي تانية',
    grade: 'grade2',
    classroom: '2',
    seatNumber: '88',
    branch: null,
    studentType: null,
    secondLang: 'french',
    phone: '01022223333',
    parentPhone: '01033334444',
    path: null,
    specialtySubject: null,
    pathConfirmedAt: null,
    pathChosenAt: null,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  });
  console.log('Done! Doc ID:', doc.id);
}

main().catch(e => { console.error(e); process.exit(1); });
