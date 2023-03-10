import { FORGOT_PASSWORD_FAILED, FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS } from '../action-types';
import { type TSendCodeActions } from '../actions';
export type TSendCodeReducer = {
  message: string
  codeSend: boolean
  passwordRequest: boolean
  passwordFailed: boolean
}

const initialState = {
  message: '',
  codeSend: false,
  passwordRequest: false,
  passwordFailed: false
};

export const sendCodeReducer = (state = initialState, action: TSendCodeActions): TSendCodeReducer => {
  switch (action.type) {
    case FORGOT_PASSWORD_REQUEST: {
      return { ...state, passwordRequest: true, codeSend: false };
    }
    case FORGOT_PASSWORD_SUCCESS: {
      return { ...state, passwordFailed: false, passwordRequest: false, codeSend: true };
    }
    case FORGOT_PASSWORD_FAILED: {
      return { ...state, ...action, passwordFailed: true, passwordRequest: false, codeSend: false };
    }
    default: {
      return state;
    }
  }
};
