import { registerRequest } from '../../utils/burger-api';
import { signIn } from './user';

import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILED
} from '../action-types';
import { type AppThunk } from '../../types';

type TRegisterRequestAction = {
  readonly type: typeof REGISTER_REQUEST
}

type TRegisterSuccessAction = {
  readonly type: typeof REGISTER_SUCCESS
  readonly success: boolean
}

type TRegisterFailedAction = {
  readonly type: typeof REGISTER_FAILED
  readonly message: string
}

export type TRegisterActions =
    | TRegisterRequestAction
    | TRegisterSuccessAction
    | TRegisterFailedAction

const registerRequestAction = (): TRegisterRequestAction => ({
  type: REGISTER_REQUEST
});

const registerSuccessAction = (success: boolean): TRegisterSuccessAction => ({
  type: REGISTER_SUCCESS,
  success
});

const registerFailedAction = (message: string): TRegisterFailedAction => ({
  type: REGISTER_FAILED,
  message
});

export const register: AppThunk = (email: string, password: string, name: string) => {
  return (dispatch: AppThunk) => {
    dispatch(registerRequestAction());
    registerRequest(email, password, name)
      .then((res) => {
        dispatch(registerSuccessAction(res.success));
        dispatch(signIn(res));
      })
      .catch((err: Error) => {
        dispatch(registerFailedAction(err.message));
      });
  };
};
