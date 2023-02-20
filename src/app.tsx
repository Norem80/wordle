import './app.css';
import { useEffect, useState } from 'preact/hooks';
import { getMessage } from './lib/firebase';

export function App() {
  const [message, setMessage] = useState('Hello from Vite');

  useEffect(() => {
    async function fetchData() {
      const data = await getMessage();
      setMessage(data[0].message);
    }

    fetchData();
  }, []);

  return <h1>{message}</h1>;
}
