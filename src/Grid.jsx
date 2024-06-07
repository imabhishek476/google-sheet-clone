/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Cell from "./Cell";
import "./Grid.css";
import { useEffect } from "react";

const Grid = () => {
  const [focusedCell, setFocusedCell] = useState(null);
  const [cellData, setCellData] = useState([]);
  const [isColor, setIsColor] = useState(false);

  const handleFocus = (row, col) => {
    setFocusedCell({ row, col });
  };

  const handleChange = (row, col, content) => {
    setCellData((prevData) => ({
      ...prevData,
      [`${row}-${col}`]: { ...prevData[`${row}-${col}`], content },
    }));
  };

  const handleColorChange = (row, col, color) => {
    setCellData((prevData) => ({
      ...prevData,
      [`${row}-${col}`]: { ...prevData[`${row}-${col}`], color },
    }));
  };

  const renderCell = (row, col) => {
    // console.log(row," + ", col)
    // console.log(cellData)
    const cellKey = `${row}-${col}`;
    const cellContent = cellData[cellKey]?.content || "";
    const cellColor = cellData[cellKey]?.color || "";

    return (
      <Cell
        key={cellKey}
        row={row}
        col={col}
        content={cellContent}
        color={cellColor}
        isFocused={
          focusedCell && focusedCell.row === row && focusedCell.col === col
        }
        onFocus={handleFocus}
        onChange={handleChange}
        onColorChange={handleColorChange}
        isColor={isColor}
        setIsColor={setIsColor}
      />
    );
  };

  // useEffect(()=>{
  //   console.log(cellData)
  // },[cellData])

  return (
    <div className="grid">
      {Array.from({ length: 4 }).map((_, row) => (
        <div className="row" key={row}>
          {Array.from({ length: 4 }).map((_, col) => renderCell(row, col))}
        </div>
      ))}

      {/* separate */}
      {/* separate */}
      {/* separate */}
      {/* separate */}
      <div style={{ marginTop: "1rem" }}>
        <button
          style={{
            padding: "10px",
            backgroundColor: "cyan",
            cursor: "pointer",
          }}
          onClick={() => setIsColor(true)}
          disabled={isColor}
        >
          Enable to change Background Color
        </button>
      </div>
    </div>
  );
};

export default Grid;
