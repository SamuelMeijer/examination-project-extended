import React, { useState, useReducer } from "react";
import Styles from "./profile.module.css";

import { FaUserAstronaut } from "react-icons/fa";
import StyledButton from "../../components/StyledButton/StyledButton";

// TODO: Move interafaces and other stuff into separate file
interface authenticatedInterface {
  jwt: "string";
  user: {
    email: "string";
    id: "string";
    username: "username";
  };
}

// ***** LOGINFORM *****
interface loginFormInterface {
  identifier: string;
  password: string;
}

type LOGINFORM_ACTIONTYPE =
  | { type: "updateIdentifier"; payload: string }
  | { type: "updatePassword"; payload: string };

function loginFormReducer(
  state: loginFormInterface,
  action: LOGINFORM_ACTIONTYPE
) {
  switch (action.type) {
    case "updateIdentifier":
      return { identifier: action.payload, password: state.password };
    case "updatePassword":
      return { identifier: state.identifier, password: action.payload };
    default:
      throw new Error();
  }
}

// ***** REGISTERFORM *****
interface registerFormInterface {
  userName: string;
  userEmail: string;
  userPassword: string;
  userPasswordRepeat: string;
}

type REGISTERFORM_ACTIONTYPE =
  | { type: "updateUserName"; payload: string }
  | { type: "updateUserEmail"; payload: string }
  | { type: "updateUserPassword"; payload: string }
  | { type: "updateUserPasswordRepeat"; payload: string };

function registerFormReducer(
  state: registerFormInterface,
  action: REGISTERFORM_ACTIONTYPE
) {
  switch (action.type) {
    case "updateUserName":
      return {
        userName: action.payload,
        userEmail: state.userEmail,
        userPassword: state.userPassword,
        userPasswordRepeat: state.userPasswordRepeat,
      };
    case "updateUserEmail":
      return {
        userName: state.userName,
        userEmail: action.payload,
        userPassword: state.userPassword,
        userPasswordRepeat: state.userPasswordRepeat,
      };
    case "updateUserPassword":
      return {
        userName: state.userName,
        userEmail: state.userEmail,
        userPassword: action.payload,
        userPasswordRepeat: state.userPasswordRepeat,
      };
    case "updateUserPasswordRepeat":
      return {
        userName: state.userName,
        userEmail: state.userEmail,
        userPassword: state.userPassword,
        userPasswordRepeat: action.payload,
      };
    default:
      throw new Error();
  }
}

// TODO: Add logic for user being logged in or not
export default function Profile() {
  const [authenticated, setAuthenticated] =
    useState<authenticatedInterface | null>(null);

  const initialLoginFormState: loginFormInterface = {
    identifier: "",
    password: "",
  };
  const [loginFormState, loginFormStateDispatch] = useReducer(
    loginFormReducer,
    initialLoginFormState
  );

  const initialRegisterFormState: registerFormInterface = {
    userName: "",
    userEmail: "",
    userPassword: "",
    userPasswordRepeat: "",
  };
  const [registerFormState, registerFormStateDispatch] = useReducer(
    registerFormReducer,
    initialRegisterFormState
  );

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
        // TODO: Handle bad requests (400 = Wrong identifier/password)
        if (!res.ok) {
          throw Error(res.statusText);
        } else {
          return res.json();
        }
      })
      .then((data) => {
        setAuthenticated(data);
      })
      .catch((err) => console.error(err));
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

    // TODO: Add guard against whitespace and characters not allowed.
    // Guarding so that the provided passwords match
    if (
      registerFormState.userPassword === registerFormState.userPasswordRepeat
    ) {
      const reqBody = {
        username: registerFormState.userName,
        email: registerFormState.userEmail,
        password: registerFormState.userPassword,
      };

      // Register the user with provided information.
      fetch("http://localhost:1337/api/auth/local/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reqBody),
      })
        .then((res) => {
          console.log(res);
          // TODO: Handle bad requests (Username/email exists, wrong format etc.)
          if (!res.ok) {
            throw Error(res.statusText);
          } else {
            return res.json();
          }
        })
        .then((data) => {
          setAuthenticated(data);
        })
        .catch((err) => console.error(err));
    } else {
      // TODO: Add ass message to user
      console.log("Password doesnt match");
    }
  };

  return (
    <section className={Styles.profileContentContainer}>
      {authenticated ? (
        <div>
          <div className={Styles.userInformationContainer}>
            <div className={Styles.colorDivider}>
              {/* TODO: Make dynamic */}
              <h2>{authenticated.user.username}</h2>
            </div>

            <div className={Styles.userInformationContent}>
              <div className={Styles.userInformationText}>
                <p>
                  Din information:
                  <br />
                  Användarnamn: {authenticated.user.username}
                  <br />
                  Registerad epost: {authenticated.user.email}
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
              {/* TODO: ADD REQUIRED DATA */}
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
