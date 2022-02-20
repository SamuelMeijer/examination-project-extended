import React, { useState, useContext } from "react";

/* ***** AUTHENTICATED USER HIGHSCORE***** */
export interface highScoreInterface {
  attributes: {
    username: string;
    points: number;
    moves: number;
    didWin: boolean;
  };
  id: number;
}

type props = React.PropsWithChildren<{}>;

export function useAuthenticatedUserHighscore() {
  return useContext(AuthenticatedUserHighscoreContext);
}

export function useUpdateAuthenticatedUserHighscore() {
  return useContext(updateAuthenticatedUserHighscoreContext);
}

const AuthenticatedUserHighscoreContext =
  React.createContext<highScoreInterface | null>(null);
const updateAuthenticatedUserHighscoreContext = React.createContext<Function>(
  () => {}
);

export default function AuthenticatedUserHighscoreProvider({
  children,
}: props) {
  const [authenticatedUserHighscore, setAuthenticatedUserHighscore] =
    useState<highScoreInterface | null>(null);

  function updateHighscore(newScore: highScoreInterface) {
    setAuthenticatedUserHighscore(newScore);
  }

  return (
    <AuthenticatedUserHighscoreContext.Provider
      value={authenticatedUserHighscore}
    >
      <updateAuthenticatedUserHighscoreContext.Provider value={updateHighscore}>
        {children}
      </updateAuthenticatedUserHighscoreContext.Provider>
    </AuthenticatedUserHighscoreContext.Provider>
  );
}
