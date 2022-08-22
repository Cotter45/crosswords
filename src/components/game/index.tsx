import { useState } from 'react';
import TenBoard from './tenBoard';
import "./game.css";


function Game({ gameType }: { gameType: string }) {

  const [words, setWords] = useState<string[]>();
  const [definitions, setDefinitions] = useState<string[]>();
  const [reset, setReset] = useState(false);

  return (
    <>
      {gameType === 'crosswords-10' && <TenBoard gameType={gameType} words={words} setWords={setWords} reset={reset} setDefinitions={setDefinitions} />}
      <ol className="definitions">
        {definitions && definitions.map((definition, index) => (
          <li key={index}>{definition}</li>
        ))}
      </ol>
    </>
  );
}

export default Game;
