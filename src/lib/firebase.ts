import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  getDocs,
  getCount,
  getDoc,
  doc,
  query,
  where
} from 'firebase/firestore/lite';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID
};

initializeApp(firebaseConfig);

const db = getFirestore();

export interface WordModel {
  word: string;
}

export async function getRandomWord() {
  const wordsCollection = collection(db, 'words');
  const countSnapshot = await getCount(wordsCollection);
  const wordsCount = countSnapshot.data().count;

  const randomWordId = Math.floor(Math.random() * (wordsCount - 1));

  const randomWordDoc = await getDoc(doc(db, 'words', `${randomWordId}`));
  const randomWordData = randomWordDoc.data() as WordModel | undefined;

  if (randomWordData) return randomWordData.word;
  return '';
}

export async function isValidWord(word: string) {
  const wordsCollection = collection(db, 'words');

  const wordQuery = query(wordsCollection, where('word', '==', word.toLowerCase()));
  const wordDoc = await getDocs(wordQuery);
  return wordDoc.size > 0;
}

if (import.meta.vitest) {
  const { it, expect, describe } = import.meta.vitest;

  const randomWord = await getRandomWord();

  describe('Firebase', () => {
    it('randomWord is not empty', () => {
      expect(randomWord).toBeTruthy();
    });

    it('randomWord is valid word', async () => {
      expect(await isValidWord(randomWord)).toBe(true);
    });

    it('word not from the list is not valid', async () => {
      expect(await isValidWord('notValid')).toBe(false);
    });
  });
}
