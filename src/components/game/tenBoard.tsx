import { useEffect, useState } from 'react';
import { createTenBoard } from '../../util/createBoard';

function TenBoard({ setDefinitions, setWords, reset, setWinner }: { gameType: string, words: string[] | undefined, setWords: (words: string[]) => void, reset: boolean, setDefinitions: (definitions: string[]) => void, setWinner: (winner: boolean) => void }) {

  const [grid, setGrid] = useState<string[][]>();
  const [indexes, setIndexes] = useState<any>();
  const [correct, setCorrect] = useState<number>(0);
  const [letterCount, setLetterCount] = useState<number>(0);

  useEffect(() => {
    const { board, definitions, words, indexes, letterCount } = createTenBoard(10);
    setWords(words);
    setIndexes(indexes);
    setGrid(board);
    setDefinitions(definitions);
    setLetterCount(letterCount);
  }, [setWords, reset, setDefinitions]);

  useEffect(() => {
    if (!indexes) return;
    if (correct !== letterCount) return;
    setWinner(true);
  } , [correct, indexes, letterCount, setWinner]);

  useEffect(() => {
    const inputs = document.querySelectorAll('.board-cell');
    for (let i = 0; i < inputs.length; i++) {
      inputs[i].innerHTML = '';
      inputs[i].classList.remove('correct');
      inputs[i].classList.remove('incorrect');
    }
  }, [reset])

  return (
    <div className="ten-board">
      {grid && grid.map((row, rowIndex) => (
        <div key={rowIndex} className="ten-board-row">
          {row.map((cell, cellIndex) => (
            <div key={cellIndex + 1} style={{ position: 'relative', width: '1fr' }}>
              <input 
                maxLength={1}
                disabled={!cell}
                type="text"
                autoComplete="off"
                onKeyDown={(e: any) => {
                  if (e.key === 'Tab') return;
                  if (e.currentTarget.classList.contains('correct')) return;
                  if (e.key === cell) {
                    setCorrect((state) => state + 1);
                    e.currentTarget.classList.add('correct');
                    e.currentTarget.classList.remove('incorrect');
                  } else {
                    e.currentTarget.classList.remove('correct');
                    e.currentTarget.classList.add('incorrect');
                  }
                }}
                style={{ 
                  backgroundColor: cell ? '': 'gray', 
                }} 
                key={cellIndex} 
                className="board-cell">
              </input>
              {indexes[`${rowIndex}-${cellIndex}`] && <span className="index">{indexes[`${rowIndex}-${cellIndex}`]}</span>}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default TenBoard;
