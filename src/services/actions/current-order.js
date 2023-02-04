export const OPEN_ORDER_MODAL = 'OPEN_ORDER_MODAL';
export const SET_CURRENT_ORDER = 'SET_CURRENT_ORDER';
export const CLOSE_ORDER_MODAL = 'CLOSE_ORDER_MODAL';

export const openOrderModalAction = (orderId) => ({
    type: OPEN_ORDER_MODAL,
    id: orderId
});

export const setCurrentOrderAction = (orderId) => ({
    type: SET_CURRENT_ORDER,
    id: orderId
});

export const closeOrderModalAction = () => ({
    type: CLOSE_ORDER_MODAL,
});
