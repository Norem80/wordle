import './app.css';
import { useEffect, useState } from 'preact/hooks';
import { getRandomWord } from './lib/firebase';

export function App() {
  const [message, setMessage] = useState('Hello from Vite');

  useEffect(() => {
    async function fetchData() {
      const data = await getRandomWord();
      setMessage(data);
    }

    fetchData();
  }, []);

  return <h1>{message}</h1>;
}
