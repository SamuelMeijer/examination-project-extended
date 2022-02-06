import React from "react";
import Styles from "./profile.module.css";

import { FaUserAstronaut } from "react-icons/fa";
import StyledButton from "../../components/StyledButton/StyledButton";


// TODO: Add logic for user being logged in or not
export default function Profile() {
  return (
    <section className={Styles.profileContentContainer}>
      <div className={Styles.userInformationContainer}>
        <div className={Styles.colorDivider}>
          {/* TODO: Make dynamic */}
          <h2>Användarnamn</h2>
        </div>

        <div className={Styles.userInformationContent}>
          <div className={Styles.userInformationText}>
            <p>
              Din information:
              <br />
              Användarnamn: ANVÄNDARNAMN
              <br />
              Registerad epost: EPOST@EPOST.com
            </p>

            <p>
              Statistik
              <br />
              Din bästa spelomgång
              <br />
              Poäng: 1337
              <br />
              Antal drag: 12
            </p>

            <p>
              Antal spelade omgångar: 24
              <br />
              Antal spel med 2048: 0
            </p>

            <p>Tillgänglig webbshopkredit: 4 π</p>
          </div>
          <div className={Styles.userPictureContainer}>
          <FaUserAstronaut fontSize="150px" />
          </div>
        </div>
        </div>

        <div className={Styles.supportContainer}>
        <div className={Styles.colorDivider}>
          <h2>Support</h2>
        </div>
        <div className={Styles.changePasswordContainer}>
          <h3>Vill du ändra lösenord?</h3>
          {/* TODO: ADD REQUIRED DATA */}
          <form className={Styles.changePasswordForm}>
            <label>Ditt nuvarande lösenord</label>
            <input type="text" />
            <label>Repetera nuvarande lösenord</label>
            <input type="text" />
            <label>Nytt lösenord</label>
            <input type="text" />
            <label>Repetera nytt lösenord</label>
            <input type="text" />
          </form>
          <StyledButton textInput="Ändra Lösenord" colorInput="#F78632" />
        </div>
      </div>
      
    </section>
  );
}
