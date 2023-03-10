import {
  getProfileDataRequest,
  logoutRequest,
  updateProfileDataRequest
} from '../../utils/burger-api';
import { ACCESS_TOKEN, BEARER, REFRESH_TOKEN } from '../../utils/constants';
import { deleteCookie, getCookie, setCookie } from '../../utils/cookie';
import {
  profileRequestAction,
  profileRequestFailAction,
  profileRequestSuccessAction
} from './profile';

import {
  USER_SIGN_IN_SUCCESS,
  USER_SIGN_IN_FAIL,
  USER_SIGN_OUT,
  USER_CLEAR_SIGN_STATE
} from '../action-types';
import { type TLoginData, type TUser, type AppDispatch, type AppThunk } from '../../types';

type TSignInUserActionSuccess = {
  readonly type: typeof USER_SIGN_IN_SUCCESS
  readonly user: TUser
}

type TUserClearSignState = {
  readonly type: typeof USER_CLEAR_SIGN_STATE
}

type TSignInUserActionFail = {
  readonly type: typeof USER_SIGN_IN_FAIL
}

type TSignOutUserAction = {
  readonly type: typeof USER_SIGN_OUT
}

export type TUserActions =
    | TSignInUserActionSuccess
    | TUserClearSignState
    | TSignInUserActionFail
    | TSignOutUserAction

const signInUserActionSuccess = (user: TUser): TSignInUserActionSuccess => ({
  type: USER_SIGN_IN_SUCCESS,
  user: {
    email: user.email,
    name: user.name
  }
});

export const userClearSignState = (): TUserClearSignState => ({
  type: USER_CLEAR_SIGN_STATE
});

export const signInUserActionFail = (): TSignInUserActionFail => ({
  type: USER_SIGN_IN_FAIL
});

const signOutUserAction = (): TSignOutUserAction => ({
  type: USER_SIGN_OUT
});

export const signIn: AppThunk = (res: TLoginData) => {
  return (dispatch: AppDispatch) => {
    dispatch(signInUserActionSuccess(res.user));
    deleteCookie(ACCESS_TOKEN);
    deleteCookie(REFRESH_TOKEN);
    setCookie(ACCESS_TOKEN, res.accessToken.split(BEARER)[1], {
      expires: 20 * 60
    });
    setCookie(REFRESH_TOKEN, res.refreshToken);
  };
};

export const signOut: AppThunk = () => {
  return (dispatch: AppDispatch) => {
    const refreshToken = getCookie(REFRESH_TOKEN);
    if (!refreshToken) {
      dispatch(signOutUserAction());
      return;
    }
    logoutRequest(refreshToken).then(() => {
      deleteCookie(ACCESS_TOKEN);
      deleteCookie(REFRESH_TOKEN);
      dispatch(signOutUserAction());
    }).catch((err: Error) => { console.error(err.message); });
  };
};

export const getProfile: AppThunk = (accessToken: string) => {
  return (dispatch: AppDispatch) => {
    dispatch(profileRequestAction());
    getProfileDataRequest(BEARER + accessToken)
      .then((res) => {
        dispatch(profileRequestSuccessAction());
        dispatch(signInUserActionSuccess(res.user));
      })
      .catch(() => {
        dispatch(profileRequestFailAction());
        dispatch(signInUserActionFail());
      });
  };
};

export const updateProfile: AppThunk = (
  accessToken: string,
  email: string,
  name: string,
  password: string
) => {
  return (dispatch: AppDispatch) => {
    dispatch(profileRequestAction());
    updateProfileDataRequest(BEARER + accessToken, email, name, password)
      .then((res) => {
        dispatch(profileRequestSuccessAction());
        dispatch(signInUserActionSuccess(res.user));
      })
      .catch(() => {
        dispatch(profileRequestFailAction());
      });
  };
};
