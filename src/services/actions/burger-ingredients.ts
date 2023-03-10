import {
  INSERT_BURGER_IGREDIENT,
  ERASE_BURGER_IGREDIENT,
  REORDER_BURGER_IGREDIENT,
  REORDER_BURGER_IGREDIENT_PREVIEW,
  REORDER_BURGER_IGREDIENT_STATUS,
  REORDER_BURGER_SET_PREVIEW_INDEX,
  CLEAR_BURGER_INGREDIENTS
} from '../action-types';
import { type TIngredient } from '../../types';

type TClearBurgerIngredientsAction = {
  readonly type: typeof CLEAR_BURGER_INGREDIENTS
}

export type TInsertBurgerIngredientsAction = {
  readonly type: typeof INSERT_BURGER_IGREDIENT
  readonly item: TIngredient
}

type TEraseBurgerIngredientAction = {
  readonly type: typeof ERASE_BURGER_IGREDIENT
  readonly index: number
}

type TReorderBurgerIngredientStatusAction = {
  readonly type: typeof REORDER_BURGER_IGREDIENT_STATUS
  readonly status: boolean
}

type TReorderBurgerSetPreviewIndexAction = {
  readonly type: typeof REORDER_BURGER_SET_PREVIEW_INDEX
  readonly status: boolean
  readonly newIndex: number
}

type TReorderBurgerIngredientAction = {
  readonly type: typeof REORDER_BURGER_IGREDIENT
  readonly item: TIngredient
  readonly newindex: number
  readonly index: number
}

type TReorderBurgerIngredientPreviewAction = {
  readonly type: typeof REORDER_BURGER_IGREDIENT_PREVIEW
  readonly item: TIngredient
  readonly newindex: number
  readonly index: number
}

export type TBurgerIngredientsActions =
    | TClearBurgerIngredientsAction
    | TInsertBurgerIngredientsAction
    | TEraseBurgerIngredientAction
    | TReorderBurgerIngredientStatusAction
    | TReorderBurgerSetPreviewIndexAction
    | TReorderBurgerIngredientAction
    | TReorderBurgerIngredientPreviewAction

export const clearBurgerIngredientsAction =
    (): TClearBurgerIngredientsAction => ({
      type: CLEAR_BURGER_INGREDIENTS
    });

export const insertBurgerIngredientsAction = (
  item: TIngredient
): TInsertBurgerIngredientsAction => ({
  type: INSERT_BURGER_IGREDIENT,
  item
});

export const eraseBurgerIngredientAction = (
  index: number
): TEraseBurgerIngredientAction => ({
  type: ERASE_BURGER_IGREDIENT,
  index
});

export const reorderBurgerIngredientStatusAction = (
  status: boolean
): TReorderBurgerIngredientStatusAction => ({
  type: REORDER_BURGER_IGREDIENT_STATUS,
  status
});

export const reorderBurgerSetPreviewIndexAction = (
  index: number
): TReorderBurgerSetPreviewIndexAction => ({
  type: REORDER_BURGER_SET_PREVIEW_INDEX,
  newIndex: index,
  status: true
});

export const reorderBurgerIngredientAction = (
  item: TIngredient,
  toIndex: number
): TReorderBurgerIngredientAction => ({
  type: REORDER_BURGER_IGREDIENT,
  item: { ...item },
  newindex: toIndex,
  index: item.index ? item.index : -1
});

export const reorderBurgerIngredientPreviewAction = (
  item: TIngredient,
  toIndex: number
): TReorderBurgerIngredientPreviewAction => ({
  type: REORDER_BURGER_IGREDIENT_PREVIEW,
  item: { ...item },
  newindex: toIndex,
  index: item.index ? item.index : -1
});
