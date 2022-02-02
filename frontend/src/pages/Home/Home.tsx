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
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
            maximus enim eget metus lacinia, sed ultrices mi efficitur.
            Phasellus tortor elit, semper in placerat vitae, dictum eget arcu.
          </p>
          <p>
            In vitae placerat massa. Nullam dui ex, commodo sed neque id, ornare
            suscipit nunc. Curabitur egestas dignissim luctus. Sed aliquet
            tincidunt quam, euismod ultrices dolor lobortis ut. Vestibulum ante
            ipsum primis in faucibus orci luctus et ultrices posuere cubilia
            curae;
          </p>
          <p>
            Nunc blandit dui eget lacus rhoncus, id lacinia lorem pharetra.
            Donec sollicitudin molestie magna, in iaculis lacus facilisis nec.
            Duis sollicitudin gravida purus. Vivamus lacinia id lectus vitae
            tincidunt. Nunc vitae vestibulum dui.Lorem ipsum dolor sit amet,
            consectetur adipiscing elit.
          </p>
          <p>Quisque maximus enim eget metus lacinia, sed ultrices mi.</p>
        </div>

        <div className={`${Styles.innerContentContainer} ${Styles.innerRight}`}>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
            maximus enim eget metus lacinia, sed ultrices mi efficitur.
            Phasellus tortor elit, semper in placerat vitae, dictum eget arcu.
          </p>
          <p>
            In vitae placerat massa. Nullam dui ex, commodo sed neque id, ornare
            suscipit nunc. Curabitur egestas dignissim luctus. Sed aliquet
            tincidunt quam, euismod ultrices dolor lobortis ut. Vestibulum ante
            ipsum primis in faucibus orci luctus et ultrices posuere cubilia
            curae;
          </p>
          <StyledButton textInput="Bli Medlem" colorInput="#F78632" />
          <div className={Styles.colorDivider} />
        </div>
      </section>

      <section className={`${Styles.contentBoxContainer} ${Styles.midContent}`}>
        <div className={`${Styles.innerContentContainer} ${Styles.innerLeft}`}>
          <div className={Styles.colorDivider}>
            <h2>Om oss...</h2>
          </div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
            maximus enim eget metus lacinia, sed ultrices mi efficitur.
            Phasellus tortor elit, semper in placerat vitae, dictum eget arcu.
          </p>
          <p>
            In vitae placerat massa. Nullam dui ex, commodo sed neque id, ornare
            suscipit nunc. Curabitur egestas dignissim luctus. Sed aliquet
            tincidunt quam, euismod ultrices dolor lobortis ut. Vestibulum ante
            ipsum primis in faucibus orci luctus et ultrices posuere cubilia
            curae;
          </p>
          <p>
            Nunc blandit dui eget lacus rhoncus, id lacinia lorem pharetra.
            Donec sollicitudin molestie magna, in iaculis lacus facilisis nec.
            Duis sollicitudin gravida purus. Vivamus lacinia id lectus vitae
            tincidunt. Nunc vitae vestibulum dui.Lorem ipsum dolor sit amet,
            consectetur adipiscing elit.
          </p>
          <p>Quisque maximus enim eget metus lacinia, sed ultrices mi.</p>
        </div>

        <div className={`${Styles.innerContentContainer} ${Styles.innerRight}`}>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
            maximus enim eget metus lacinia, sed ultrices mi efficitur.
            Phasellus tortor elit, semper in placerat vitae, dictum eget arcu.
          </p>
          <p>
            In vitae placerat massa. Nullam dui ex, commodo sed neque id, ornare
            suscipit nunc. Curabitur egestas dignissim luctus. Sed aliquet
            tincidunt quam, euismod ultrices dolor lobortis ut. Vestibulum ante
            ipsum primis in faucibus orci luctus et ultrices posuere cubilia
            curae;
          </p>
          <StyledButton textInput="Spela 2048" colorInput="#FFC66C" />
          <div className={Styles.colorDivider} />
        </div>
      </section>

      <section className={`${Styles.contentBoxContainer} ${Styles.botContent}`}>
        <div className={`${Styles.innerContentContainer} ${Styles.innerLeft}`}>
          <div className={Styles.colorDivider}>
            <h2>Om oss...</h2>
          </div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
            maximus enim eget metus lacinia, sed ultrices mi efficitur.
            Phasellus tortor elit, semper in placerat vitae, dictum eget arcu.
          </p>
          <p>
            In vitae placerat massa. Nullam dui ex, commodo sed neque id, ornare
            suscipit nunc. Curabitur egestas dignissim luctus. Sed aliquet
            tincidunt quam, euismod ultrices dolor lobortis ut. Vestibulum ante
            ipsum primis in faucibus orci luctus et ultrices posuere cubilia
            curae;
          </p>
          <p>
            Nunc blandit dui eget lacus rhoncus, id lacinia lorem pharetra.
            Donec sollicitudin molestie magna, in iaculis lacus facilisis nec.
            Duis sollicitudin gravida purus. Vivamus lacinia id lectus vitae
            tincidunt. Nunc vitae vestibulum dui.Lorem ipsum dolor sit amet,
            consectetur adipiscing elit.
          </p>
          <p>Quisque maximus enim eget metus lacinia, sed ultrices mi.</p>
        </div>

        <div className={`${Styles.innerContentContainer} ${Styles.innerRight}`}>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
            maximus enim eget metus lacinia, sed ultrices mi efficitur.
            Phasellus tortor elit, semper in placerat vitae, dictum eget arcu.
          </p>
          <p>
            In vitae placerat massa. Nullam dui ex, commodo sed neque id, ornare
            suscipit nunc. Curabitur egestas dignissim luctus. Sed aliquet
            tincidunt quam, euismod ultrices dolor lobortis ut. Vestibulum ante
            ipsum primis in faucibus orci luctus et ultrices posuere cubilia
            curae;
          </p>
          <StyledButton textInput="Visa Shop" colorInput="#FF7F4A" />
          <div className={Styles.colorDivider} />
        </div>
      </section>
    </section>
  );
}
