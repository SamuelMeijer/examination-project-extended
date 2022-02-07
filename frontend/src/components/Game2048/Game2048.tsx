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

    const updatedTileList = [...tileList]
    const randomNumber = Math.floor(Math.random() * tileList.length);

    if (updatedTileList[randomNumber].value === 0) {
        updatedTileList[randomNumber].value = 2;

        setTileList(updatedTileList)
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

        let zeroesNeeded = 4 - rowValuesGreaterThanZero.length;
        let arrOfZeroes = Array(zeroesNeeded).fill(0);

        // Combine the arrays (ONLY DIFFERENCCE BETWEEN LEFT OR RIGHT)
        let arrAfterMovement = arrOfZeroes.concat(rowValuesGreaterThanZero);

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

        let zeroesNeeded = 4 - rowValuesGreaterThanZero.length;
        let arrOfZeroes = Array(zeroesNeeded).fill(0);

        // Combine the arrays (ONLY DIFFERENCCE BETWEEN LEFT OR RIGHT)
        let arrAfterMovement = rowValuesGreaterThanZero.concat(arrOfZeroes);

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

  const moveDown = (): void => {
    const updatedTileList = [...tileList];

    for (let i = 0; i < 4; i++) {
        let columnValues = [
            updatedTileList[i].value,
            updatedTileList[i + 4].value,
            updatedTileList[i + 8].value,
            updatedTileList[i + 12].value,
        ];

        let columnValuesGreaterThanZero = columnValues.filter((num) => num > 0);

        let zeroesNeeded = 4 - columnValuesGreaterThanZero.length;
        let arrOfZeroes = Array(zeroesNeeded).fill(0);

        // Combine the arrays (ONLY DIFFERENCCE BETWEEN LEFT OR RIGHT)
        let arrAfterMovement = arrOfZeroes.concat(columnValuesGreaterThanZero);

        updatedTileList[i].value = arrAfterMovement[0];
        updatedTileList[i + 4].value = arrAfterMovement[1];
        updatedTileList[i + 8].value = arrAfterMovement[2];
        updatedTileList[i + 12].value = arrAfterMovement[3];
    }

    if (gameIsRunning) {
      setTileList(updatedTileList);
    }
  };

  const moveUp = (): void => {
    const updatedTileList = [...tileList];

    for (let i = 0; i < 4; i++) {
        let columnValues = [
            updatedTileList[i].value,
            updatedTileList[i + 4].value,
            updatedTileList[i + 8].value,
            updatedTileList[i + 12].value,
        ];

        let columnValuesGreaterThanZero = columnValues.filter((num) => num > 0);

        let zeroesNeeded = 4 - columnValuesGreaterThanZero.length;
        let arrOfZeroes = Array(zeroesNeeded).fill(0);

        // Combine the arrays (ONLY DIFFERENCCE BETWEEN LEFT OR RIGHT)
        let arrAfterMovement = columnValuesGreaterThanZero.concat(arrOfZeroes);

        updatedTileList[i].value = arrAfterMovement[0];
        updatedTileList[i + 4].value = arrAfterMovement[1];
        updatedTileList[i + 8].value = arrAfterMovement[2];
        updatedTileList[i + 12].value = arrAfterMovement[3];
    }

    if (gameIsRunning) {
      setTileList(updatedTileList);
    }
  };

  const combineNumbersInRow = () => {
    const updatedTileList = [...tileList];
    
    for (let i = 0; i < (tileList.length - 1); i++) {
        if (updatedTileList[i].value === updatedTileList[i + 1].value) {
          // Combine the total value and update the value of a tile
          updatedTileList[i].value =+ updatedTileList[i].value + updatedTileList[i + 1].value
          // Set the value to 0 to make it a blank tile
          updatedTileList[i + 1].value = 0
        }
    }

    setTileList(updatedTileList)
    }

    const combineNumbersInColumn = () => {
        const updatedTileList = [...tileList];
        
        for (let i = 0; i < 12; i++) {
            if (updatedTileList[i].value === updatedTileList[i + 4].value) {
              // Combine the total value and update the value of a tile
              updatedTileList[i].value =+ updatedTileList[i].value + updatedTileList[i + 4].value
              // Set the value to 0 to make it a blank tile
              updatedTileList[i + 4].value = 0
            }
        }
    
        setTileList(updatedTileList)
        }

    const handleKeyUp = (event: KeyboardEvent) => {
        // TODO: Fix so that the windows doesnt scroll or change keys from arrowkeys
        event.preventDefault()
        
        // TODO: Update score + moves with every correct move

        if (event.key === 'ArrowRight' || event.key === "d" || event.key ==="D") {
            moveRight()
            combineNumbersInRow()
            moveRight()
            generateNewValueTile()
        }

        if (event.key === 'ArrowLeft' || event.key === "a" || event.key ==="A") {
            moveLeft()
            combineNumbersInRow()
            moveLeft()
            generateNewValueTile()
        }

        if (event.key === 'ArrowDown' || event.key === "s" || event.key ==="S") {
            moveDown()
            combineNumbersInColumn()
            moveDown()
            generateNewValueTile()
        }

        if (event.key === 'ArrowUp' || event.key === "w" || event.key ==="W") {
            moveUp()
            combineNumbersInColumn()
            moveUp()
            generateNewValueTile()
        }
    }


  useEffect(() => {
    if (tileList.length === 16 && !gameIsRunning) {
    /* Changing the value of two tiles to 2 before starting */
      generateNewValueTile();
      generateNewValueTile();

      setGameIsRunning(true);
      // Adding eventListener so that the player can play with their keyboard
      window.addEventListener('keyup', handleKeyUp)

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
