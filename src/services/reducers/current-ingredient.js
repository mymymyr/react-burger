import {
    OPEN_INGREDIENT_MODAL,
    CLOSE_INGREDIENT_MODAL
} from '../actions/current-ingredient';

const initialState = {
    ingredient: null
};

export const currentIngredientReducer = (state = initialState, action) => {
    switch (action.type) {
        case OPEN_INGREDIENT_MODAL: {
            return {
                ...state,
                ingredient: action.ingredient
            }
        }

        case CLOSE_INGREDIENT_MODAL: {
            return {
                ...state,
                ingredient: null
            }
        }

        default: {
            return {
                ...state
            }
        }
    }
}
