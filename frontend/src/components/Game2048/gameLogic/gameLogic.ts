import { TileInterface } from "../Tile/models/Tile";
import { gameStatusInterface } from "../Game2048";


export const handleMovement = (
  direction: string,
  tileList: TileInterface[],
  setTileList: Function,
  gameStatus: gameStatusInterface,
  setGameStatus: Function,
  scoreBoardDispatch: Function
) => {
  let newScore = 0;
  /* 
    1- Move all tiles to the DIRECTION side of the board
    2- Check for possible merges
  */
  if (direction === "Right" || direction === "Left") {
    moveHorizontal(direction, tileList, setTileList, gameStatus);
    newScore = combineNumbersInRow(tileList, setTileList);
  } else if (direction === "Up" || direction === "Down") {
    moveVertical(direction, tileList, setTileList, gameStatus);
    newScore = combineNumbersInColumn(tileList, setTileList);
  }
  /* 
    3- Update scoreboard
    4- Check if the player won 
  */
  updateScoreBoard(newScore, scoreBoardDispatch);
  checkIfWon(tileList, setGameStatus);
  /* 
    5- Move all tiles to the DIRECTION side of the board after merges
  */
  if (direction === "Right" || direction === "Left") {
    moveHorizontal(direction, tileList, setTileList, gameStatus);
  } else if (direction === "Up" || direction === "Down") {
    moveVertical(direction, tileList, setTileList, gameStatus);
  }
  /* 
    6- Check if the player lost
    7- Generate a new tile on an empty slot (if player did not lose)
  */
  let isLost = checkIfLost(tileList, setGameStatus);

  if (!isLost) {
    generateNewValueTile(tileList, setTileList);
  }
};

export const startNewGame = (
  setTileList: Function,
  scoreBoardDispatch: Function,
  setGameStatus: Function
) => {
  const newArr: TileInterface[] = [];

  // Generating 4x4 new tiles and add them to newArr
  for (let i = 0; i < 4; i++) {
    newArr.push({ value: 0, positionX: 0, positionY: i });
    newArr.push({ value: 0, positionX: 1, positionY: i });
    newArr.push({ value: 0, positionX: 2, positionY: i });
    newArr.push({ value: 0, positionX: 3, positionY: i });
  }

  // Change the value of two tiles to 2, reset scoreboard and start the game
  generateNewValueTile(newArr, setTileList);
  generateNewValueTile(newArr, setTileList);
  scoreBoardDispatch({ type: "reset" });
  setGameStatus({isRunning: true, message: 'inProgress' });
};

const updateScoreBoard = (newScore: number, scoreBoardDispatch: Function) => {
  scoreBoardDispatch({ type: "update", payload: newScore });
};

const checkIfWon = (tileList: TileInterface[], setGameStatus: Function) => {
  const playerWon = tileList.some((tile) => tile.value === 2048);

  if (playerWon) {
    setGameStatus({isRunning: false, message: 'DU VANN!'});
  }
};

const checkIfLost = (
  tileList: TileInterface[],
  setGameStatus: Function
): boolean => {
  const notLost = tileList.find((element) => element.value === 0);

  if (!notLost) {
    setGameStatus({isRunning: false, message: 'Du förlorade!'});
  }

  return !notLost;
};

export const moveHorizontal = (
  direction: string,
  tileList: TileInterface[],
  setTileList: Function,
  gameStatus: gameStatusInterface
) => {
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

  if (gameStatus.isRunning) {
    setTileList(updatedTileList);
  }
};

export const moveVertical = (
  direction: string,
  tileList: TileInterface[],
  setTileList: Function,
  gameStatus: gameStatusInterface
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

  if (gameStatus.isRunning) {
    setTileList(updatedTileList);
  }
};

export const combineNumbersInRow = (
  tileList: TileInterface[],
  setTileList: Function
) => {
  const updatedTileList = [...tileList];

  // Keeping track of the total value of merged tiles
  let mergedTileValue = 0;

  for (let i = 0; i < tileList.length - 1; i++) {
    if (
      updatedTileList[i].value === updatedTileList[i + 1].value &&
      updatedTileList[i].value !== 0
    ) {
      // Combine the total value and update the value of a tile
      updatedTileList[i].value += updatedTileList[i + 1].value;
      // Set the value to 0 to make it a blank tile
      updatedTileList[i + 1].value = 0;

      // Updating value of merged tiles
      mergedTileValue += updatedTileList[i].value;
    }
  }

  setTileList(updatedTileList);

  // Returning to enable updating scoreboard
  return mergedTileValue;
};

export const combineNumbersInColumn = (
  tileList: TileInterface[],
  setTileList: Function
) => {
  const updatedTileList = [...tileList];

  // Keeping track of the total value of merged tiles
  let mergedTileValue = 0;

  for (let i = 0; i < 12; i++) {
    if (
      updatedTileList[i].value === updatedTileList[i + 4].value &&
      updatedTileList[i].value !== 0
    ) {
      // Combine the total value and update the value of a tile
      updatedTileList[i].value += updatedTileList[i + 4].value;
      // Set the value to 0 to make it a blank tile
      updatedTileList[i + 4].value = 0;

      // Updating value of merged tiles
      mergedTileValue += updatedTileList[i].value;
    }
  }

  setTileList(updatedTileList);

  // Returning to enable updating scoreboard
  return mergedTileValue;
};

// Generates a new tile with the value 2 on an empty slot (tile with value = 0).
export const generateNewValueTile = (
  tileList: TileInterface[],
  setTileList: Function
) => {
  const updatedTileList = [...tileList];
  const randomNumber = Math.floor(Math.random() * tileList.length);

  if (updatedTileList[randomNumber].value === 0) {
    updatedTileList[randomNumber].value = 2;

    setTileList(updatedTileList);
  } else generateNewValueTile(tileList, setTileList);
};
