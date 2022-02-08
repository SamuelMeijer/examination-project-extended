import { TileInterface } from "../Tile/models/Tile";

export const moveHorizontal = (
  direction: string,
  tileList: TileInterface[],
  setTileList: Function,
  gameIsRunning: boolean
): void => {
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

      // Combine the arrays depending on direction
      let arrAfterMovement = [];
      switch (direction) {
        case "Right":
          arrAfterMovement = arrOfZeroes.concat(rowValuesGreaterThanZero);
          break;
        case "Left":
          arrAfterMovement = rowValuesGreaterThanZero.concat(arrOfZeroes);
          break;
      }

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

export const moveVertical = (
  direction: string,
  tileList: TileInterface[],
  setTileList: Function,
  gameIsRunning: boolean
): void => {
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

    // Combine the arrays depending on direction
    let arrAfterMovement = [];
    switch (direction) {
      case "Up":
        arrAfterMovement = columnValuesGreaterThanZero.concat(arrOfZeroes);
        break;
      case "Down":
        arrAfterMovement = arrOfZeroes.concat(columnValuesGreaterThanZero);
        break;
    }

    updatedTileList[i].value = arrAfterMovement[0];
    updatedTileList[i + 4].value = arrAfterMovement[1];
    updatedTileList[i + 8].value = arrAfterMovement[2];
    updatedTileList[i + 12].value = arrAfterMovement[3];
  }

  if (gameIsRunning) {
    setTileList(updatedTileList);
  }
};

export const combineNumbersInRow = (
  tileList: TileInterface[],
  setTileList: Function
) => {
  const updatedTileList = [...tileList];

  // Keeping track of the total value of merged tiles
  let mergedTileValue = 0

  for (let i = 0; i < tileList.length - 1; i++) {
    if (updatedTileList[i].value === updatedTileList[i + 1].value && updatedTileList[i].value !== 0) {
      // Combine the total value and update the value of a tile
      updatedTileList[i].value += updatedTileList[i + 1].value;
      // Set the value to 0 to make it a blank tile
      updatedTileList[i + 1].value = 0;

      // Updating value of merged tiles
      mergedTileValue += updatedTileList[i].value
    } 
  }

  setTileList(updatedTileList);

  // TODO: Add scoreboard dispatch!
  // Returning to enable updating scoreboard
  return mergedTileValue
};

export const combineNumbersInColumn = (
  tileList: TileInterface[],
  setTileList: Function
) => {
  const updatedTileList = [...tileList];

  // Keeping track of the total value of merged tiles
  let mergedTileValue = 0

  for (let i = 0; i < 12; i++) {
    if (updatedTileList[i].value === updatedTileList[i + 4].value && updatedTileList[i].value !== 0) {
      // Combine the total value and update the value of a tile
      updatedTileList[i].value += updatedTileList[i + 4].value;
      // Set the value to 0 to make it a blank tile
      updatedTileList[i + 4].value = 0;

      // Updating value of merged tiles
      mergedTileValue += updatedTileList[i].value
    }
  }


  setTileList(updatedTileList);

  // TODO: Add scoreboard dispatch!
  // Returning to enable updating scoreboard
  return mergedTileValue
};

// Generates a new tile with the value 2 on an empty slot (tile with value = 0).
export const generateNewValueTile = (
  tileList: TileInterface[],
  setTileList: Function
): void => {
  // TODO: Add check to see if all tiles have a value > 0 => Game is lost!

  const updatedTileList = [...tileList];
  const randomNumber = Math.floor(Math.random() * tileList.length);

  if (updatedTileList[randomNumber].value === 0) {
    updatedTileList[randomNumber].value = 2;

    setTileList(updatedTileList);
  } else generateNewValueTile(tileList, setTileList);
};
