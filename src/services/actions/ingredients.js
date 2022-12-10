import { getIngredientsRequest } from "../../utils/burger-api.js";

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';

const getIngredientsRequestAction = () => ({
  type: GET_INGREDIENTS_REQUEST
});

const getIngredientSuccessAction = (res) => ({
  type: GET_INGREDIENTS_SUCCESS,
  ingredients: res.data
});

const getIngredientFailedAction = () => ({
  type: GET_INGREDIENTS_FAILED
});

export const getIngredients = () => {
  return (dispatch) => {
    dispatch(getIngredientsRequestAction());
    getIngredientsRequest().then(res => {
      dispatch(getIngredientSuccessAction(res));
    }).catch((err) => {
      dispatch(getIngredientFailedAction());
      console.log(err);
    });
  };
}

