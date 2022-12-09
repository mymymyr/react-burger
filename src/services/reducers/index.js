import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredients.js';
import { burgerIngredientsReducer } from './burger-ingredients.js';
import { currentIngredientReducer } from './current-ingredient.js';
import { orderReducer } from './order.js';

export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    burgerIngredients: burgerIngredientsReducer,
    currentIngredient: currentIngredientReducer,
    order: orderReducer
});
