import React, { useState } from 'react';
import styled from "styled-components";
import Square from "./components/square";
import styles from "./App.module.css";
// import styled from '../lesson3'
function App() {
  const [board, setBorad] = useState(Array(9).fill(null))
  const [xPlayer, setXPlayer] = useState(true)
  const winner = caculateWinner(board)
  const handlePlay = (index) => {
    const temp = [...board];
    if (winner || temp[index]) return;
    temp[index] = xPlayer ? 'X' : 'O';
    setBorad(temp);
    setXPlayer((xPlayer)=>!xPlayer)
  };

  const handleResetGame = () => {
    setBorad(Array(9).fill(null));
    setXPlayer(true)
  }
  return (
    <Container>
      {winner ? <h1 className={styles.winner}>Winner is: {winner}</h1> : null}
      <Board>
        {board.map((item, index) => <Square handlePlay={() => handlePlay(index)} value={item} />)}
      </Board>
      <button onClick={handleResetGame}>Reset Game</button>
    </Container>
  );
}
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const Board = styled.div`
  background: lightgray;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 5px;
  max-width: 250px;
  margin: auto;
`
const caculateWinner = (board) => {
  const winLine = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < winLine.length; i++) {
    const [a, b, c] = winLine[i];
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a]
    }
  }
  return null;
};
export default App;
