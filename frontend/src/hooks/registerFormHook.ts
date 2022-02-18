/* ***** REGISTERFORM ***** */
interface registerFormInterface {
  userName: string;
  userEmail: string;
  userPassword: string;
  userPasswordRepeat: string;
}

export const initialRegisterFormState: registerFormInterface = {
  userName: "",
  userEmail: "",
  userPassword: "",
  userPasswordRepeat: "",
};

type REGISTERFORM_ACTIONTYPE =
  | { type: "updateUserName"; payload: string }
  | { type: "updateUserEmail"; payload: string }
  | { type: "updateUserPassword"; payload: string }
  | { type: "updateUserPasswordRepeat"; payload: string };

export function registerFormReducer(
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
