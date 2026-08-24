import 'dotenv/config';
import { getDb } from '../src/lib/firebase/admin';

async function main() {
  const db = getDb();
  
  console.log('Fetching home students (studentType = "منازل")...');
  const snapshot = await db.collection('students')
    .where('studentType', '==', 'منازل')
    .get();
  
  console.log(`Found ${snapshot.size} home students`);
  
  if (snapshot.size === 0) {
    console.log('No home students to delete');
    return;
  }
  
  // Show first few students
  console.log('\nFirst 10 students:');
  snapshot.docs.slice(0, 10).forEach((doc, i) => {
    const d = doc.data();
    console.log(`${i + 1}. ${d.name} | كود: ${d.code} | الصف: ${d.grade}`);
  });
  
  // Delete in batches
  let batch = db.batch();
  let count = 0;
  
  for (const doc of snapshot.docs) {
    batch.delete(doc.ref);
    count++;
    
    // Firestore batch limit is 500
    if (count % 500 === 0) {
      await batch.commit();
      console.log(`Deleted ${count} students...`);
      batch = db.batch();
    }
  }
  
  // Commit remaining
  if (count % 500 !== 0) {
    await batch.commit();
  }
  
  console.log(`\n✅ Successfully deleted ${count} home students`);
}

main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
