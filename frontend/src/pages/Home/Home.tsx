import React from "react";
import Styles from "./home.module.css";

import StyledButton from "../../components/StyledButton/StyledButton";

export default function Home() {
  return (
    <section className={Styles.contentContainer}>
      <section className={`${Styles.contentBoxContainer} ${Styles.topContent}`}>
        <div className={`${Styles.innerContentContainer} ${Styles.innerLeft}`}>
          <div className={Styles.colorDivider}>
            <h2>Om oss...</h2>
          </div>
          <p>
          Matteklubben är en intresseförening för personer med ett brinnande intresse för matematik och logisk problemlösning.<br/> 
          Föreningen är liten i storlek och omfattar i dagsläget enbart ett femtiotal medlemmar runt om i Sverige.
          </p>
          <p>
            Föreningen drivs helt ideellt och har som enda syfte att föra samman matteintresserade individer
          </p>
          <p>
            Vi grundades för snart 20 år sedan och kände att vårt jubileum är ett ypperligt tillfälle att ta klivet in i den digitala eran.
          </p>
          <p>Vi är glada över att du hittade hit!</p>
        </div>

        <div className={`${Styles.innerContentContainer} ${Styles.innerRight}`}>
          <p>
            Hemsidan är fortfarande i sin linda men är i framtiden tänkt att fungera som en samlingsplats för våra medlemmar.<br/>
            Vi planerar för att öppna ett forum där diverse matterelaterade diskusioner kan hållas.
          </p>
          <p>
            Är du en matematikintresserad individ?<br/> 
            Gillar du logiskt tänkande och problemlösning?<br/>
            Då har du hittat rätt!<br/> 
            Med ett knapptryck kan du bli en del av gemenskapen!
          </p>
          <StyledButton textInput="Bli Medlem" colorInput="#F78632" pathName="profile"/>
          <div className={Styles.colorDivider} />
        </div>
      </section>

      <section className={`${Styles.contentBoxContainer} ${Styles.midContent}`}>
        <div className={`${Styles.innerContentContainer} ${Styles.innerLeft}`}>
          <div className={Styles.colorDivider}>
            <h2>2048</h2>
          </div>
          <p>
            Här kan du spela våra medlemmars favoritspel, 2048!
          </p>
          <p>
            2048  är ett pusselspel med en spelplan bestående av totalt 16 rutor i mönstret 4x4.<br/>
            Vid spelstart blir två slumpmässigt valda rutor tilldelade spelbrickor med värdet två.<br/>
            
          </p>
          <p>
            Spelaren väljer en riktning och alla spelbrickor flyttas så långt åt den riktningen på spelplanen som det går tills de antingen stoppas av spelplanens kant eller en annan spelbricka.
          </p>
          <p>Om två spelbrickor med samma värde krockar slås de ihop<br/>
          En spelbricka kan enbart slås ihop en gång i samma rörelse.</p>
        </div>

        <div className={`${Styles.innerContentContainer} ${Styles.innerRight}`}>
          <p>
          Efter att alla spelbrickor flyttats så långt de kan och eventuella hopslagningar skett genereras en ny spelbricka med värdet två på en tom ruta på spelplanen.<br/>
          Spelaren får återigen välja en riktning alla spelbrickor ska flyttas.
          </p>
          <p>
          Om en spelbricka får värdet 2048 har spelaren vunnit.<br/> 
          Om inga tomma rutor finns när en ny bricka kan genereras och inga tillgängliga hopslagningar finns har spelaren förlorat.
          </p>
          <StyledButton textInput="Spela 2048" colorInput="#FFC66C" pathName="game"/>
          <div className={Styles.colorDivider} />
        </div>
      </section>

      <section className={`${Styles.contentBoxContainer} ${Styles.botContent}`}>
        <div className={`${Styles.innerContentContainer} ${Styles.innerLeft}`}>
          <div className={Styles.colorDivider}>
            <h2>Webbshop</h2>
          </div>
          <p>
            Missa inte chansen!
          </p>
          <p>
            Under en begränsad tidsperiod kommer Matteklubben erbjuda sina skickligaste medlemmar möjliheten att beställa häftiga kläder.
          </p>
          <p>
            Allt du behöver göra är att registrera dig på hemsidan, vinna en spelomgång av 2048.
          </p>
          <p>Sen är det bara att gå in i shopen och klicka hem en superhäftig tröja!</p>
        </div>

        <div className={`${Styles.innerContentContainer} ${Styles.innerRight}`}>
          <p>
            Erbjudandet är för tillfället begränsat till en vara per användare
          </p>
          <p>
            Vi planerar för att i framtiden öka antalet beställbara produkter, både vad gäller mängden beställningar per användare som mängden tillgängliga produkter i webbshopen.
          </p>
          <StyledButton textInput="Visa Shop" colorInput="#FF7F4A" pathName="shop" />
          <div className={Styles.colorDivider} />
        </div>
      </section>
    </section>
  );
}
