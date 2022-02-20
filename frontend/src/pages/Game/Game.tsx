import React, { useEffect, useState } from "react";
import Styles from "./game.module.css";

import Game2048 from "../../components/Game2048/Game2048";

// Importing hooks
import { useAuthenticatedUser } from "../../hooks/authenticatedUserHook";
import { useAuthenticatedUserHighscore, highScoreInterface } from '../../hooks/authenticatedUserHighscoreHook'

// TODO: NEED THIS COMPONENT TO REFRESH ONCE HIGHSCORE IS UPDATED FOR USER
export default function Game() {
  const authenticatedUser = useAuthenticatedUser();
  const authenticatedUserHighscore = useAuthenticatedUserHighscore();

  const [topFiveHighscore, setTopFiveHighscoreList] = useState<highScoreInterface[]>([]);

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
        const topFive = data.data.filter(
          (element: any, index: number) => index < 5
        );
        // TODO: SORT BY SCORE / DIDWIN
        setTopFiveHighscoreList(topFive);
      })
      .catch((err) => console.error(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

      <div className={Styles.highscoreListContainer}>
        <div className={Styles.colorDivider}>
          <h2>Highscore</h2>
        </div>
        <h3 className={Styles.playerHighscoreTitle}>Din bästa omgång</h3>
        {authenticatedUser ? (
          <div className={Styles.playerHighscore}>
            {authenticatedUserHighscore ? (
              <div className={Styles.playerHighscoreContent}>
                <div className={Styles.scoreBoardPoints}>
                  <h3>Poäng</h3>
                  <p>
                    {authenticatedUserHighscore.attributes.points}
                  </p>
                </div>
                <div className={Styles.scoreBoardPoints}>
                  <h3>Drag</h3>
                  <p>
                    {authenticatedUserHighscore.attributes.moves}
                  </p>
                </div>
              </div>
            ) : ( 
              <div className={Styles.playerHighscoreContent}>
              <div className={Styles.scoreBoardPoints}>
                <h3>Poäng</h3>
                <p>
                  0
                </p>
              </div>
              <div className={Styles.scoreBoardPoints}>
                <h3>Drag</h3>
                <p>
                  0
                </p>
              </div>
            </div>
            )}
          </div>
        ) : (
          <div className={Styles.playerHighscoreContent}>
              <h3>Du är inte inloggad</h3>
          </div>
        )}
      </div>

      <div className={Styles.highscoreListContainer}>
        <table className={Styles.highscoreList}>
          <thead>
            <tr>
              <th>Namn</th>
              <th>Poäng</th>
              <th>Rörelser</th>
              <th>2048</th>
            </tr>
          </thead>
          <tbody>
            {/* Adding data top5 data from highscore */}
            {topFiveHighscore.map((element, index) => {
              return (
                <tr key={index}>
                  <td>
                    {index + 1}. {element.attributes.username}
                  </td>
                  <td>{element.attributes.points}</td>
                  <td>{element.attributes.moves}</td>
                  {element.attributes.didWin? <td>Ja</td> : <td>Nej</td>}
                  
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
