import { loginRequest } from "../../utils/burger-api.js";
import { signIn } from "./user.js";

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';

const loginRequestAction = () => ({
  type: LOGIN_REQUEST
});

const loginSuccessAction = () => ({
  type: LOGIN_SUCCESS
});

const loginFailedAction = (message) => ({
  type: LOGIN_FAILED,
  message: message
});

export const login = (email, password) => {
  return (dispatch) => {
    dispatch(loginRequestAction());
    loginRequest(email, password).then(res => {
      dispatch(loginSuccessAction(res));
      dispatch(signIn(res));
    }).catch((err) => {
      dispatch(loginFailedAction(err.message));
      console.log(err.message);
    });
  };
}

