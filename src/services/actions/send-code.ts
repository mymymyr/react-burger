import { type AppDispatch, type AppThunk } from '../../types';
import { passwordResetRequest } from '../../utils/burger-api';

import {
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILED
} from '../action-types';

type TForgotPasswordRequestAction = {
  readonly type: typeof FORGOT_PASSWORD_REQUEST
}

type TForgotPasswordSuccessAction = {
  readonly type: typeof FORGOT_PASSWORD_SUCCESS
}

type TForgotPasswordFailedAction = {
  readonly type: typeof FORGOT_PASSWORD_FAILED
  readonly message?: string
}

export type TSendCodeActions =
    | TForgotPasswordRequestAction
    | TForgotPasswordSuccessAction
    | TForgotPasswordFailedAction

export const forgotPasswordRequestAction = (): TForgotPasswordRequestAction => ({
  type: FORGOT_PASSWORD_REQUEST
});

export const forgotPasswordSuccessAction = (): TForgotPasswordSuccessAction => ({
  type: FORGOT_PASSWORD_SUCCESS
});

export const forgotPasswordFailedAction = (
  message?: string
): TForgotPasswordFailedAction => ({
  type: FORGOT_PASSWORD_FAILED,
  message
});

export const sendCode: AppThunk = (email: string) => {
  return (dispatch: AppDispatch) => {
    dispatch(forgotPasswordRequestAction());
    passwordResetRequest(email)
      .then(() => {
        dispatch(forgotPasswordSuccessAction());
      })
      .catch((err: Error) => {
        dispatch(forgotPasswordFailedAction(err.message));
        console.log(err.message);
      });
  };
};
