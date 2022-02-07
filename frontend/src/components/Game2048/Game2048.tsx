import React, { useState, useEffect } from "react";
import Styles from "./game2048.module.css";

import Tile from "./Tile/Tile";

import StyledButton from "../StyledButton/StyledButton";

interface tileInterface {
  // The tiles value: 0, 2, 4 ... 2048
  value: number;
  // The tiles horistontal position: 0-3
  positionX: number;
  // The tiles vertical position: 0-3
  positionY: number;
}

// TODO: Add logic for user being logged in or not
export default function Game2048() {
  const [gameIsRunning, setGameIsRunning] = useState<boolean>(false);
  const [tileList, setTileList] = useState<tileInterface[]>([]);

  // Generates a new tile with the value 2 on an empty slot (tile with value = 0).
  const generateNewValueTile = (): void => {
    // TODO: Add check to see if all tiles have a value > 0

    const randomNumber = Math.floor(Math.random() * tileList.length);

    if (tileList[randomNumber].value === 0) {
      tileList[randomNumber].value = 2;
    } else generateNewValueTile();
  };

  const startNewGame = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();

    // Populating the tileList
    const newArr = [];

    for (let i = 0; i < 4; i++) {
      newArr.push({ value: 0, positionX: 0, positionY: i });
      newArr.push({ value: 0, positionX: 1, positionY: i });
      newArr.push({ value: 0, positionX: 2, positionY: i });
      newArr.push({ value: 0, positionX: 3, positionY: i });
    }

    setTileList(newArr);
  };

  useEffect(() => {
    if (tileList.length === 16) {
      /* Changing the value of two tiles to 2 before starting */
      generateNewValueTile();
      generateNewValueTile();

      setGameIsRunning(true);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tileList.length]);

  return (
    <div className={Styles.gameGrid}>
      {!gameIsRunning ? (
        //TODO: REPLACE WITH <StyledButton textInput="Spela" colorInput="#FFC66C" onClick={startNewGame}/>
        <button value="Spela" onClick={startNewGame}>
          Spela
        </button>
      ) : (
        tileList.map((tile, index) => {
          return (
            <Tile
              key={index}
              value={tile.value}
              positionX={tile.positionX}
              positionY={tile.positionY}
            />
          );
        })
      )}
    </div>
  );
}
