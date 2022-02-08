import React, { useState, useEffect, useReducer } from "react";
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

// TODO: Move scoreboard reducer and interface!
type ACTIONTYPE =
  | { type: "update"; payload: number }
  | { type: "reset"; payload: number };

function scoreBoardReducer(state: ScoreBoardInterface, action: ACTIONTYPE) {
  switch (action.type) {
    case "update":
      return { score: state.score + action.payload, moves: state.moves++ };
    case "reset":
      return { score: 0, moves: 0 };
    default:
      throw new Error();
  }
}

interface ScoreBoardInterface {
  score: number;
  moves: number;
}

// TODO: Add logic for user being logged in or not
export default function Game2048() {
  const [gameIsRunning, setGameIsRunning] = useState(false);
  const [tileList, setTileList] = useState<TileInterface[]>([]);

  const initialScoreBoardState: ScoreBoardInterface = { score: 0, moves: 0 };
  const [scoreBoard, dispatch] = useReducer(
    scoreBoardReducer,
    initialScoreBoardState
  );

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

  const updateScoreBoard = (newScore: number): void => {
    dispatch({ type: "update", payload: newScore });
  };

  const handleKeyUp = (event: KeyboardEvent) => {
    // TODO: Fix so that the windows doesnt scroll or change keys from arrowkeys
    event.preventDefault();

    let newScore = 0;

    if (event.key === "ArrowRight" || event.key === "d" || event.key === "D") {
      // Move all tiles to the right side of the board
      moveHorizontal("Right", tileList, setTileList, gameIsRunning);
      // Check for possible merges
      newScore = combineNumbersInRow(tileList, setTileList);
      // Update scoreboard
      updateScoreBoard(newScore);
      // Move all tiles to the right side of the board after merges
      moveHorizontal("Right", tileList, setTileList, gameIsRunning);
      // Generate a new tile on an empty slot
      generateNewValueTile(tileList, setTileList);
    }

    if (event.key === "ArrowLeft" || event.key === "a" || event.key === "A") {
      // Move all tiles to the left side of the board
      moveHorizontal("Left", tileList, setTileList, gameIsRunning);
      // Check for possible merges
      newScore = combineNumbersInRow(tileList, setTileList);
      // Update scoreboard
      updateScoreBoard(newScore);
      // Move all tiles to the left side of the board after merges
      moveHorizontal("Left", tileList, setTileList, gameIsRunning);
      // Generate a new tile on an empty slot
      generateNewValueTile(tileList, setTileList);
    }

    if (event.key === "ArrowDown" || event.key === "s" || event.key === "S") {
      // Move all tiles to the bottom side of the board
      moveVertical("Down", tileList, setTileList, gameIsRunning);
      // Check for possible merges
      newScore = combineNumbersInColumn(tileList, setTileList);
      // Update scoreboard
      updateScoreBoard(newScore);
      // Move all tiles to the bottom side of the board after merges
      moveVertical("Down", tileList, setTileList, gameIsRunning);
      // Generate a new tile on an empty slot
      generateNewValueTile(tileList, setTileList);
    }

    if (event.key === "ArrowUp" || event.key === "w" || event.key === "W") {
      // Move all tiles to the top side of the board
      moveVertical("Up", tileList, setTileList, gameIsRunning);
      // Check for possible merges
      newScore = combineNumbersInColumn(tileList, setTileList);
      // Update scoreboard
      updateScoreBoard(newScore);
      // Move all tiles to the top side of the board
      moveVertical("Up", tileList, setTileList, gameIsRunning);
      // Generate a new tile on an empty slot
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
  }, [tileList.length]);

  return (
    <div className={Styles.gameContainer}>
      <div className={Styles.scoreBoard}>
        <div className={Styles.scoreBoardPoints}>
          <h3>Poäng</h3>
          <p>{scoreBoard.score}</p>
        </div>
        <div className={Styles.scoreBoardPoints}>
          <h3>Drag</h3>
          <p>{scoreBoard.moves}</p>
        </div>
      </div>

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
    </div>
  );
}
