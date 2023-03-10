import { type TOrder, type AppDispatch, type AppThunk } from '../../types';
import { createOrderRequest } from '../../utils/burger-api';
import { BEARER } from '../../utils/constants';

import {
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILED,
  CLOSE_ORDER_MODAL
} from '../action-types';

type TGetOrdersRequestAction = {
  readonly type: typeof GET_ORDER_REQUEST
}

type TGetOrderSuccessAction = {
  readonly type: typeof GET_ORDER_SUCCESS
  readonly order: TOrder
}

type TGetOrderFailedAction = {
  readonly type: typeof GET_ORDER_FAILED
}

type TCloseOrderModal = {
  readonly type: typeof CLOSE_ORDER_MODAL
}

export type TOrderActions =
    | TGetOrdersRequestAction
    | TGetOrderSuccessAction
    | TGetOrderFailedAction
    | TCloseOrderModal

const getOrdersRequestAction = (): TGetOrdersRequestAction => ({
  type: GET_ORDER_REQUEST
});

const getOrderSuccessAction = (order: TOrder): TGetOrderSuccessAction => ({
  type: GET_ORDER_SUCCESS,
  order
});

const getOrderFailedAction = (): TGetOrderFailedAction => ({
  type: GET_ORDER_FAILED
});

export const closeOrderModal = (): TCloseOrderModal => ({
  type: CLOSE_ORDER_MODAL
});

export const createOrder: AppThunk = (item: string[], accessToken: string) => {
  return (dispatch: AppDispatch) => {
    dispatch(getOrdersRequestAction());
    createOrderRequest(item, BEARER + accessToken)
      .then((res) => {
        dispatch(getOrderSuccessAction(res.order));
      })
      .catch(() => {
        dispatch(getOrderFailedAction());
      });
  };
};
