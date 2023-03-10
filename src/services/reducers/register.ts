import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILED
} from '../action-types';
import { type TRegisterActions } from '../actions';

export type TRegisterReducer = {
  success: boolean
  message: string
  registerRequest: boolean
  registerFailed: boolean
}

const initialState = {
  success: false,
  message: '',
  registerRequest: false,
  registerFailed: false
};

export const registerReducer = (state = initialState, action: TRegisterActions): TRegisterReducer => {
  switch (action.type) {
    case REGISTER_REQUEST: {
      return { ...state, registerRequest: true };
    }
    case REGISTER_SUCCESS: {
      return { ...state, ...action, registerFailed: false, registerRequest: false };
    }
    case REGISTER_FAILED: {
      return { ...state, ...action, registerFailed: true, registerRequest: false };
    }
    default: {
      return state;
    }
  }
};
