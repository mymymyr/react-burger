import { passwordResetRequest } from "../../utils/burger-api";

export const FORGOT_PASSWORD_REQUEST = 'FORGOT_PASSWORD_REQUEST';
export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS';
export const FORGOT_PASSWORD_FAILED = 'FORGOT_PASSWORD_FAILED';

const forgotPasswordRequestAction = () => ({
    type: FORGOT_PASSWORD_REQUEST
});

const forgotPasswordSuccessAction = () => ({
    type: FORGOT_PASSWORD_SUCCESS
});

export const forgotPasswordFailedAction = (message) => ({
    type: FORGOT_PASSWORD_FAILED,
    message: message
});

export const sendCode = (email) => {
    return (dispatch) => {
        dispatch(forgotPasswordRequestAction());
        passwordResetRequest(email).then(() => {
            dispatch(forgotPasswordSuccessAction());
        }).catch((err) => {
            dispatch(forgotPasswordFailedAction(err.message));
            console.log(err.message);
        });
    };
}
