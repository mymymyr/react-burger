import { type store } from './services/store';
import { type Action, type ActionCreator } from 'redux';
import { type ThunkAction } from 'redux-thunk';
import {
  type TBurgerIngredientsActions,
  type TChangePasswordActions,
  type TCurrentIngredientActions,
  type TCurrentOrderActions,
  type TIngredientsActions,
  type TLoginActions,
  type TOrderActions,
  type TProfileActions,
  type TRegisterActions,
  type TSendCodeActions,
  type TUserActions,
  type TWsActions
} from './services/actions';

type TApplicationActions =
    | TBurgerIngredientsActions
    | TChangePasswordActions
    | TCurrentIngredientActions
    | TCurrentOrderActions
    | TIngredientsActions
    | TLoginActions
    | TOrderActions
    | TProfileActions
    | TRegisterActions
    | TSendCodeActions
    | TUserActions
    | TWsActions

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ActionCreator<
ThunkAction<ReturnType, Action, RootState, TApplicationActions>
>

export type TIngredient = {
  readonly name: string
  readonly _id: string
  readonly type: string
  readonly price: number
  readonly image: string
  readonly image_large: string
  readonly calories: number
  readonly proteins: number
  readonly fat: number
  readonly carbohydrates: number
  readonly uuid?: string
  readonly index?: number
}

export type TOrder = {
  readonly ingredients: string[]
  readonly number: number
  readonly _id: string
  readonly createdAt: string
  readonly name: string
  readonly status: string
}

export type TTokens = {
  readonly accessToken: string
  readonly refreshToken: string
}

export type TOrdersFromSocket = {
  total: number
  totalToday: number
  success: boolean
  readonly orders: readonly TOrder[]
}

export type TLoginData = {
  user: TUser
} & TTokens;

export type TUser = {
  email: string
  name: string
}
