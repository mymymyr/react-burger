import { createOrderRequest } from "../../utils/burger-api.js";

export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED';
export const CLOSE_ORDER_MODAL = 'CLOSE_ORDER_MODAL';

export function createOrder(item) {
    return function (dispatch) {
        dispatch({
            type: GET_ORDER_REQUEST
        });
        createOrderRequest(item).then(res => {
            if (res && res.success) {
                dispatch({
                    type: GET_ORDER_SUCCESS,
                    order: res.order
                });
            } else {
                dispatch({
                    type: GET_ORDER_FAILED
                });
            }
        }).catch((err) => { console.log(err); });;
    };
}
