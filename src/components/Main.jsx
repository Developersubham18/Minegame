import { useEffect, useState } from "react";
import Box from "./Box";

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateRandomNumbers(count, min, max) {
  const numbers = new Set();
  while (numbers.size < count) {
    numbers.add(getRandomInt(min, max));
  }
  return Array.from(numbers);
}

function Main() {
  const [gameOver, setGameOver] = useState(false);
  const [point, setPoint] = useState(0);
  const [resetFlag, setResetFlag] = useState(false);
  const [minesCount, setMinesCount] = useState(3);
  const [randomNumbers, setRandomNumbers] = useState(
    generateRandomNumbers(minesCount, 1, 25)
  );

  let again = new Audio("/again.mp3");

  useEffect(() => {
    setRandomNumbers(generateRandomNumbers(minesCount, 1, 25));
  }, [minesCount, resetFlag]);

  const squares = [];
  for (let index = 1; index <= 25; index++) {
    const isbomb = randomNumbers.includes(index);
    squares.push(
      <Box
        key={index}
        setPoint={setPoint}
        gameOver={gameOver}
        setGameOver={setGameOver}
        bomb={isbomb}
        resetFlag={resetFlag}
      />
    );
  }

  const handleLevelChange = (e) => {
    setMinesCount(parseInt(e.target.value));
    reset();
  };

  const reset = () => {
    again.play();
    setRandomNumbers(generateRandomNumbers(3, 1, 25));
    setGameOver(false);
    setPoint(0);
    setResetFlag((prev) => !prev);
  };

  return (
    <div className=" flex md:flex-row  flex-col-reverse gap-4 justify-around mt-10 mb-5 p-3">
      <div className="flex flex-col justify-center items-center text-white gap-5 mb-4">
        <div className="flex gap-3 justify-center items-center text-3xl">
          <p className="font-bold">Total Scores :</p>
          <p className="font-semibold">{point} PTS</p>
        </div>

        <div className="flex gap-3">
          <select
            className="inline-block rounded  px-4 py-2 text-sm font-semibold text-black bg-[rgba(0,231,1,1)]"
            value={minesCount}
            onChange={handleLevelChange}
          >
            <option value={3} className="hover:bg-black">
              3 Mines
            </option>
            <option value={4} className="hover:bg-black">
              4 Mines
            </option>
            <option value={6} className="hover:bg-black">
              6 Mines
            </option>
          </select>
          <button
            className="inline-block rounded font-semibold px-8 py-3 text-sm  text-black bg-[rgba(0,231,1,1)] disabled:bg-[#00e70087]"
            onClick={reset}
          >
            Reset
          </button>
        </div>
      </div>
      <div className="flex w-[95w]   md:w-[600px] md:h-[600px] justify-center items-center  flex-wrap md:gap-3 gap-2 p-4 rounded-2xl bg-[#0f212e]">
        {squares}
      </div>
    </div>
  );
}

export default Main;
