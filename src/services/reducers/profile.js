import {
  PROFILE_REQUEST,
  PROFILE_REQUEST_SUCCESS,
  PROFILE_REQUEST_FAIL,
  PROFILE_REQUEST_CLEAR_STATE
} from '../actions/profile.js';

const initialState = {
  profileRequest: false,
  profileRequestFailed: null,
};

export const profileReducer = (state = initialState, action) => {
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
      return { ...state, profileRequestFailed: null }
    }
    default: {
      return state;
    }
  }
}
