import words from './words.json';

function getRandomWord() {
  const keys: string[] = Object.keys(words);
  const randomKey: string = keys[Math.floor(Math.random() * keys.length)];
  // @ts-ignore
  const randomDefinition: string = words[randomKey];
  return {
    newWord: randomKey,
    newDefinition: randomDefinition,
  };
}

export function getRandomWords(count: number): { randomWords: string[]; randomDefinitions: string[] } {
  const randomWords: string[] = [];
  const randomDefinitions: string[] = [];

  const keys = Object.keys(words);
  
  while (randomWords.length < count) {
    // @ts-ignore
    const randomIndex = Math.floor(Math.random() * keys.length);
    // @ts-ignore
    const randomWord = keys[randomIndex];
    if (randomWord.length < count && !randomWords.includes(randomWord)) {
      randomWords.push(randomWord);
      // @ts-ignore
      randomDefinitions.push(words[randomWord]);
    }
  }
  return { randomWords, randomDefinitions };
}

export function createTenBoard(): { board: string[][], definitions: string[], words: string[], indexes: any } {
  let { randomWords: words, randomDefinitions: definitions } = getRandomWords(10);
  let board = Array.from({ length: 10 }, () => Array.from({ length: 10 }, () => ''));
  const indexes: any = {};
    
  let i = 0;
  let wordsPlaced = 0;

  while (wordsPlaced < 10) {
    let word = words[i];
    const row = Math.floor(Math.random() * 10);
    const col = Math.floor(Math.random() * 10);
    const direction = Math.random() > 0.5 ? 'horizontal' : 'vertical';
    const length = word.length;
    
    if (direction === 'horizontal' && (col + length) > 10 - col) {
      continue;
    }
    if (direction === 'vertical' && (row + length) > 10 - row) {
      continue;
    }

    let canPlace = true;
    if (direction === 'horizontal') {
      for (let j = 0; j < length; j++) {
        if (board[row][col + j] === word[j]) continue;
        if (board[row][col + j] !== '') {
          canPlace = false;
          break;
        };
      }
    } else {
      for (let j = 0; j < length; j++) {
        if (board[row + j][col] === word[j]) continue;
        if (board[row + j][col] !== '') {
          canPlace = false;
          break;
        };
      }
    }

    if (!canPlace && wordsPlaced >= 9) {
      const { newWord, newDefinition } = getRandomWord();
      word = newWord;
      definitions[i] = newDefinition;
      continue;
    };

    if (direction === 'horizontal') {
      for (let j = 0; j < length; j++) {
        if (j === 0) indexes[`${row}-${col + j}`] = wordsPlaced + 1;
        board[row][col + j] = word[j];
      }
    } else {
      for (let j = 0; j < length; j++) {
        if (j === 0) indexes[`${row + j}-${col}`] = wordsPlaced + 1;
        board[row + j][col] = word[j];
      }
    }
    wordsPlaced++;
    i++;
  };

  return { board, definitions, words, indexes };
}
