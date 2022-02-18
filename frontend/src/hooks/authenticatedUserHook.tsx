import React, { useState, useContext } from "react";

/* ***** AUTHENTICATED USER ***** */
export interface authenticatedInterface {
  jwt: "string";
  user: {
    email: "string";
    id: "string";
    username: "username";
  };
}

type props = React.PropsWithChildren<{}>;

export function useAuthenticatedUser() {
  return useContext(AuthenticatedUserContext);
}

export function useUpdateAuthenticatedUser() {
  return useContext(updateAuthenticatedUserContext);
}

const AuthenticatedUserContext =
  React.createContext<authenticatedInterface | null>(null);
const updateAuthenticatedUserContext = React.createContext<Function>(() => {});

export default function AuthenticatedUserProvider({ children }: props) {
  const [authenticatedUser, setAuthenticatedUser] =
    useState<authenticatedInterface | null>(null);

  function toggleUser(newUser: authenticatedInterface) {
    setAuthenticatedUser(newUser);
  }

  return (
    <AuthenticatedUserContext.Provider value={authenticatedUser}>
      <updateAuthenticatedUserContext.Provider value={toggleUser}>
        {children}
      </updateAuthenticatedUserContext.Provider>
    </AuthenticatedUserContext.Provider>
  );
}
