import {
  PROFILE_REQUEST,
  PROFILE_REQUEST_SUCCESS,
  PROFILE_REQUEST_FAIL,
  PROFILE_REQUEST_CLEAR_STATE
} from '../action-types';
import { type TProfileActions } from '../actions';

export type TProfileReducer = {
  profileRequest: boolean
  profileRequestFailed: boolean | null
}

const initialState = {
  profileRequest: false,
  profileRequestFailed: null
};

export const profileReducer = (state = initialState, action: TProfileActions): TProfileReducer => {
  switch (action.type) {
    case PROFILE_REQUEST: {
      return { ...state, profileRequest: true };
    }
    case PROFILE_REQUEST_SUCCESS: {
      return { ...state, profileRequestFailed: false, profileRequest: false };
    }
    case PROFILE_REQUEST_FAIL: {
      return { ...state, profileRequestFailed: true, profileRequest: false };
    }
    case PROFILE_REQUEST_CLEAR_STATE: {
      return { ...state, profileRequestFailed: null };
    }
    default: {
      return state;
    }
  }
};
