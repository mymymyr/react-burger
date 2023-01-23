import {
    OPEN_INGREDIENT_MODAL,
    CLOSE_INGREDIENT_MODAL,
    SET_CURRENT_INGREDIENT
} from '../actions/current-ingredient';

const initialState = {
    ingredient: null,
    modal: false,
};

export const currentIngredientReducer = (state = initialState, action) => {
    switch (action.type) {
        case OPEN_INGREDIENT_MODAL: {
            return {
                ...state, modal: true, ingredient: action.ingredient
            }
        }
        case SET_CURRENT_INGREDIENT: {
            return {
                ...state,
                modal: false,
                ingredient: action.ingredient
            }
        }
        case CLOSE_INGREDIENT_MODAL: {
            return {
                ...state,
                modal: false,
                ingredient: null
            }
        }
        default: {
            return state;
        }
    }
}
