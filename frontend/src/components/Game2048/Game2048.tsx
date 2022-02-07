import React, { useState, useEffect } from "react";
import Styles from "./game2048.module.css";

// Importing components
import Tile from "./Tile/Tile";
import StyledButton from "../StyledButton/StyledButton";
// Importing models
import { TileInterface } from "./Tile/models/Tile";
// Importing utils
import {
  moveHorizontal,
  moveVertical,
  combineNumbersInRow,
  combineNumbersInColumn,
  generateNewValueTile,
} from "./gameLogic/gameLogic";

// TODO: Add logic for user being logged in or not
export default function Game2048() {
  const [gameIsRunning, setGameIsRunning] = useState<boolean>(false);
  const [tileList, setTileList] = useState<TileInterface[]>([]);

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

  const handleKeyUp = (event: KeyboardEvent) => {
    // TODO: Fix so that the windows doesnt scroll or change keys from arrowkeys
    event.preventDefault();

    // TODO: Update score + moves with every correct move

    if (event.key === "ArrowRight" || event.key === "d" || event.key === "D") {
      moveHorizontal("Right", tileList, setTileList, gameIsRunning);
      combineNumbersInRow(tileList, setTileList);
      moveHorizontal("Right", tileList, setTileList, gameIsRunning);
      generateNewValueTile(tileList, setTileList);
    }

    if (event.key === "ArrowLeft" || event.key === "a" || event.key === "A") {
      moveHorizontal("Left", tileList, setTileList, gameIsRunning);
      combineNumbersInRow(tileList, setTileList);
      moveHorizontal("Left", tileList, setTileList, gameIsRunning);
      generateNewValueTile(tileList, setTileList);
    }

    if (event.key === "ArrowDown" || event.key === "s" || event.key === "S") {
      moveVertical("Down", tileList, setTileList, gameIsRunning);
      combineNumbersInColumn(tileList, setTileList);
      moveVertical("Down", tileList, setTileList, gameIsRunning);
      generateNewValueTile(tileList, setTileList);
    }

    if (event.key === "ArrowUp" || event.key === "w" || event.key === "W") {
      moveVertical("Up", tileList, setTileList, gameIsRunning);
      combineNumbersInColumn(tileList, setTileList);
      moveVertical("Up", tileList, setTileList, gameIsRunning);
      generateNewValueTile(tileList, setTileList);
    }
  };

  useEffect(() => {
    if (tileList.length === 16 && !gameIsRunning) {
      /* Changing the value of two tiles to 2 before starting */
      generateNewValueTile(tileList, setTileList);
      generateNewValueTile(tileList, setTileList);

      setGameIsRunning(true);
      // Adding eventListener so that the player can play with their keyboard
      window.addEventListener("keyup", handleKeyUp);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tileList]);

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
