import React, { useState, useEffect } from "react";
import "./css/BingoGame.css";
import { BOARD_MESSAGES } from "./constants/boardMessage";
import Player from "./Player";
import Referee from "./Refree";

const shuffle = (array) => {
  array.sort(() => Math.random() - 0.5);
};

export default function BingoGame() {
  const [players, setPlayers] = useState(1);
  const [rows, setRows] = useState(1);
  const [cols, setCols] = useState(5);
  const [boards, setBoards] = useState([]);
  const [maxNumber, setMaxNumber] = useState(30);
  const [gameStart, setGameStart] = useState(false);
  const [calledNumbers, setCalledNumbers] = useState([]);
  const [isGameOver, setIsGameOver] = useState(false);

  const handleRowsChange = (e) => setRows(parseInt(e.target.value));
  const handleColsChange = (e) => setCols(parseInt(e.target.value));
  const handleMaxNumberChange = (e) => setMaxNumber(parseInt(e.target.value));
  const handlePlayersChange = (e) => setPlayers(parseInt(e.target.value));
  const handleGameStart = () => {
    generateBoards();
    setGameStart(true);
  };

  const generateBoards = () => {
    let limit = rows * cols;

    if (maxNumber < limit) {
      alert(BOARD_MESSAGES.INVALID_MAX_NUMBER_MSG(limit));
      return;
    }

    let selectedNumbers = [];
    for (let i = 1; i <= maxNumber; ++i) selectedNumbers.push(i);

    for (let p = 0; p < players; ++p) {
      const board = [];
      let index = 0;
      shuffle(selectedNumbers);
      for (let i = 0; i < rows; ++i) {
        const row = [];
        for (let j = 0; j < cols; ++j) {
          row.push(selectedNumbers[index++]);
        }
        board.push(row);
      }
      boards.push(board);
    }
    setBoards(boards);
  };

  const callNumber = () => {
    if (isGameOver) return;

    let randomNumber;
    while (true) {
      randomNumber = Math.floor(Math.random() * maxNumber) + 1;
      if (!calledNumbers.includes(randomNumber)) break;
    }

    setCalledNumbers([...calledNumbers, randomNumber]);
  };

  const handleGameEnd = () => {
    setIsGameOver(true);
    alert(BOARD_MESSAGES.GAME_END_MSG);
  };

  return (
    <div className="bingo-container">
      <h1>빙고 게임</h1>
      <div className="input-container">
        <label>
          플레이어 수
          <input type="number" value={players} onChange={handlePlayersChange} />
        </label>
        <label>
          행 수
          <input type="number" value={rows} onChange={handleRowsChange} />
        </label>
        <label>
          열 수
          <input type="number" value={cols} onChange={handleColsChange} />
        </label>
        <label>
          최대 숫자
          <input
            type="number"
            value={maxNumber}
            onChange={handleMaxNumberChange}
          />
        </label>
        <button onClick={handleGameStart}> 시작하기 </button>
      </div>
      {gameStart && (
        <>
          <Referee
            callNumber={callNumber}
            isGameOver={isGameOver}
            calledNumbers={calledNumbers}
          />
          <div className="boards-container">
            {boards.map((board, playerIndex) => (
              <Player
                key={playerIndex}
                board={board}
                playerIndex={playerIndex}
                calledNumbers={calledNumbers}
                gameEnd={handleGameEnd}
                rows={rows}
                cols={cols}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
