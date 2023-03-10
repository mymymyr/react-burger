import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILED } from '../action-types';

import { type TLoginActions } from '../actions';

export type TLoginReducer = {
  message: string
  loginRequest: boolean
  loginFailed: boolean
}

const initialState = {
  message: '',
  loginRequest: false,
  loginFailed: false
};

export const loginReducer = (state = initialState, action: TLoginActions): TLoginReducer => {
  switch (action.type) {
    case LOGIN_REQUEST: {
      return { ...state, loginRequest: true };
    }
    case LOGIN_SUCCESS: {
      return { ...state, loginFailed: false, loginRequest: false, message: '' };
    }
    case LOGIN_FAILED: {
      return { ...state, ...action, loginFailed: true, loginRequest: false };
    }
    default: {
      return state;
    }
  }
};
