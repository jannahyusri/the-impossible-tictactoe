import { useState } from "react";

const lines = [
  [0, 1, 2], //top row
  [3, 4, 5], //mid row
  [6, 7, 8], //bottom row
  [0, 3, 6], //1st col
  [1, 4, 7], //2nd col
  [2, 5, 8], //3rd col
  [0, 4, 8], //diagonal
  [2, 4, 6], //diagonal
];

function isBlocked(squares, index, sign) {
  for (line of lines) {
    if (line.includes(index)) {
      const count = line.filter((i) => squares[i] === sign).length;
      if (count >= 2) {
        return true;
      }
    }
  }
  return false;
}

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

export default function Board() {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));

  function handleClick(i) {
    if (squares[i]) {
      return;
    }

    const sign = xIsNext ? "X" : "O";
    if (isBlocked(squares, i, sign)) {
      alert("Ooopsie :p");
      return;
    }

    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  function handleReset() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  }

  const title = "TIC TAC TOEn't";
  const subtitle = "Tic tac toe...except nobody can win!";
  const status = "Next Player: " + (xIsNext ? "X" : "O");

  return (
    <div className="game">
      <div className="title">{title}</div>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
      <button className="reset-btn" onClick={handleReset}>
        Play Again
      </button>
      <div className="subtitle">{subtitle}</div>
    </div>
  );
}
