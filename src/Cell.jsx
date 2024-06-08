/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import "./Cell.css";

const Cell = ({
  row,
  col,
  content,
  color,
  isFocused,
  onFocus,
  onChange,
  onColorChange,
  isColor,
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleSingleClick = () => {
    onFocus(row, col);
  };

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
  };

  const handleChange = (e) => {
    onChange(row, col, e.target.value);
  };

  const handleColorChange = (color) => {
    onColorChange(row, col, color);
  };

  return (
    <div
      className={`cell ${isFocused ? "focused" : ""}`}
      style={{ backgroundColor: color }}
      onClick={handleSingleClick}
      onDoubleClick={handleDoubleClick}
    >
      {isEditing ? (
        <input
          type="text"
          value={content}
          style={{ backgroundColor: color }}
          onChange={handleChange}
          onBlur={handleBlur}
          autoFocus
        />
      ) : (
        <div style={{overflow:"hidden"}}>{content}</div>
      )}
      {isFocused && (
        <div
          className="color-picker"
          style={{ zIndex: "100", visibility: isColor ? "visible" : "hidden" }}
        >
          <button onClick={() => handleColorChange("red")}>Red</button>
          <button onClick={() => handleColorChange("green")}>Green</button>
          <button onClick={() => handleColorChange("blue")}>Blue</button>
          <button onClick={() => handleColorChange("yellow")}>Yellow</button>
        </div>
      )}
    </div>
  );
};

export default Cell;
