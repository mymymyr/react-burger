import {
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS
} from '../action-types';

import { type TIngredient } from '../../types';
import { type TIngredientsActions } from '../actions';

export type TIngredientsReducer = {
  readonly ingredients: readonly TIngredient[]
  ingredientsRequest: boolean
  ingredientsFailed: boolean
}

const initialState: TIngredientsReducer = {
  ingredients: [],
  ingredientsRequest: false,
  ingredientsFailed: false
};

export const ingredientsReducer = (state = initialState, action: TIngredientsActions): TIngredientsReducer => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return { ...state, ingredientsRequest: true };
    }
    case GET_INGREDIENTS_SUCCESS: {
      return { ...state, ingredientsFailed: false, ingredients: action.ingredients, ingredientsRequest: false };
    }
    case GET_INGREDIENTS_FAILED: {
      return { ...state, ingredientsFailed: true, ingredientsRequest: false };
    }
    default: {
      return state;
    }
  }
};
