import { getIngredientsRequest } from '../../utils/burger-api';
import { type AppDispatch, type AppThunk, type TIngredient } from '../../types';

import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED
} from '../action-types';

type TGetIngredientsRequestAction = {
  readonly type: typeof GET_INGREDIENTS_REQUEST
}

type TGetIngredientSuccessAction = {
  readonly type: typeof GET_INGREDIENTS_SUCCESS
  readonly ingredients: readonly TIngredient[]
}

type TGetIngredientFailedAction = {
  readonly type: typeof GET_INGREDIENTS_FAILED
}

export type TIngredientsActions =
    | TGetIngredientsRequestAction
    | TGetIngredientSuccessAction
    | TGetIngredientFailedAction

const getIngredientsRequestAction = (): TGetIngredientsRequestAction => ({
  type: GET_INGREDIENTS_REQUEST
});

const getIngredientSuccessAction = (ingredients: readonly TIngredient[]): TGetIngredientSuccessAction => ({
  type: GET_INGREDIENTS_SUCCESS,
  ingredients
});

const getIngredientFailedAction = (): TGetIngredientFailedAction => ({
  type: GET_INGREDIENTS_FAILED
});

export const getIngredients: AppThunk = () => {
  return (dispatch: AppDispatch) => {
    dispatch(getIngredientsRequestAction());
    getIngredientsRequest()
      .then((res) => {
        dispatch(getIngredientSuccessAction(res.data));
      })
      .catch((err: Error) => {
        dispatch(getIngredientFailedAction());
        console.log(err.message);
      });
  };
};
