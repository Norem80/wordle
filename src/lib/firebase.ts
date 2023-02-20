import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID
};

initializeApp(firebaseConfig);

const db = getFirestore();

export async function getMessage() {
  const wordsCollection = collection(db, 'test');
  const wordsSnapshot = await getDocs(wordsCollection);
  const wordsList = wordsSnapshot.docs.map((doc) => doc.data());

  return wordsList;
}
