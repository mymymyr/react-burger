import {
  OPEN_ORDER_MODAL,
  SET_CURRENT_ORDER,
  CLOSE_CURRENT_ORDER_MODAL
} from '../action-types';
import { type TCurrentOrderActions } from '../actions';

export type TCurrentOrder = {
  id: string | null
  modal: boolean
}

const initialState: TCurrentOrder = {
  id: null,
  modal: false
};

export const currentOrderReducer = (state = initialState, action: TCurrentOrderActions): TCurrentOrder => {
  switch (action.type) {
    case OPEN_ORDER_MODAL: {
      return {
        ...state,
        id: action.id,
        modal: true
      };
    }
    case SET_CURRENT_ORDER: {
      return {
        ...state,
        id: action.id
      };
    }
    case CLOSE_CURRENT_ORDER_MODAL: {
      return {
        ...state,
        id: null,
        modal: false
      };
    }
    default: {
      return state;
    }
  }
};
