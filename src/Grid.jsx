/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Cell from "./Cell";
import "./Grid.css";
import { useEffect } from "react";

const Grid = ({ CountCells }) => {
  const [focusedCell, setFocusedCell] = useState(null);
  const [cellData, setCellData] = useState([]);
  const [isColor, setIsColor] = useState(false);
  const [keyStatus, setKeyStatus] = useState(false);

  const handleFocus = (row, col) => {
    setFocusedCell({ row, col });
  };

  const handleChange = (row, col, content) => {
    setCellData((prevData) => ({
      ...prevData,
      [`${row}-${col}`]: { ...prevData[`${row}-${col}`], content }
    }));
  };

  const handleColorChange = (row, col, color) => {
    setCellData((prevData) => ({
      ...prevData,
      [`${row}-${col}`]: { ...prevData[`${row}-${col}`], color }
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

  useEffect(() => {
    const handleKeyDown = (e) => {
      const { row, col } = focusedCell;
      switch (e.key) {
        case "ArrowUp":
          if (row > 0) setFocusedCell({ row: row - 1, col });
          break;
        case "ArrowDown":
          if (row < CountCells - 1) setFocusedCell({ row: row + 1, col });
          break;
        case "ArrowLeft":
          if (col > 0) setFocusedCell({ row, col: col - 1 });
          break;
        case "ArrowRight":
          if (col < CountCells - 1) setFocusedCell({ row, col: col + 1 });
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [focusedCell]);

  return (
    <>
      <div className="grid">
        {Array.from({ length: CountCells }).map((_, row) => (
          <div className="row" key={row}>
            {Array.from({ length: CountCells }).map((_, col) =>
              renderCell(row, col)
            )}
          </div>
        ))}
      </div>

      <div style={{ marginTop: "1.8rem" }}>
        <button
          style={{
            padding: "10px",
            backgroundColor: "cyan",
            cursor: "pointer"
          }}
          onClick={() => setIsColor((prev) => !prev)}
        >
          {isColor ? "Disable" : "Enable"} to change Background Color
        </button>
      </div>
    </>
  );
};

export default Grid;
