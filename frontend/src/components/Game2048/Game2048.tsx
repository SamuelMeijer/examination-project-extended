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

  /* TODO: MOVE GAMELOGIC TO DIFFERENT FILE! */
  const moveRight = (): void => {
    const updatedTileList = [...tileList];

    for (let i = 0; i < tileList.length; i++) {
      if (i % 4 === 0) {
        let rowValues = [
          tileList[i].value,
          tileList[i + 1].value,
          tileList[i + 2].value,
          tileList[i + 3].value,
        ];

        let rowValuesGreaterThanZero = rowValues.filter((num) => num > 0);
        console.log(rowValuesGreaterThanZero);

        let zeroesNeeded = 4 - rowValuesGreaterThanZero.length;
        let arrOfZeroes = Array(zeroesNeeded).fill(0);
        console.log(arrOfZeroes);

        // Combine the arrays (ONLY DIFFERENCCE BETWEEN LEFT OR RIGHT)
        let arrAfterMovement = arrOfZeroes.concat(rowValuesGreaterThanZero);
        console.log("SE", arrAfterMovement);

        updatedTileList[i].value = arrAfterMovement[0];
        updatedTileList[i + 1].value = arrAfterMovement[1];
        updatedTileList[i + 2].value = arrAfterMovement[2];
        updatedTileList[i + 3].value = arrAfterMovement[3];
      }
    }

    if (gameIsRunning) {
      // TODO CHANGE
      setTileList(updatedTileList);
    }
  };

  const moveLeft = (): void => {
    const updatedTileList = [...tileList];

    for (let i = 0; i < tileList.length; i++) {
      if (i % 4 === 0) {
        let rowValues = [
          tileList[i].value,
          tileList[i + 1].value,
          tileList[i + 2].value,
          tileList[i + 3].value,
        ];

        let rowValuesGreaterThanZero = rowValues.filter((num) => num > 0);
        console.log(rowValuesGreaterThanZero);

        let zeroesNeeded = 4 - rowValuesGreaterThanZero.length;
        let arrOfZeroes = Array(zeroesNeeded).fill(0);
        console.log(arrOfZeroes);

        // Combine the arrays (ONLY DIFFERENCCE BETWEEN LEFT OR RIGHT)
        let arrAfterMovement = rowValuesGreaterThanZero.concat(arrOfZeroes);
        console.log("SE", arrAfterMovement);

        updatedTileList[i].value = arrAfterMovement[0];
        updatedTileList[i + 1].value = arrAfterMovement[1];
        updatedTileList[i + 2].value = arrAfterMovement[2];
        updatedTileList[i + 3].value = arrAfterMovement[3];
      }
    }

    if (gameIsRunning) {
      setTileList(updatedTileList);
    }
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
    //   TODO: Change to handleKeyPress-function - Testing moveLeft
    <div className={Styles.gameGrid} onClick={moveLeft}>
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
