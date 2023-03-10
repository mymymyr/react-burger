import { loginRequest } from '../../utils/burger-api';
import { signIn } from './user';

import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILED } from '../action-types';
import { type AppThunk } from '../../types';

type TLoginRequestAction = {
  readonly type: typeof LOGIN_REQUEST
}

type TLoginSuccessAction = {
  readonly type: typeof LOGIN_SUCCESS
}

type TLoginFailedAction = {
  readonly type: typeof LOGIN_FAILED
  readonly message: string
}

export type TLoginActions =
    | TLoginRequestAction
    | TLoginSuccessAction
    | TLoginFailedAction

const loginRequestAction = (): TLoginRequestAction => ({
  type: LOGIN_REQUEST
});

const loginSuccessAction = (): TLoginSuccessAction => ({
  type: LOGIN_SUCCESS
});

const loginFailedAction = (message: string): TLoginFailedAction => ({
  type: LOGIN_FAILED,
  message
});

export const login: AppThunk = (email: string, password: string) => {
  return (dispatch: AppThunk) => {
    dispatch(loginRequestAction());
    loginRequest(email, password)
      .then((res) => {
        dispatch(loginSuccessAction());
        dispatch(signIn(res));
      })
      .catch((err: Error) => {
        dispatch(loginFailedAction(err.message));
      });
  };
};
