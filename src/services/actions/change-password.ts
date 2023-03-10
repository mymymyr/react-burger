import { type AppDispatch, type AppThunk } from '../../types';
import { passwordResetResetRequest } from '../../utils/burger-api';

import {
  CHANGE_PASSWORD_REQUEST,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAILED
} from '../action-types';

type TChangePasswordRequestAction = {
  readonly type: typeof CHANGE_PASSWORD_REQUEST
}

type TChangePasswordSuccessAction = {
  readonly type: typeof CHANGE_PASSWORD_SUCCESS
}

type TChangePasswordFailedAction = {
  readonly type: typeof CHANGE_PASSWORD_FAILED
  readonly message?: string
}

export type TChangePasswordActions =
    | TChangePasswordRequestAction
    | TChangePasswordSuccessAction
    | TChangePasswordFailedAction

const changePasswordRequestAction = (): TChangePasswordRequestAction => ({
  type: CHANGE_PASSWORD_REQUEST
});

const changePasswordSuccessAction = (): TChangePasswordSuccessAction => ({
  type: CHANGE_PASSWORD_SUCCESS
});

export const changePasswordFailedAction = (
  message?: string
): TChangePasswordFailedAction => ({
  type: CHANGE_PASSWORD_FAILED,
  message
});

export const changePassword: AppThunk = (newPassword: string, code: string) => {
  return (dispatch: AppDispatch) => {
    dispatch(changePasswordRequestAction());
    passwordResetResetRequest(newPassword, code)
      .then(() => {
        dispatch(changePasswordSuccessAction());
      })
      .catch((err: Error) => {
        dispatch(changePasswordFailedAction(err.message));
      });
  };
};
