import React, { useState } from 'react';
import VoiceControl from './VoiceControl';
import './TicTacToe.css'; // Ensure the file name matches exactly

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [gameActive, setGameActive] = useState(true);
  const [message, setMessage] = useState('');
  const [gameMode, setGameMode] = useState('pvp'); // Player vs Player

  const handleCellClick = (index) => {
    if (board[index] || !gameActive) return;

    const newBoard = board.slice();
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    if (checkWin(newBoard)) {
      setMessage(`${currentPlayer} Wins!`);
      setGameActive(false);
    } else if (checkDraw(newBoard)) {
      setMessage('Draw!');
      setGameActive(false);
    } else {
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
      if (gameMode === 'ai' && currentPlayer === 'X') {
        setTimeout(() => aiMove(newBoard), 300);
      }
    }
  };

  const handleVoiceCommand = ({ player, cellIndex, restart }) => {
    if (restart) {
      restartGame();
    } else {
      handleCellClick(cellIndex);
    }
  };

  const checkWin = (board) => {
    return winningCombinations.some(combination => {
      const [a, b, c] = combination;
      return board[a] && board[a] === board[b] && board[a] === board[c];
    });
  };

  const checkDraw = (board) => {
    return board.every(cell => cell !== null);
  };

  const aiMove = (currentBoard) => {
    const availableCells = currentBoard
      .map((cell, index) => (cell === null ? index : null))
      .filter(index => index !== null);

    let selectedCell = getRandomMove(availableCells);

    if (selectedCell !== null) {
      const newBoard = currentBoard.slice();
      newBoard[selectedCell] = 'O';
      setBoard(newBoard);

      if (checkWin(newBoard)) {
        setMessage('O Wins!');
        setGameActive(false);
      } else if (checkDraw(newBoard)) {
        setMessage('Draw!');
        setGameActive(false);
      } else {
        setCurrentPlayer('X');
      }
    }
  };

  const getRandomMove = (availableCells) => {
    return availableCells[Math.floor(Math.random() * availableCells.length)];
  };

  const restartGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer('X');
    setGameActive(true);
    setMessage('');
  };

  return (
    <div className="game-container">
      <h1>Tic-Tac-Toe</h1>
      <div className="settings">
        <label htmlFor="mode">Mode:</label>
        <select id="mode" onChange={(e) => setGameMode(e.target.value)}>
          <option value="ai">Player vs AI</option>
          <option value="pvp">Player vs Player</option>
        </select>
      </div>

      <VoiceControl onCommand={handleVoiceCommand} />

      <div id="board" className="board">
        {board.map((cell, index) => (
          <div
            key={index}
            className="cell"
            onClick={() => handleCellClick(index)}
            data-cell={index}
          >
            {cell}
          </div>
        ))}
      </div>

      <button id="restart" className="btn-restart" onClick={restartGame}>
        Restart Game
      </button>

      <p id="message" className="message">
        {message}
      </p>
    </div>
  );
};

export default TicTacToe;
