import {
    CLOSE_ORDER_MODAL,
    GET_ORDER_FAILED,
    GET_ORDER_REQUEST,
    GET_ORDER_SUCCESS
} from '../actions/order.js';

const initialState = {
    order: null,
    orderRequest: false,
    orderFailed: false,
};

export const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ORDER_REQUEST: {
            return {
                ...state,
                orderRequest: true
            };
        }
        case GET_ORDER_SUCCESS: {
            return { ...state, orderFailed: false, order: action.order, orderRequest: false };
        }
        case GET_ORDER_FAILED: {
            return { ...state, orderFailed: true, orderRequest: false };
        }
        case CLOSE_ORDER_MODAL: {
            return {
                ...state,
                order: null
            };
        }
        default: {
            return state;
        }
    }
}
