import React, { CSSProperties } from "react";
import { useNavigate } from "react-router-dom";
import Styles from "./styledButton.module.css";

interface ButtonProps {
  textInput: string;
  colorInput: string;
  pathName?: string;
}

export default function StyledButton({
  textInput,
  colorInput,
  pathName,
}: ButtonProps) {
  const navigate = useNavigate();

  const dynamicColor: CSSProperties = {
    backgroundColor: colorInput,
  };

  const handleOnClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (pathName) {
      navigate(`/${pathName}`);
    }
  };

  // TODO: Add icons
  return (
    <button
      value={textInput}
      className={Styles.buttonStyle}
      style={dynamicColor}
      onClick={handleOnClick}
    >
      <span className={Styles.white}>
        {textInput}
      </span>
    </button>
  );
}
