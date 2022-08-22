import { useEffect, useState } from 'react';
import { createTenBoard } from '../../util/setup';

function Board({ setDefinitions, setWords, reset }: { gameType: string, words: string[] | undefined, setWords: (words: string[]) => void, reset: boolean, setDefinitions: (definitions: string[]) => void }) {

  const [grid, setGrid] = useState<string[][]>();
  const [indexes, setIndexes] = useState<any>();

  useEffect(() => {
    const { board, definitions, words, indexes } = createTenBoard();
    setWords(words);
    setIndexes(indexes);
    setGrid(board);
    setDefinitions(definitions);
  }, [setWords, reset, setDefinitions]);

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
                  if (e.key === cell) {
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

export default Board;
