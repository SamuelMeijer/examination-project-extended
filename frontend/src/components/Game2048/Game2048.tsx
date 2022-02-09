import React, { useState, useEffect, useReducer, useRef } from "react";
import Styles from "./game2048.module.css";

// Importing components
import Tile from "./Tile/Tile";
import StyledButton from "../StyledButton/StyledButton";
// Importing models
import { TileInterface } from "./Tile/models/Tile";
// Importing utils
import { startNewGame, handleMovement } from "./gameLogic/gameLogic";

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

export interface gameStatusInterface {
  isRunning: boolean,
  message: string
}

// TODO: Add logic for user being logged in or not
export default function Game2048() {
  const [gameStatus, _setGameStatus] = useState<gameStatusInterface>({isRunning: false, message: 'Starta ett nytt spel'});
  const [tileList, _setTileList] = useState<TileInterface[]>([]);

  const initialScoreBoardState: ScoreBoardInterface = { score: 0, moves: 0 };
  const [scoreBoard, scoreBoardDispatch] = useReducer(
    scoreBoardReducer,
    initialScoreBoardState
  );

  // Using useRef to make eventlistener able to access current value of states
  const gameStatusRef = useRef(gameStatus);
  const setGameStatus = (data: gameStatusInterface) => {
    gameStatusRef.current = data;
    _setGameStatus(data);
  };

  const tileListRef = useRef(tileList);
  const setTileList = (data: TileInterface[]) => {
    tileListRef.current = data;
    _setTileList(data);
  };

  const handleOnClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    startNewGame(setTileList, scoreBoardDispatch, setGameStatus);
  };

  const handleKeyUp = function (event: KeyboardEvent) {
    // TODO: Fix so that the windows doesnt scroll or change keys from arrowkeys
    event.preventDefault();

    /* This is what happens:
      1- Move all tiles to the DIRECTION side of the board
      2- Check for possible merges
      3- Update scoreboard
      4- Check if the player won
      5- Move all tiles to the DIRECTION side of the board after merges
      6- Check if the player lost
      7- Generate a new tile on an empty slot (if player did not lose)
    */
    // Prevent event from running if game is not active
    if (gameStatusRef.current.isRunning) {
      if ( event.key === "ArrowRight" || event.key === "d" || event.key === "D") {
        handleMovement(
          "Right",
          tileListRef.current,
          setTileList,
          gameStatusRef.current,
          setGameStatus,
          scoreBoardDispatch
        );
      }

      if (event.key === "ArrowLeft" || event.key === "a" || event.key === "A") {
        handleMovement(
          "Left",
          tileListRef.current,
          setTileList,
          gameStatusRef.current,
          setGameStatus,
          scoreBoardDispatch
        );
      }

      if (event.key === "ArrowDown" || event.key === "s" || event.key === "S") {
        handleMovement(
          "Down",
          tileListRef.current,
          setTileList,
          gameStatusRef.current,
          setGameStatus,
          scoreBoardDispatch
        );
      }

      if (event.key === "ArrowUp" || event.key === "w" || event.key === "W") {
        handleMovement(
          "Up",
          tileListRef.current,
          setTileList,
          gameStatusRef.current,
          setGameStatus,
          scoreBoardDispatch
        );
      }
    }
  };

  useEffect(() => {
    if (gameStatusRef.current.isRunning) {
      window.addEventListener("keyup", handleKeyUp, true);
    } else {
      // Currently not working -> Stoping event from executing instead.
      window.removeEventListener("keyup", handleKeyUp, true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameStatusRef.current]);

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
        {!gameStatusRef.current.isRunning ? (
          <div className={Styles.preGameContainer}> 
            <h3>{gameStatusRef.current.message}</h3>
            {/* TODO: REPLACE WITH <StyledButton textInput="Spela" colorInput="#FFC66C" onClick={startNewGame}/> */}
            <button value={gameStatusRef.current.message === 'Starta ett nytt spel' ? "Spela" : "Spela igen"} onClick={handleOnClick}>
              {gameStatusRef.current.message === 'Starta ett nytt spel' ? "Spela" : "Spela igen"}
            </button>
          </div>
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
