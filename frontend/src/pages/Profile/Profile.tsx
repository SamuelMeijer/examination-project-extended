import React, { useReducer, useState } from "react";
import Styles from "./profile.module.css";

import { FaUserAstronaut } from "react-icons/fa";

// Importing hooks
import {
  useAuthenticatedUser,
  useUpdateAuthenticatedUser,
} from "../../hooks/authenticatedUserHook";
import {
  initialLoginFormState,
  loginFormReducer,
} from "../../hooks/loginFormHook";
import {
  initialRegisterFormState,
  registerFormReducer,
} from "../../hooks/registerFormHook";
import {
  initialNewPasswordFormState,
  newPasswordFormReducer,
} from "../../hooks/newPasswordHook";

export default function Profile() {
  const authenticatedUser = useAuthenticatedUser();
  const updateAuthenticatedUser = useUpdateAuthenticatedUser();

  const [loginFormState, loginFormStateDispatch] = useReducer(
    loginFormReducer,
    initialLoginFormState
  );
  const [loginErrorMessage, setLoginErrorMessage] = useState<string>("");

  const [registerFormState, registerFormStateDispatch] = useReducer(
    registerFormReducer,
    initialRegisterFormState
  );
  const [registrationErrorMessage, setRegistrationErrorMessage] =
    useState<string>("");

  const [newPasswordFormState, newPasswordFormStateDispatch] = useReducer(
    newPasswordFormReducer,
    initialNewPasswordFormState
  );
  const [newPasswordErrorMessage, setNewPasswordErrorMessage] =
    useState<string>("");

  const handleLoginFormChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.preventDefault();

    if (event.target.name === "identifier") {
      loginFormStateDispatch({
        type: "updateIdentifier",
        payload: event.target.value,
      });
    }

    if (event.target.name === "password") {
      loginFormStateDispatch({
        type: "updatePassword",
        payload: event.target.value,
      });
    }
  };

  const handleLoginOnSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    fetch("http://localhost:1337/api/auth/local", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginFormState),
    })
      .then((res) => {
        if (!res.ok) {
          throw Error(res.statusText);
        } else {
          return res.json();
        }
      })
      .then((data) => {
        updateAuthenticatedUser(data);
      })
      .catch((err) => {
        // Evalute if wrong combination of username and password was provided (Same as status === 400)
        if (err.message === "Bad Request") {
          setLoginErrorMessage("Fel användarnamn eller lösenord");
        } else {
          setLoginErrorMessage("Något gick fel vid inloggningen");
        }
      });
  };

  const handleRegisterFormChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.preventDefault();

    if (event.target.name === "userName") {
      registerFormStateDispatch({
        type: "updateUserName",
        payload: event.target.value,
      });
    }
    if (event.target.name === "userEmail") {
      registerFormStateDispatch({
        type: "updateUserEmail",
        payload: event.target.value,
      });
    }
    if (event.target.name === "userPassword") {
      registerFormStateDispatch({
        type: "updateUserPassword",
        payload: event.target.value,
      });
    }
    if (event.target.name === "userPasswordRepeat") {
      registerFormStateDispatch({
        type: "updateUserPasswordRepeat",
        payload: event.target.value,
      });
    }
  };

  const handleRegisterOnSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // Guarding so that the provided passwords match
    if (
      registerFormState.userPassword === registerFormState.userPasswordRepeat
    ) {
      const reqBody = {
        username: registerFormState.userName,
        email: registerFormState.userEmail,
        password: registerFormState.userPassword,
      };
      // Evalutates if blankspaces are included in any input
      if (
        !reqBody.email.includes(" ") &&
        !reqBody.username.includes(" ") &&
        !reqBody.password.includes(" ")
      ) {
        // Register the user with provided information.
        fetch("http://localhost:1337/api/auth/local/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(reqBody),
        })
          .then((res) => {
            if (!res.ok) {
              throw Error(res.statusText);
            } else {
              return res.json();
            }
          })
          .then((data) => {
            updateAuthenticatedUser(data);
          })
          .catch((err) => {
            // Evalute if a user with username or email already exists (Same as status === 400)
            if (err.message === "Bad Request") {
              setRegistrationErrorMessage(
                "Användarnamn eller epost är upptagen"
              );
            } else {
              setRegistrationErrorMessage("Något gick fel vid registrering");
            }
          });
      } else {
        setRegistrationErrorMessage("Blanksteg är inte tillåtna");
      }
    } else {
      setRegistrationErrorMessage("Angivna lösenord matchar inte");
    }
  };

  const handleNewPasswordFormChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.preventDefault();

    if (event.target.name === "newPassword") {
      newPasswordFormStateDispatch({
        type: "updatePassword",
        payload: event.target.value,
      });
    }

    if (event.target.name === "confirmNewPassword") {
      newPasswordFormStateDispatch({
        type: "updateConfirmPassword",
        payload: event.target.value,
      });
    }
  };

  const handleNewPasswordOnSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const reqBody = {
      password: newPasswordFormState.password,
      confirmPassword: newPasswordFormState.confirmPassword,
    };

    // IMPORTANT!! PASSWORD NEED TO BE ATLEAST 6 CHARS or status === 400
    if (reqBody.password.length < 6) {
      setNewPasswordErrorMessage(
        "Lösenordet måste vara minst sex tecken långt"
      );
    } else if (reqBody.password !== reqBody.confirmPassword) {
      setNewPasswordErrorMessage("Angivna lösenord matchar inte");
    } else {
      fetch("http://localhost:1337/api/users/me", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authenticatedUser?.jwt}`,
        },
        body: JSON.stringify(reqBody),
      })
        .then((res) => {
          if (!res.ok) {
            throw Error(res.statusText);
          } else {
            return res.json();
          }
        })
        .then((data) => {
          setNewPasswordErrorMessage("Lösenordet uppdaterat");
        })
        .catch((err) => {
          setNewPasswordErrorMessage("Något gick fel");
          console.error(err);
        });
    }
  };

  return (
    <section className={Styles.profileContentContainer}>
      {authenticatedUser ? (
        <div>
          <div className={Styles.userInformationContainer}>
            <div className={Styles.colorDivider}>
              <h2>{authenticatedUser.user.username}</h2>
            </div>

            <div className={Styles.userInformationContent}>
              <div className={Styles.userInformationText}>
                <p>
                  Din information:
                  <br />
                  Användarnamn: {authenticatedUser.user.username}
                  <br />
                  Registerad epost: {authenticatedUser.user.email}
                </p>
                {/* TODO: Make dynamic */}
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
                {/* TODO: Add logout-functionality */}
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
              {newPasswordErrorMessage.length > 0 ? (
                <p> {newPasswordErrorMessage} </p>
              ) : null}
              <form
                className={Styles.changePasswordForm}
                onSubmit={handleNewPasswordOnSubmit}
              >
                <label>Nytt lösenord</label>
                <input
                  required
                  minLength={6}
                  name="newPassword"
                  type="password"
                  onChange={handleNewPasswordFormChange}
                />
                <label>Repetera nytt lösenord</label>
                <input
                  required
                  minLength={6}
                  name="confirmNewPassword"
                  type="password"
                  onChange={handleNewPasswordFormChange}
                />
                <button type="submit">Ändra lösenord</button>
              </form>
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
                {loginErrorMessage.length > 0 ? (
                  <p>{loginErrorMessage}</p>
                ) : null}
                <form
                  className={Styles.changePasswordForm}
                  onSubmit={handleLoginOnSubmit}
                >
                  <label>Ange användarnamn eller epost</label>
                  <input
                    required
                    name="identifier"
                    type="text"
                    onChange={handleLoginFormChange}
                  />
                  <label>Ange lösenord</label>
                  <input
                    required
                    name="password"
                    type="password"
                    onChange={handleLoginFormChange}
                  />
                  <button type="submit">Logga in</button>
                </form>
              </div>
            </div>
          </div>

          <div className={Styles.supportContainer}>
            <div className={Styles.colorDivider}>
              <h2>Registrera dig</h2>
            </div>
            <div className={Styles.changePasswordContainer}>
              <h3>Inte medlem? Registrerar dig här</h3>
              {registrationErrorMessage.length > 0 ? (
                <p> {registrationErrorMessage} </p>
              ) : null}
              <form
                className={Styles.changePasswordForm}
                onSubmit={handleRegisterOnSubmit}
              >
                <label>Välj användarnamn</label>
                <input
                  required
                  name="userName"
                  type="text"
                  min="3"
                  max="12"
                  onChange={handleRegisterFormChange}
                />
                <label>Din epost</label>
                <input
                  required
                  name="userEmail"
                  type="text"
                  onChange={handleRegisterFormChange}
                />
                <label>Ange lösenord</label>
                <input
                  required
                  name="userPassword"
                  type="password"
                  onChange={handleRegisterFormChange}
                />
                <label>Repetera angett lösenord</label>
                <input
                  required
                  name="userPasswordRepeat"
                  type="password"
                  onChange={handleRegisterFormChange}
                />
                <button type="submit">Registrera dig</button>
              </form>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
