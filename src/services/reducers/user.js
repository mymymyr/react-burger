import { USER_SIGN_IN_FAIL, USER_SIGN_IN_SUCCESS, USER_SIGN_OUT } from "../actions/user";

const initialState = {
    user: {
        email: "",
        name: ""
    },
    isAuthenticated: undefined
};

export const userReducer = (state = initialState, action) => {
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
        default: {
            return state;
        }
    }
}
