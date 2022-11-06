import React, { useState, useEffect, useReducer, useRef } from "react";
import Styles from "./game2048.module.css";

// Importing components
import Tile from "./Tile/Tile";
// Importing models
import { TileInterface } from "./Tile/models/Tile";
// Importing utils
import { startNewGame, handleMovement } from "./gameLogic/gameLogic";
// Importing hooks
import { useAuthenticatedUser } from "../../hooks/authenticatedUserHook";
import { useAuthenticatedUserHighscore, useUpdateAuthenticatedUserHighscore } from "../../hooks/authenticatedUserHighscoreHook";

// Component based hooks
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

export default function Game2048() {
  const authenticatedUser = useAuthenticatedUser();
  const authenticatedUserHighscore = useAuthenticatedUserHighscore();
  const updateAuthenticatedUserHighscore = useUpdateAuthenticatedUserHighscore();

  const [gameStatus, _setGameStatus] = useState<gameStatusInterface>({isRunning: false, message: 'Starta ett nytt spel'});
  const [tileList, _setTileList] = useState<TileInterface[]>([]);
  const [preventMovement, _setPreventMovement] = useState<boolean>(false);

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

  const preventMovementRef = useRef(preventMovement);
  const setPreventMovement = (data: boolean) => {
    preventMovementRef.current = data;
    _setPreventMovement(data);
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
    if (gameStatusRef.current.isRunning && !preventMovementRef.current) {
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

      // Limiting the number of moves to 4 per second
      setPreventMovement(true)
      setTimeout(()=> setPreventMovement(false), 250)
    }
  };

  useEffect(() => {
    if (gameStatusRef.current.isRunning) {
      // Adding eventlistener to enable playing the game
      window.addEventListener("keyup", handleKeyUp, true);
    } else {
      // Evalutating if game is not running because the player won or lost and a user is logged in
      if ((gameStatusRef.current.message === 'DU VANN!' && authenticatedUser) || (gameStatusRef.current.message === 'Du förlorade!' && authenticatedUser)) {
        // User already exists in the highscore AND the users highscore is less than current score -> Update
        if (authenticatedUserHighscore && authenticatedUserHighscore.attributes.points < scoreBoard.score) {
          // Evaluate if player won
          const didPlayerWin = gameStatusRef.current.message === 'DU VANN!'

          const reqBody = {
            username: authenticatedUser.user.username,
            points: scoreBoard.score,
            moves: scoreBoard.moves,
            didWin: didPlayerWin
          }
  
          fetch(`http://localhost:1337/api/highscores/${authenticatedUserHighscore.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authenticatedUser?.jwt}`,
          },
          body: JSON.stringify({data: reqBody}),
        })
          .then((res) => {
            if (!res.ok) {
              throw Error(res.statusText);
            } else {
              return res.json();
            }
          })
          .then((data) => {
            // Updating players highscore
            updateAuthenticatedUserHighscore(data.data)
          })
          .catch((err) => {
            console.error(err);
          });

          
        } else {
          // User does not already exist in highscore -> Add
          const didPlayerWin = gameStatusRef.current.message === 'DU VANN!'

          const reqBody = {
            username: authenticatedUser.user.username,
            points: scoreBoard.score,
            moves: scoreBoard.moves,
            didWin: didPlayerWin
          }
  
          fetch(`http://localhost:1337/api/highscores`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authenticatedUser?.jwt}`,
          },
          body: JSON.stringify({data: reqBody}),
        })
          .then((res) => {
            if (!res.ok) {
              throw Error(res.statusText);
            } else {
              return res.json();
            }
          })
          .then((data) => {
            // Adding players highscore
            updateAuthenticatedUserHighscore(data.data)
          })
          .catch((err) => {
            console.error(err);
          });
        }
        
      }

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
            <button value={gameStatusRef.current.message === 'Starta ett nytt spel' ? "Spela" : "Spela igen"} onClick={handleOnClick}>
              <span className={Styles.white}>
                {gameStatusRef.current.message === 'Starta ett nytt spel' ? "Spela" : "Spela igen"}
              </span>
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
                hasMerged={tile.hasMerged}
              />
            );
          })
        )}
      </div>
    </div>
  );
}
