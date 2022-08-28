import { useState } from 'react';
import TenBoard from './tenBoard';
import "./game.css";
import FifteenBoard from './fifteenBoard';
import TwentyBoard from './twentyBoard';


function Game({ gameType }: { gameType: string }) {

  const [words, setWords] = useState<string[]>();
  const [definitions, setDefinitions] = useState<string[]>();
  const [winner, setWinner] = useState(false);
  const [reset, setReset] = useState(false);

  return (
    <>
      {gameType === 'crosswords-10' && <TenBoard gameType={gameType} words={words} setWords={setWords} reset={reset} setDefinitions={setDefinitions} setWinner={setWinner} />}
      {gameType === 'crosswords-15' && <FifteenBoard gameType={gameType} words={words} setWords={setWords} reset={reset} setDefinitions={setDefinitions} setWinner={setWinner} />}
      {gameType === 'crosswords-20' && <TwentyBoard gameType={gameType} words={words} setWords={setWords} reset={reset} setDefinitions={setDefinitions} setWinner={setWinner} />}
      <ol className="definitions">
        <div className="controls">
          <h3>Clues</h3>
          <button className="controls-button" onClick={() => setReset(!reset)}>New Board</button>
        </div>
        {definitions && definitions.map((definition, index) => (
          <li key={index}>{definition}</li>
        ))}
      </ol>
      {winner && (
        <div className="overlay">
          <h1>You Win!</h1>
          <div className="pyro">
            <div className="before"></div>
            <div className="after"></div>
          </div>
        </div>
      )}
    </>
  );
}

export default Game;
