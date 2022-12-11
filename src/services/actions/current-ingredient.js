export const OPEN_INGREDIENT_MODAL = 'OPEN_INGREDIENT_MODAL';
export const CLOSE_INGREDIENT_MODAL = 'CLOSE_INGREDIENT_MODAL';

export const openIngredientModalAction = (item) => ({
    type: OPEN_INGREDIENT_MODAL,
    ingredient: { ...item }
});

export const closeingredientModalAction = (item) => ({
    type: CLOSE_INGREDIENT_MODAL,
});
