import {
  OPEN_INGREDIENT_MODAL,
  CLOSE_INGREDIENT_MODAL,
  SET_CURRENT_INGREDIENT
} from '../action-types';
import { type TIngredient } from '../../types';
import { type TCurrentIngredientActions } from '../actions';

export type TCurrentIngredientReducer = {
  ingredient: TIngredient | null
  modal: boolean
}

const initialState: TCurrentIngredientReducer = {
  ingredient: null,
  modal: false
};

export const currentIngredientReducer = (state = initialState, action: TCurrentIngredientActions): TCurrentIngredientReducer => {
  switch (action.type) {
    case OPEN_INGREDIENT_MODAL: {
      return {
        ...state, modal: true, ingredient: action.ingredient
      };
    }
    case SET_CURRENT_INGREDIENT: {
      return {
        ...state,
        modal: false,
        ingredient: action.ingredient
      };
    }
    case CLOSE_INGREDIENT_MODAL: {
      return {
        ...state,
        modal: false,
        ingredient: null
      };
    }
    default: {
      return state;
    }
  }
};
