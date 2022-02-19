/* ***** NEWPASSWORDRFORM ***** */
interface newPasswordFormInterface {
  password: string;
  confirmPassword: string;
}

export const initialNewPasswordFormState: newPasswordFormInterface = {
  password: "",
  confirmPassword: "",
};

type NEWPASSWORDFORM_ACTIONTYPE =
  | { type: "updatePassword"; payload: string }
  | { type: "updateConfirmPassword"; payload: string };

export function newPasswordFormReducer(
  state: newPasswordFormInterface,
  action: NEWPASSWORDFORM_ACTIONTYPE
) {
  switch (action.type) {
    case "updatePassword":
      return { password: action.payload, confirmPassword: state.confirmPassword };
    case "updateConfirmPassword":
      return { password: state.password, confirmPassword: action.payload };
    default:
      throw new Error();
  }
}
