/* ***** AUTHENTICATED USER ***** */
export interface authenticatedInterface {
  jwt: "string";
  user: {
    email: "string";
    id: "string";
    username: "username";
  };
}
