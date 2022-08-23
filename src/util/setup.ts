import words from './words.json';

export function getRandomWord() {
  let keys: string[] = Object.keys(words);
  keys = keys.filter((key: string) => key.length < 5);
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
    const randomIndex = Math.floor(Math.random() * keys.length);
    // @ts-ignore
    const randomWord = keys[randomIndex];
    if (randomWord.length < Math.floor(count * 0.75) && !randomWords.includes(randomWord)) {
      randomWords.push(randomWord);
      // @ts-ignore
      randomDefinitions.push(words[randomWord]);
    }
  }
  return { randomWords, randomDefinitions };
}

