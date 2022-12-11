import { createOrderRequest } from "../../utils/burger-api.js";

export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED';
export const CLOSE_ORDER_MODAL = 'CLOSE_ORDER_MODAL';

const getOrdersRequestAction = () => ({
    type: GET_ORDER_REQUEST
});

const getOrderSuccessAction = (res) => ({
    type: GET_ORDER_SUCCESS,
    order: res.order
});

const getOrderFailedAction = () => ({
    type: GET_ORDER_FAILED
});

export const createOrder = (item) => {
    return (dispatch) => {
        dispatch(getOrdersRequestAction());
        createOrderRequest(item).then(res => {
            dispatch(getOrderSuccessAction(res));
        }).catch((err) => {
            dispatch(getOrderFailedAction());
            console.log(err);
        });;
    };
}

export const closeOrderModal = () => ({
    type: CLOSE_ORDER_MODAL
});
