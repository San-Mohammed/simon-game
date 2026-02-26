import { useState, useEffect } from "react";
import "./App.css";
const randomNumber = () => Math.floor(Math.random() * 4);
function App() {
  const [colors, setColors] = useState(["green", "red", "yellow", "blue"]);
  const [gussess, setGuesses] = useState<string[]>([colors[randomNumber()]]);
  const [currentColor, setCurrentColor] = useState<string | null>(gussess[0]);
  const [isMyTurn, setIsMyTurn] = useState<boolean>(false);
  const [myGuesses, setMyGuesses] = useState<string[]>([]);

  const handleClickColor = (color: string) => {
    const newGuess = [...myGuesses, color];
    if (newGuess.length === gussess.length) {
      const isTrue = newGuess.every(
        (myGuess, index) => myGuess === gussess[index],
      );
      if (isTrue) {
        setGuesses([...gussess, colors[randomNumber()]]);
        setMyGuesses([]);
        setIsMyTurn(false);
        setCurrentColor(gussess[0]);
        return;
      }
      setIsMyTurn(false);
      setGuesses([gussess[gussess.length - 1]]);

      alert("you lost");
    }
    setMyGuesses([...newGuess]);
  };

  useEffect(() => {
    gussess.map((eachGuess, index) => {
      setTimeout(
        () => {
          if (index === gussess.length - 1) {
            setIsMyTurn(true);
            setCurrentColor(null);
            return;
          }
          console.log("current code is ", gussess[index + 1]);

          setCurrentColor(gussess[index + 1]);
        },
        (index + 1) * 1000,
      );
    });
  }, [gussess]);

  return (
    <div className="h-screen flex flex-col items-center justify-center gap-2.5">
      <h1>{isMyTurn ? "your turn" : "wait"}</h1>
      <div className="grid grid-cols-2">
        {colors.map((color) => (
          <div
            onClick={() => handleClickColor(color)}
            style={{ backgroundColor: color }}
            className={`w-30 h-30 ${!(currentColor === color) && "brightness-50"}`}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default App;
