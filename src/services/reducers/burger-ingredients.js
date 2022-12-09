import {
  INSERT_BURGER_IGREDIENT,
  ERASE_BURGER_IGREDIENT,
  REORDER_BURGER_IGREDIENT
} from '../actions/burger-ingredients.js';
import { BURGER_COMPOSITION } from '../../utils/constants.js';

const initialState = {
  ingredients: [],
  counters: {},
};

export const burgerIngredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case INSERT_BURGER_IGREDIENT: {
      const incrementValue = action.item.type === BURGER_COMPOSITION.bun ? 2 : 1;
      if (!state.counters[action.item._id]) {
        state.counters[action.item._id] = incrementValue;
      } else {
        state.counters[action.item._id] += incrementValue;
      }
      if (state.ingredients.length !== 0 && action.item.type === BURGER_COMPOSITION.bun) {
        const bun = state.ingredients.find((item) => item.type === BURGER_COMPOSITION.bun);
        state.counters[bun._id] -= 2;
      }
      return {
        ...state,
        ingredients: action.item.type !== BURGER_COMPOSITION.bun ?
          [...state.ingredients, action.item] :
          [action.item, ...state.ingredients.filter(ingredient => ingredient.type !== BURGER_COMPOSITION.bun)]
      }
    }
    case ERASE_BURGER_IGREDIENT: {
      const currentIndex = action.index + 1;
      state.counters[state.ingredients[currentIndex]._id] -= 1;
      state.ingredients.splice(currentIndex, 1);
      return {
        ...state
      }
    }
    case REORDER_BURGER_IGREDIENT: {
      const newindex = action.newindex + 1;
      const previndex = action.index + 1;
      state.ingredients.splice(newindex > previndex ? newindex + 1 : newindex, 0, state.ingredients[previndex]);
      state.ingredients.splice(newindex > previndex ? previndex : previndex + 1, 1);
      return { ...state };
    }
    default: {
      return state;
    }
  }
}
