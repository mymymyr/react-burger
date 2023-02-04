export const OPEN_INGREDIENT_MODAL = 'OPEN_INGREDIENT_MODAL';
export const SET_CURRENT_INGREDIENT = 'SET_CURRENT_INGREDIENT';
export const CLOSE_INGREDIENT_MODAL = 'CLOSE_INGREDIENT_MODAL';

export const openIngredientModalAction = (item) => ({
    type: OPEN_INGREDIENT_MODAL,
    ingredient: { ...item }
});

export const setCurrentIngredientAction = (item) => ({
    type: SET_CURRENT_INGREDIENT,
    ingredient: { ...item }

});

export const closeIngredientModalAction = () => ({
    type: CLOSE_INGREDIENT_MODAL,
});
