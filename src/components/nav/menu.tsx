import { useEffect, useState } from "react";

function NavMenu({
  gameOn,
  setGameOn,
}: {
  gameOn: boolean;
  setGameOn: (gameOn: boolean) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const body = document.querySelector("main");
    const handleClick = (e: MouseEvent) => {
      setIsOpen(!isOpen);
    };

    body && body.addEventListener("click", handleClick, { once: true });

    return () => {
      body && body.removeEventListener("click", handleClick);
    };
  }, [isOpen]);

  return (
    <>
      <input
        checked={isOpen}
        onChange={() => {}}
        type="checkbox"
        id="menu-toggle"
      />
      <label
        data-testid="menu-toggle"
        onClick={() => setIsOpen(!isOpen)}
        htmlFor="menu-toggle"
        className="hamburger"
      >
        <span className="bun bun-top">
          <span className="bun-crust bun-crust-top"></span>
        </span>
        <span className="bun bun-bottom">
          <span className="bun-crust bun-crust-bottom"></span>
        </span>
      </label>
      <section
        style={{
          maxWidth: isOpen ? "400px" : 0,
        }}
        className="menu"
      >
        <div
          onClick={() => {
            setGameOn(false);
            setIsOpen(false);
          }}
          data-testid="quit-button"
          className="menu-item"
        >
          New Game
        </div>
        <div
          // onClick={() => navigate("/signup")}
          data-testid="about-button"
          className="menu-item"
        >
          About
        </div>
      </section>
    </>
  );
}

export default NavMenu;
