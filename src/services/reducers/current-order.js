import {
    OPEN_ORDER_MODAL,
    SET_CURRENT_ORDER,
    CLOSE_ORDER_MODAL
} from '../actions/current-order';

const initialState = {
    id: null,
    modal: false
};

export const currentOrderReducer = (state = initialState, action) => {
    switch (action.type) {
        case OPEN_ORDER_MODAL: {
            return {
                ...state, id: action.id,
                modal: true
            }
        }
        case SET_CURRENT_ORDER: {
            return {
                ...state,
                id: action.id
            }
        }
        case CLOSE_ORDER_MODAL: {
            return {
                ...state,
                id: null,
                modal: false
            }
        }
        default: {
            return state;
        }
    }
}
