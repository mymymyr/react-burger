import { getProfileDataRequest, logoutRequest, updateProfileDataRequest } from "../../utils/burger-api";
import { ACCESS_TOKEN, BEARER, REFRESH_TOKEN } from "../../utils/constants";
import { deleteCookie, getCookie, setCookie } from "../../utils/cookie";
import { profileRequestAction, profileRequestFailAction, profileRequestSuccessAction } from "./profile"

export const USER_SIGN_IN_SUCCESS = 'USER_SIGN_IN_SUCCESS';
export const USER_SIGN_IN_FAIL = 'USER_SIGN_IN_FAIL';
export const USER_SIGN_OUT = 'USER_SIGN_OUT';
export const USER_CLEAR_SIGN_STATE = "USER_CLEAR_SIGN_STATE";


const signInUserActionSuccess = ({ user }) => ({
    type: USER_SIGN_IN_SUCCESS,
    user: {
        email: user.email,
        name: user.name
    }
});
export const userClearSignState = () => ({
    type: USER_CLEAR_SIGN_STATE
});

export const signInUserActionFail = () => ({
    type: USER_SIGN_IN_FAIL
});

const signOutUserAction = () => ({
    type: USER_SIGN_OUT
});

export const signIn = (res) => {
    return (dispatch) => {
        dispatch(signInUserActionSuccess(res));
        deleteCookie(ACCESS_TOKEN);
        deleteCookie(REFRESH_TOKEN);
        setCookie(ACCESS_TOKEN, res.accessToken.split(BEARER)[1], { expires: 20 * 60 });
        setCookie(REFRESH_TOKEN, res.refreshToken);
    };
}

export const signOut = () => {
    return (dispatch) => {
        const refreshToken = getCookie(REFRESH_TOKEN);
        logoutRequest(refreshToken).then(() => {
            deleteCookie(ACCESS_TOKEN);
            deleteCookie(REFRESH_TOKEN);
            dispatch(signOutUserAction());
        });
    };
}

export const getProfile = (accessToken) => {
    return async (dispatch) => {
        dispatch(profileRequestAction());
        getProfileDataRequest(BEARER + accessToken).then(res => {
            dispatch(profileRequestSuccessAction());
            dispatch(signInUserActionSuccess(res));
        }).catch((err) => {
            dispatch(profileRequestFailAction());
            dispatch(signInUserActionFail());
            console.log(err.message);
        });
    };
}

export const updateProfile = (accessToken, email, name, password) => {
    return async (dispatch) => {
        dispatch(profileRequestAction());
        updateProfileDataRequest(BEARER + accessToken, email, name, password).then(res => {
            dispatch(profileRequestSuccessAction());
            dispatch(signInUserActionSuccess(res));
        }).catch((err) => {
            dispatch(profileRequestFailAction());
            console.log(err.message);
        });
    };
}

