import 'dotenv/config';
import { getDb } from '../src/lib/firebase/admin';

async function main() {
  const db = getDb();
  const col = db.collection('students');
  const snap = await col.where('nationalId', '==', '29905011234567').limit(1).get();
  if (snap.empty) {
    console.log('Not found');
    return;
  }
  await snap.docs[0].ref.delete();
  console.log('Deleted:', snap.docs[0].id);
}

main().catch(e => { console.error(e); process.exit(1); });
