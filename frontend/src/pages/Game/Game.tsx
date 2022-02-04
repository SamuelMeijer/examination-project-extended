import React from "react";
import Styles from "./game.module.css";

export default function Game() {
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
        <div className={Styles.scoreBoard}>
          <div className={Styles.scoreBoardPoints}>
            <h3>Poäng</h3>
            <p>0</p>
          </div>
          <div className={Styles.scoreBoardPoints}>
            <h3>Drag</h3>
            <p>0</p>
          </div>
        </div>
        <div className={Styles.gameBoard}>
          {/* TODO: Add bricks */}
        </div>
      </div>

      <div className={Styles.highscoreContainer}>
        <div className={Styles.colorDivider}>
          <h2>Highscore</h2>
        </div>
        <h3 className={Styles.playerHighscoreTitle}>Din bästa omgång</h3>
        <div className={Styles.playerHighscore}>
        <div className={Styles.scoreBoardPoints}>
            <h3>Poäng</h3>
            <p>0</p>
          </div>
          <div className={Styles.scoreBoardPoints}>
            <h3>Drag</h3>
            <p>0</p>
          </div>
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
                {/* TODO: ADD DATA FROM DB */}
                <tr>
                  <td>PLAYER A</td>
                  <td>1337</td>
                  <td>26</td>
                </tr>
                <tr>
                  <td>PLAYER A</td>
                  <td>1337</td>
                  <td>26</td>
                </tr>
                <tr>
                  <td>PLAYER A</td>
                  <td>1337</td>
                  <td>26</td>
                </tr>
                <tr>
                  <td>PLAYER A</td>
                  <td>1337</td>
                  <td>26</td>
                </tr>
                <tr>
                  <td>PLAYER A</td>
                  <td>1337</td>
                  <td>26</td>
                </tr>
              </tbody>
            </table>
        </div>
      </div>
    </section>
  );
}
