import React from "react";
import Styles from "./game2048.module.css";

import Tile from "./Tile/Tile";

// TODO: Add logic for user being logged in or not
export default function Game2048() {
  const tileList: { value: number; positionX: number; positionY: number }[] =
    [];

  // Generates a new tile with the value 2 on an empty slot (tile with value = 0).
  const generateNewValueTile = (): void => {
    // TODO: Add check to see if all tiles have a value > 0

    const randomNumber = Math.floor(Math.random() * tileList.length);

    if (tileList[randomNumber].value === 0) {
      tileList[randomNumber].value = 2;
    } else generateNewValueTile();
  };

  const populateTileList = (): void => {
    for (let i = 0; i < 4; i++) {
      tileList.push({ value: 0, positionX: 0, positionY: i });
      tileList.push({ value: 0, positionX: 1, positionY: i });
      tileList.push({ value: 0, positionX: 2, positionY: i });
      tileList.push({ value: 0, positionX: 3, positionY: i });
    }
  };

  populateTileList();

  /* Calling to generate two new tiles (game start) */
  generateNewValueTile();
  generateNewValueTile();

  return (
    <div className={Styles.gameGrid}>
      {tileList.map((tile, index) => {
        return (
          <Tile
            key={index}
            value={tile.value}
            positionX={tile.positionX}
            positionY={tile.positionY}
          />
        );
      })}
    </div>
  );
}
