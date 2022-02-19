import React, { useEffect, useState } from "react";
import Styles from "./game.module.css";

import Game2048 from "../../components/Game2048/Game2048";

// Importing hooks
import {
  useAuthenticatedUser
} from "../../hooks/authenticatedUserHook";

interface highScoreInterface {
  attributes: {
    username: string,
    points: number,
    moves: number,
    didWin: boolean,
  },
  id: number,
}

export default function Game() {
  const authenticatedUser = useAuthenticatedUser();

  const [highscoreList, setHighscoreList] = useState<highScoreInterface[]>([])
  const [topFiveHighscore, setTopFiveHighscoreList] = useState<highScoreInterface[]>([])
  const [playerHighscore, setPlayerHighscore] = useState<highScoreInterface>({attributes: {
    username: '',
    points: 0,
    moves: 0,
    didWin: false,
  },
  id: 0,})

  useEffect(() => {
    // Fetching highscorelist
    fetch("http://localhost:1337/api/highscores")
      .then((res) => {
        if (!res.ok) {
          throw Error(res.statusText);
        } else {
          return res.json();
        }
      })
      .then((data) => {
        // Check if the authenticated user is included
        const userHighScore = data.data.find((element: any) => element.attributes.username === authenticatedUser?.user.username)

        if (userHighScore) {
          setPlayerHighscore(userHighScore)
        }
        const topFive = data.data.filter((element: any, index: number) => index < 5)
        setTopFiveHighscoreList(topFive)
        setHighscoreList(data.data)
      })
      .catch((err) => console.error(err));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <section className={Styles.gameContentContainer}>
      <div className={Styles.instructionsContainer}>
        <div className={Styles.colorDivider}>
          <h2>Instruktioner</h2>
        </div>

        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
          maximus enim eget metus lacinia, sed ultrices mi efficitur. Phasellus
          tortor elit, semper in placerat vitae, dictum eget arcu.
        </p>

        <p>
          In vitae placerat massa. Nullam dui ex, commodo sed neque id, ornare
          suscipit nunc. Curabitur egestas dignissim luctus. Sed aliquet
          tincidunt quam, euismod ultrices dolor lobortis ut. Vestibulum ante
          ipsum primis in faucibus orci luctus et ultrices posuere cubilia
          curae.
        </p>
      </div>

      <div className={Styles.gameContainer}>
        <div className={Styles.colorDivider}>
          <h2>2048</h2>
        </div>
        <div className={Styles.gameBoardContainer}>
          <Game2048 />
        </div>
      </div>

      <div className={Styles.highscoreContainer}>
        <div className={Styles.colorDivider}>
          <h2>Highscore</h2>
        </div>
        <h3 className={Styles.playerHighscoreTitle}>Din bästa omgång</h3>
          { authenticatedUser ?
            <div className={Styles.playerHighscore}>
              <div className={Styles.scoreBoardPoints}>
                <h3>Poäng</h3>
                <p>{playerHighscore.attributes.points ? playerHighscore.attributes.points : 0}</p>
              </div>
              <div className={Styles.scoreBoardPoints}>
                <h3>Drag</h3>
                <p>{playerHighscore.attributes.moves ? playerHighscore.attributes.moves : 0}</p>
              </div>
            </div>
          :
            <div className={Styles.playerHighscore}>
              <div className={Styles.scoreBoardPoints}>
                <p>Du är inte inloggad</p>
              </div>
            </div>
          }
      </div>

        <div className={Styles.highscoreListContainer}>
            <table className={Styles.highscoreList}>
              <thead>
                <tr>
                  <th>Namn</th>
                  <th>Poäng</th>
                  <th>Rörelser</th>
                </tr>
              </thead>
              <tbody>
                {/* Adding data top5 data from highscore */}
                {topFiveHighscore.map((element, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}. {element.attributes.username}</td>
                      <td>{element.attributes.points}</td>
                      <td>{element.attributes.moves}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
        </div>
    </section>
  );
}
