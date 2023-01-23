import { FORGOT_PASSWORD_FAILED, FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS } from "../actions/send-code";

const initialState = {
    message: "",
    codeSend: false,
    passwordRequest: false,
    passwordFailed: false,
};

export const sendCodeReducer = (state = initialState, action) => {
    switch (action.type) {
        case FORGOT_PASSWORD_REQUEST: {
            return { ...state, passwordRequest: true };
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
}
