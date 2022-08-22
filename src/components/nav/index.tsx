import NavMenu from './menu';
import './nav.css';

function Nav({
  gameOn,
  setGameOn,
}: {
  gameOn: boolean;
  setGameOn: (gameOn: boolean) => void;
}) {
  return (
    <nav className="nav-bar">
      <h1>Crosswords</h1>
      <NavMenu gameOn={gameOn} setGameOn={setGameOn} />
    </nav>
  );
}

export default Nav;
