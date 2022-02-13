import React, { useState } from "react";
import Styles from "./profile.module.css";

import { FaUserAstronaut } from "react-icons/fa";
import StyledButton from "../../components/StyledButton/StyledButton";

// TODO: Add logic for user being logged in or not
export default function Profile() {
  const [authenticated, setAuthenticated] = useState(false);
  const [userInformation, setuserInformation] = useState({});

  const handleOnClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    fetch('localhost:1337/api/auth/local')
    .then((res) => {
      if (!res.ok) {
        throw Error(res.statusText);
      } else {
        return res.json();
      }
    })
    .then((data) => {
      console.log(data.data)
    })
    .catch((err) => console.error(err));
  };

  return (
    <section className={Styles.profileContentContainer}>
      {authenticated ? (
        <div>
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
        </div>
      ) : (
        <div>
          <div className={Styles.userInformationContainer}>
            <div className={Styles.colorDivider}>
              <h2>Logga in</h2>
            </div>

            <div className={Styles.userInformationContent}>
              <div className={Styles.userInformationText}>
                <form>
                  <label>Ange användarnamn eller email</label>
                  <input type="text" />
                  <label>Ange lösenord</label>
                  <input type="password" />
                  <button type="submit" onClick={handleOnClick}>Logga in</button>
                </form>

                {/* <StyledButton textInput="Logga in" colorInput="#F78632" /> */}
              </div>
            </div>
          </div>

          <div className={Styles.supportContainer}>
            <div className={Styles.colorDivider}>
              <h2>Registrera dig</h2>
            </div>
            <div className={Styles.changePasswordContainer}>
              <h3>Inte medlem? Registrerar dig här</h3>
              {/* TODO: ADD REQUIRED DATA */}
              <form className={Styles.changePasswordForm}>
                <label>Välj användarnamn</label>
                <input type="text" />
                <label>Din epost</label>
                <input type="text" />
                <label>Ange lösenord</label>
                <input type="text" />
                <label>Repetera angett lösenord</label>
                <input type="text" />
              </form>
              <StyledButton textInput="Ändra Lösenord" colorInput="#F78632" />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
