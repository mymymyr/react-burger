import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredients';
import { burgerIngredientsReducer } from './burger-ingredients';
import { currentIngredientReducer } from './current-ingredient';
import { orderReducer } from './order';
import { registerReducer } from './register';
import { loginReducer } from './login';
import { userReducer } from './user';
import { sendCodeReducer } from './send-code';
import { changePasswordReducer } from './change-password';
import { wsReducer } from './ws';
import { currentOrderReducer } from './current-order';
import { profileReducer } from './profile';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerIngredients: burgerIngredientsReducer,
  currentIngredient: currentIngredientReducer,
  order: orderReducer,
  register: registerReducer,
  login: loginReducer,
  user: userReducer,
  code: sendCodeReducer,
  password: changePasswordReducer,
  orders: wsReducer,
  currentOrder: currentOrderReducer,
  profile: profileReducer
});
