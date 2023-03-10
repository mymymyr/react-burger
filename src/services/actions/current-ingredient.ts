import {
  OPEN_INGREDIENT_MODAL,
  SET_CURRENT_INGREDIENT,
  CLOSE_INGREDIENT_MODAL
} from '../action-types';
import { type TIngredient } from '../../types';

type TOpenIngredientModalAction = {
  readonly type: typeof OPEN_INGREDIENT_MODAL
  readonly ingredient: TIngredient
}

type TSetCurrentIngredientAction = {
  readonly type: typeof SET_CURRENT_INGREDIENT
  readonly ingredient: TIngredient
}

type TCloseIngredientModalAction = {
  readonly type: typeof CLOSE_INGREDIENT_MODAL
}

export type TCurrentIngredientActions =
    | TOpenIngredientModalAction
    | TSetCurrentIngredientAction
    | TCloseIngredientModalAction

export const openIngredientModalAction = (
  item: TIngredient
): TOpenIngredientModalAction => ({
  type: OPEN_INGREDIENT_MODAL,
  ingredient: { ...item }
});

export const setCurrentIngredientAction = (
  item: TIngredient
): TSetCurrentIngredientAction => ({
  type: SET_CURRENT_INGREDIENT,
  ingredient: { ...item }
});

export const closeIngredientModalAction = (): TCloseIngredientModalAction => ({
  type: CLOSE_INGREDIENT_MODAL
});
