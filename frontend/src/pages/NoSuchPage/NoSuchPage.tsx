import React from "react";
import Styles from "./noSuchPage.module.css";

export default function NoSuchPage() {
  return (
    <section className={Styles.contentContainer}>
      <section className={`${Styles.contentBoxContainer} ${Styles.midContent}`} >
            <div
              className={`${Styles.innerContentContainer} ${Styles.innerLeft}`}
            >
              <div className={Styles.colorDivider}>
                <h2>Sorry, error...</h2>
              </div>
              <p>
              No such page exists
              </p>
              <p>
              Are you sure you have entered the correct URL?
              </p>
            </div>
      </section>
    </section>
    );
}
