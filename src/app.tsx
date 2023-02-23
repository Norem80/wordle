import './app.css';
import { Board } from './components/board';
import { Header } from './components/header';
import { Keyboard } from './components/keyboard';

export function App() {
  return (
    <>
      <Header />
      <Board />
      <Keyboard />
    </>
  );
}
