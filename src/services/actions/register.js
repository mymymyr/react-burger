import { registerRequest } from "../../utils/burger-api.js";
import { signIn } from "./user.js";

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILED = 'REGISTER_FAILED';

const registerRequestAction = () => ({
  type: REGISTER_REQUEST
});

const registerSuccessAction = (res) => ({
  type: REGISTER_SUCCESS,
  success: res.success
});

const registerFailedAction = (message) => ({
  type: REGISTER_FAILED,
  message: message
});

export const register = (email, password, name) => {
  return (dispatch) => {
    dispatch(registerRequestAction());
    registerRequest(email, password, name).then(res => {
      dispatch(registerSuccessAction(res));
      dispatch(signIn(res));
    }).catch((err) => {
      dispatch(registerFailedAction(err.message));
      console.log(err.message);
    });
  };
}

