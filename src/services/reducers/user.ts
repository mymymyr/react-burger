import { type TUser } from '../../types';
import { USER_SIGN_IN_FAIL, USER_SIGN_IN_SUCCESS, USER_SIGN_OUT, USER_CLEAR_SIGN_STATE } from '../action-types';
import { type TUserActions } from '../actions';
export type TUserReducer = {
  user: TUser
  isAuthenticated: boolean | undefined
}

const initialState: TUserReducer = {
  user: {
    email: '',
    name: ''
  },
  isAuthenticated: undefined
};

export const userReducer = (state = initialState, action: TUserActions): TUserReducer => {
  switch (action.type) {
    case USER_SIGN_IN_SUCCESS: {
      return {
        ...state, ...action, isAuthenticated: true
      };
    }
    case USER_SIGN_OUT: {
      return { ...state, isAuthenticated: false };
    }
    case USER_SIGN_IN_FAIL: {
      return { ...state, isAuthenticated: false };
    }
    case USER_CLEAR_SIGN_STATE: {
      return { ...state, isAuthenticated: undefined };
    }
    default: {
      return state;
    }
  }
};
