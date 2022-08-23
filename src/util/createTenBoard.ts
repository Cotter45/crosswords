import { getRandomWords, getRandomWord } from "./setup";

export function createTenBoard(): { board: string[][], definitions: string[], words: string[], indexes: any, letterCount: number } {
  let { randomWords, randomDefinitions: definitions } = getRandomWords(10);
  const words = randomWords;
  let board = Array.from({ length: 10 }, () => Array.from({ length: 10 }, () => ''));
  const indexes: any = {};
    
  let i = 0;
  let wordsPlaced = 0;
  let letterCount = 0;
  let attempts = 0;

  while (wordsPlaced < 10) {
    let word = words[i];
    const length = word.length;
    const row = Math.floor(Math.random() * (10 - length));
    const col = Math.floor(Math.random() * (10 - length));
    const direction = Math.random() > 0.5 ? 'horizontal' : 'vertical';

    let canPlace = true;
    if (direction === 'horizontal') {
      for (let j = 0; j < length; j++) {
        if (board[row][col + j] === word[j]) continue;
        if (board[row][col + j] !== '') {
          canPlace = false;
          attempts++;
          break;
        };
      }
    } else {
      for (let j = 0; j < length; j++) {
        if (board[row + j][col] === word[j]) continue;
        if (board[row + j][col] !== '') {
          canPlace = false;
          attempts++;
          break;
        };
      }
    }

    if (!canPlace && attempts >= 10) {
      const { newWord, newDefinition } = getRandomWord();
      words.splice(i, 1, newWord);
      definitions.splice(i, 1, newDefinition);
      attempts = 0;
      continue;
    };

    if (!canPlace) continue;

    if (direction === 'horizontal') {
      for (let j = 0; j < length; j++) {
        if (j === 0) indexes[`${row}-${col + j}`] = wordsPlaced + 1;
        if (board[row][col + j] === '') letterCount++;
        board[row][col + j] = word[j];
      }
    } else {
      for (let j = 0; j < length; j++) {
        if (j === 0) indexes[`${row + j}-${col}`] = wordsPlaced + 1;
        if (board[row + j][col] === '') letterCount++;
        board[row + j][col] = word[j];
      }
    }
    wordsPlaced++;
    i++;
  };

  return { board, definitions, words, indexes, letterCount };
}