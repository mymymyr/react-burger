import {
  PROFILE_REQUEST,
  PROFILE_REQUEST_SUCCESS,
  PROFILE_REQUEST_FAIL,
  PROFILE_REQUEST_CLEAR_STATE
} from '../action-types';

type TProfileRequestAction = {
  readonly type: typeof PROFILE_REQUEST
}

type TProfileRequestSuccessAction = {
  readonly type: typeof PROFILE_REQUEST_SUCCESS
}

type TProfileRequestFailAction = {
  readonly type: typeof PROFILE_REQUEST_FAIL
}

type TProfileRequestClearStateAction = {
  readonly type: typeof PROFILE_REQUEST_CLEAR_STATE
}

export type TProfileActions =
    | TProfileRequestAction
    | TProfileRequestSuccessAction
    | TProfileRequestFailAction
    | TProfileRequestClearStateAction

export const profileRequestAction = (): TProfileRequestAction => ({
  type: PROFILE_REQUEST
});

export const profileRequestSuccessAction =
    (): TProfileRequestSuccessAction => ({
      type: PROFILE_REQUEST_SUCCESS
    });

export const profileRequestFailAction = (): TProfileRequestFailAction => ({
  type: PROFILE_REQUEST_FAIL
});

export const profileRequestClearStateAction =
    (): TProfileRequestClearStateAction => ({
      type: PROFILE_REQUEST_CLEAR_STATE
    });
