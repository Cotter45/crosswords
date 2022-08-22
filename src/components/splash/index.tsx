import './splash.css';

function Splash({ setGameType, setGameOn }: { setGameType: (gameType: string) => void, setGameOn: (gameOn: boolean) => void }) {
  return (
    <div className="splash">
      <div className="splash-intro">
        <h1>Welcome to Crosswords!</h1>
        <p>
          There are 3 game boards to choose from, all words are chosen at random from a list of 50,000 words! To get started playing, simply select how many words you wish to solve for.
        </p>
      </div>
      <div className="splash-buttons">
        <button
          onClick={() => {
            setGameType('crosswords-10');
            setGameOn(true);
          }}
          className="splash-button"
        >
          10 Words
        </button>
        <button
          onClick={() => {
            setGameType('crosswords-15');
            setGameOn(true);
          }}
          className="splash-button"
        >
          15 Words
        </button>
        <button
          onClick={() => {
            setGameType('crosswords-20');
            setGameOn(true);
          }}
          className="splash-button"
        >
          20 Words
        </button>
      </div>
    </div>
  );
}

export default Splash;