import React from 'react';
import './Cell.css';

/**
 * Represents a single cell in the "Lights Out" game board.
 * 
 * The cell does not maintain any state, instead, it relies on properties 
 * passed from its parent component (the game board).
 * 
 * @param {Object} props - Component properties.
 * @param {function} props.flipCellsAroundMe - Function to flip this cell and adjacent cells.
 * @param {boolean} [props.isLit=false] - Determines if the cell is currently lit.
 * @returns A table cell component representing a game cell.
 */
function Cell({ flipCellsAroundMe, isLit = false }) {
  // CSS class based on whether the cell is lit or not
  const classes = `Cell ${isLit ? 'Cell-lit' : ''}`;

  // Render the cell with an onClick handler to flip cells
  return (
    <td 
      className={classes} 
      onClick={flipCellsAroundMe} 
      role="button" 
      aria-pressed={isLit}
      tabIndex={0}
    />
  );
}

export default Cell;
