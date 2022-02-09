import React, { CSSProperties } from "react";
import { useNavigate } from "react-router-dom";
import Styles from "./styledButton.module.css";

interface ButtonProps {
  textInput: string;
  colorInput: string;
  pathName?: string;
}

export default function StyledButton({ textInput, colorInput, pathName }: ButtonProps) {
  const navigate = useNavigate();

  const dynamicColor: CSSProperties = {
    color: colorInput,
  };

  const handleOnClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (pathName) {
      navigate(`/${pathName}`)
    }
  };

  return (
    <button
      value={textInput}
      className={Styles.buttonStyle}
      style={dynamicColor}
      onClick={handleOnClick}
    >
      {textInput}
    </button>
  );
}
