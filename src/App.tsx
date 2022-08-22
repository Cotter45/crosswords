import { useState } from 'react';
import Game from './components/game';
import Nav from './components/nav';
import Splash from './components/splash';

function App() {
  const [gameOn, setGameOn] = useState(false);
  const [gameType, setGameType] = useState('crosswords-10');
  return (
    <>
      <Nav gameOn={gameOn} setGameOn={setGameOn} />
      <main className="main">
        {gameOn ? (
            <Game gameType={gameType} />
          ) : (
            <Splash setGameType={setGameType} setGameOn={setGameOn} />
          )}
      </main>
    </>
  );
}

export default App;
