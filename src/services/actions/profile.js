export const PROFILE_REQUEST = 'PROFILE_REQUEST';
export const PROFILE_REQUEST_SUCCESS = 'PROFILE_REQUEST_SUCCESS';
export const PROFILE_REQUEST_FAIL = 'PROFILE_REQUEST_FAIL';
export const PROFILE_REQUEST_CLEAR_STATE = 'PROFILE_REQUEST_CLEAR_STATE';

export const profileRequestAction = () => ({
    type: PROFILE_REQUEST
});

export const profileRequestSuccessAction = () => ({
    type: PROFILE_REQUEST_SUCCESS
});

export const profileRequestFailAction = () => ({
    type: PROFILE_REQUEST_FAIL
});

export const profileRequestClearStateAction = () => ({
    type: PROFILE_REQUEST_CLEAR_STATE
});
