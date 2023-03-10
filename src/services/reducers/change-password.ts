import {
  CHANGE_PASSWORD_FAILED,
  CHANGE_PASSWORD_REQUEST,
  CHANGE_PASSWORD_SUCCESS
} from '../action-types';
import { type TChangePasswordActions } from '../actions';

export type TChangePasswordReducer = {
  message: string
  passwordChange: boolean
  passwordRequest: boolean
  passwordFailed: boolean
}

const initialState = {
  message: '',
  passwordChange: false,
  passwordRequest: false,
  passwordFailed: false
};

export const changePasswordReducer = (state = initialState, action: TChangePasswordActions): TChangePasswordReducer => {
  switch (action.type) {
    case CHANGE_PASSWORD_REQUEST: {
      return { ...state, passwordRequest: true, passwordChange: false };
    }
    case CHANGE_PASSWORD_SUCCESS: {
      return {
        ...state,
        passwordFailed: false,
        passwordRequest: false,
        passwordChange: true
      };
    }
    case CHANGE_PASSWORD_FAILED: {
      return {
        ...state,
        ...action,
        passwordFailed: true,
        passwordRequest: false,
        passwordChange: false
      };
    }
    default: {
      return state;
    }
  }
};
