import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredients.js';
import { burgerIngredientsReducer } from './burger-ingredients.js';
import { currentIngredientReducer } from './current-ingredient.js';
import { orderReducer } from './order.js';
import { registerReducer } from './register.js';
import { loginReducer } from './login.js';
import { userReducer } from './user.js';
import { sendCodeReducer } from './send-code.js';
import { changePasswordReducer } from './change-password.js';

export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    burgerIngredients: burgerIngredientsReducer,
    currentIngredient: currentIngredientReducer,
    order: orderReducer,
    register: registerReducer,
    login: loginReducer,
    user: userReducer,
    code: sendCodeReducer,
    password: changePasswordReducer
});
