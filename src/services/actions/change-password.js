import { passwordResetResetRequest } from "../../utils/burger-api";

export const CHANGE_PASSWORD_REQUEST = 'CHANGE_PASSWORD_REQUEST';
export const CHANGE_PASSWORD_SUCCESS = 'CHANGE_PASSWORD_SUCCESS';
export const CHANGE_PASSWORD_FAILED = 'CHANGE_PASSWORD_FAILED';

const changePasswordRequestAction = () => ({
    type: CHANGE_PASSWORD_REQUEST
});

const changePasswordSuccessAction = () => ({
    type: CHANGE_PASSWORD_SUCCESS
});

export const changePasswordFailedAction = (message) => ({
    type: CHANGE_PASSWORD_FAILED,
    message: message
});

export const changePassword = (newPassword, code) => {
    return (dispatch) => {
        dispatch(changePasswordRequestAction());
        passwordResetResetRequest(newPassword, code).then(() => {
            dispatch(changePasswordSuccessAction());
        }).catch((err) => {
            dispatch(changePasswordFailedAction(err.message));
            console.log(err.message);
        });
    };
}
