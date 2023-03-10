import {
  OPEN_ORDER_MODAL,
  SET_CURRENT_ORDER,
  CLOSE_CURRENT_ORDER_MODAL
} from '../action-types';

type TOpenOrderModalAction = {
  readonly type: typeof OPEN_ORDER_MODAL
  readonly id: string
}

type TSetCurrentOrderAction = {
  readonly type: typeof SET_CURRENT_ORDER
  readonly id: string
}

type TCloseOrderModalAction = {
  readonly type: typeof CLOSE_CURRENT_ORDER_MODAL
}

export type TCurrentOrderActions =
    | TOpenOrderModalAction
    | TSetCurrentOrderAction
    | TCloseOrderModalAction

export const openOrderModalAction = (orderId: string): TOpenOrderModalAction => ({
  type: OPEN_ORDER_MODAL,
  id: orderId
});

export const setCurrentOrderAction = (
  orderId: string
): TSetCurrentOrderAction => ({
  type: SET_CURRENT_ORDER,
  id: orderId
});

export const closeOrderModalAction = (): TCloseOrderModalAction => ({
  type: CLOSE_CURRENT_ORDER_MODAL
});
