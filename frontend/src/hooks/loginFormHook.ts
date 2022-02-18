/* ***** LOGINRFORM ***** */
interface loginFormInterface {
  identifier: string;
  password: string;
}

export const initialLoginFormState: loginFormInterface = {
  identifier: "",
  password: "",
};

type LOGINFORM_ACTIONTYPE =
  | { type: "updateIdentifier"; payload: string }
  | { type: "updatePassword"; payload: string };

export function loginFormReducer(
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
