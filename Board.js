import React, { useState } from 'react';
import Cell from './Cell';
import './Board.css';

/**
 * Represents the game board for "Lights Out".
 * 
 * @param {Object} props - Component properties.
 * @param {number} props.nrows - Number of rows in the board.
 * @param {number} props.ncols - Number of columns in the board.
 * @param {number} props.chanceLightStartsOn - Probability of a cell being lit at the start.
 * @returns A board component for the game.
 */
function Board({ nrows = 5, ncols = 5, chanceLightStartsOn = 0.25 }) {
  // State for the board's layout
  const [board, setBoard] = useState(createBoard());

  /**
   * Generates the initial board layout.
   * Each cell is lit or unlit based on `chanceLightStartsOn`.
   * 
   * @returns {Array} Initial board layout.
   */
  function createBoard() {
    return Array.from({ length: nrows }, () => 
      Array.from({ length: ncols }, () => Math.random() < chanceLightStartsOn)
    );
  }

  /**
   * Determines if the player has won the game.
   * 
   * @returns {boolean} True if all cells are unlit, false otherwise.
   */
  function hasWon() {
    return board.every(row => row.every(cell => !cell));
  }

  /**
   * Flips the state of the specified cell and its adjacent cells.
   * 
   * @param {string} coord - The y-x coordinate of the cell.
   */
  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      const boardCopy = oldBoard.map(row => [...row]);
      flipCell(y, x, boardCopy);
      flipCell(y, x - 1, boardCopy);
      flipCell(y, x + 1, boardCopy);
      flipCell(y - 1, x, boardCopy);
      flipCell(y + 1, x, boardCopy);

      return boardCopy;
    });
  }

  // Renders a winning message if the game is won
  if (hasWon()) {
    return <div>You Win!</div>;
  }

  // Constructs the board as a table of Cell components
  const tblBoard = board.map((row, y) => (
    <tr key={y}>
      {row.map((cell, x) => {
        const coord = `${y}-${x}`;
        return (
          <Cell
            key={coord}
            isLit={cell}
            flipCellsAroundMe={() => flipCellsAround(coord)}
          />
        );
      })}
    </tr>
  ));

  return (
    <table className="Board">
      <tbody>{tblBoard}</tbody>
    </table>
  );
}

export default Board;
