import React, { CSSProperties } from "react";
import Styles from "./styledButton.module.css";

interface ButtonProps {
  textInput: string;
  colorInput: string;
}

// TODO: ADD NAVIGATION FUNCTIONALITY
export default function StyledButton({ textInput, colorInput }: ButtonProps) {
  const dynamicColor: CSSProperties = {
    color: colorInput,
  };

  return (
    <button
      value={textInput}
      className={Styles.buttonStyle}
      style={dynamicColor}
    >
      {textInput}
    </button>
  );
}
