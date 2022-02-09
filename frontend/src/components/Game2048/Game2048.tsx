import React, { useState, useEffect, useReducer, useRef } from "react";
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
type SCOREBOARD_ACTIONTYPE =
  | { type: "update"; payload: number }
  | { type: "reset" };

function scoreBoardReducer(
  state: ScoreBoardInterface,
  action: SCOREBOARD_ACTIONTYPE
) {
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
  const [gameIsRunning, _setGameIsRunning] = useState(false);
  const [tileList, _setTileList] = useState<TileInterface[]>([]);

  const initialScoreBoardState: ScoreBoardInterface = { score: 0, moves: 0 };
  const [scoreBoard, scoreBoardDispatch] = useReducer(
    scoreBoardReducer,
    initialScoreBoardState
  );

  // Using useRef to make eventlistener able to access current value of states
  const gameIsRunningRef = useRef(gameIsRunning);
  const setGameIsRunning = (data: boolean) => {
    gameIsRunningRef.current = data;
    _setGameIsRunning(data);
  };

  const tileListRef = useRef(tileList);
  const setTileList = (data: TileInterface[]) => {
    tileListRef.current = data;
    _setTileList(data);
  };

  const startNewGame = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();

    // Populating the tileList
    const newArr: TileInterface[] = [];

    for (let i = 0; i < 4; i++) {
      newArr.push({ value: 0, positionX: 0, positionY: i });
      newArr.push({ value: 0, positionX: 1, positionY: i });
      newArr.push({ value: 0, positionX: 2, positionY: i });
      newArr.push({ value: 0, positionX: 3, positionY: i });
    }

    generateNewValueTile(newArr, setTileList);
    generateNewValueTile(newArr, setTileList);
    setGameIsRunning(true);
    scoreBoardDispatch({ type: "reset" });
  };

  const updateScoreBoard = (newScore: number): void => {
    scoreBoardDispatch({ type: "update", payload: newScore });
  };

  const checkIfWon = () => {
    const playerWon = tileListRef.current.some((tile) => tile.value === 2048);

    if (playerWon) {
      setGameIsRunning(false);
    }
  };

  const checkIfLost = () => {
    const notLost = tileListRef.current.find((element) => element.value === 0);

    if (!notLost) {
      setGameIsRunning(false);
    }
  };

  const handleKeyUp = function (event: KeyboardEvent) {
    // TODO: Fix so that the windows doesnt scroll or change keys from arrowkeys
    event.preventDefault();

    // Prevent event from running if game is not active
    if (gameIsRunningRef.current) {
      let newScore = 0;
      /* 
    1- Move all tiles to the DIRECTION side of the board
    2- Check for possible merges
    3- Update scoreboard
    4- Check if the player won
    5- Move all tiles to the DIRECTION side of the board after merges
    6- Generate a new tile on an empty slot
    */

      if (
        event.key === "ArrowRight" ||
        event.key === "d" ||
        event.key === "D"
      ) {
        moveHorizontal(
          "Right",
          tileListRef.current,
          setTileList,
          gameIsRunningRef.current
        );
        newScore = combineNumbersInRow(tileListRef.current, setTileList);
        updateScoreBoard(newScore);
        checkIfWon();
        moveHorizontal(
          "Right",
          tileListRef.current,
          setTileList,
          gameIsRunningRef.current
        );
        checkIfLost();
        generateNewValueTile(tileListRef.current, setTileList);
      }

      if (event.key === "ArrowLeft" || event.key === "a" || event.key === "A") {
        moveHorizontal(
          "Left",
          tileListRef.current,
          setTileList,
          gameIsRunningRef.current
        );
        newScore = combineNumbersInRow(tileListRef.current, setTileList);
        updateScoreBoard(newScore);
        checkIfWon();
        moveHorizontal(
          "Left",
          tileListRef.current,
          setTileList,
          gameIsRunningRef.current
        );
        checkIfLost();
        generateNewValueTile(tileListRef.current, setTileList);
      }

      if (event.key === "ArrowDown" || event.key === "s" || event.key === "S") {
        moveVertical(
          "Down",
          tileListRef.current,
          setTileList,
          gameIsRunningRef.current
        );
        newScore = combineNumbersInColumn(tileListRef.current, setTileList);
        updateScoreBoard(newScore);
        checkIfWon();
        moveVertical(
          "Down",
          tileListRef.current,
          setTileList,
          gameIsRunningRef.current
        );
        checkIfLost();
        generateNewValueTile(tileListRef.current, setTileList);
      }

      if (event.key === "ArrowUp" || event.key === "w" || event.key === "W") {
        moveVertical(
          "Up",
          tileListRef.current,
          setTileList,
          gameIsRunningRef.current
        );
        newScore = combineNumbersInColumn(tileListRef.current, setTileList);
        updateScoreBoard(newScore);
        checkIfWon();
        moveVertical(
          "Up",
          tileListRef.current,
          setTileList,
          gameIsRunningRef.current
        );
        checkIfLost();
        generateNewValueTile(tileListRef.current, setTileList);
      }
    }
  };

  useEffect(() => {
    if (gameIsRunning) {
      window.addEventListener("keyup", handleKeyUp, true);
    } else {
      // Currently not working -> Stoping event from executing instead.
      window.removeEventListener("keyup", handleKeyUp, true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameIsRunningRef]);

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
