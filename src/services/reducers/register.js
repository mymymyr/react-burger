import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILED
} from '../actions/register.js';

const initialState = {
  success: false,
  message: "",
  registerRequest: false,
  registerFailed: false,
};

export const registerReducer = (state = initialState, action) => {
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
}
