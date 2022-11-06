import React, { useEffect, useState } from "react";
import Styles from "./game.module.css";

import Game2048 from "../../components/Game2048/Game2048";

// Importing hooks
import { useAuthenticatedUser } from "../../hooks/authenticatedUserHook";
import { useAuthenticatedUserHighscore, highScoreInterface } from '../../hooks/authenticatedUserHighscoreHook'

export default function Game() {
  const authenticatedUser = useAuthenticatedUser();
  const authenticatedUserHighscore = useAuthenticatedUserHighscore();

  const [topFiveHighscore, setTopFiveHighscoreList] = useState<highScoreInterface[]>([]);

  useEffect(() => {
    // qs = querystring
    const qs = require('qs');
    // Sorting the results by the value of didWin, if two or more users has the same value on 'didWin' sort by highest points
    const query = qs.stringify({
      sort: ['didWin:desc', 'points:desc']
    })

    // Fetching highscorelist
    fetch(`http://localhost:1337/api/highscores?${query}`)
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
        setTopFiveHighscoreList(topFive);
      })
      .catch((err) => console.error(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className={Styles.gameContentContainer}>
      <div className={Styles.instructionsContainer}>
        <div className={Styles.headingContainer}>
          <h2>Instruktioner</h2>
          <div className={Styles.colorDivider} />
        </div>

        <p>
        2048 är ett pusselspel med en spelplan bestående av totalt 16 rutor i mönstret 4x4. <br/> 
        Vid spelstart blir två slumpmässigt valda rutor tilldelade spelbrickor med värdet två.<br/>
        Spelaren väljer sedan en riktning med piltangerna<br/> 
        eller W, A, S, D och alla spelbrickor flyttas så långt åt den riktningen på spelplanen som det går tills de antingen stoppas av spelplanens kant eller en annan spelbricka.
        </p>

        <p>
        Om två spelbrickor med samma värde krockar slås de ihop, värdet av den hopslagna spelbrickan läggs till spelarens poäng.<br/> 
        En spelbricka kan enbart slås ihop en gång i samma rörelse.<br/>
        Efter att alla spelbrickor flyttats så långt de kan och eventuella hopslagningar skett genereras en ny spelbricka med värdet två på en tom ruta på spelplanen.<br/>
        Spelaren får återigen välja en riktning alla spelbrickor ska flyttas. <br/>
        Om en spelbricka får värdet 2048 har spelaren vunnit.<br/>
        Om inga tomma rutor finns när en ny bricka kan genereras och inga tillgängliga hopslagningar finns har spelaren förlorat.
        </p>
      </div>

      <div className={Styles.gameContainer}>
        <div className={Styles.headingContainer}>
          <h2>2048</h2>
          <div className={Styles.colorDivider} />
        </div>
        <div className={Styles.gameBoardContainer}>
          <Game2048 />
        </div>
      </div>

      <div className={Styles.highscoreListContainer}>
        <div className={Styles.headingContainer}>
          <h2>Highscore</h2>
          <div className={Styles.colorDivider} />
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
