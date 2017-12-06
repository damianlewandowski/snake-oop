import GameBoard from './GameBoard';

window.onload = () => {
  const gameBoard = new GameBoard();
  gameBoard.runGame(10);
}
