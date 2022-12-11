export const INSERT_BURGER_IGREDIENT = 'INSERT_BURGER_IGREDIENT';
export const ERASE_BURGER_IGREDIENT = 'ERASE_BURGER_IGREDIENT';
export const REORDER_BURGER_IGREDIENT = 'REORDER_BURGER_IGREDIENT';
export const REORDER_BURGER_IGREDIENT_PREVIEW = 'REORDER_BURGER_IGREDIENT_PREVIEW';
export const REORDER_BURGER_IGREDIENT_STATUS = 'REORDER_BURGER_IGREDIENT_STATUS';
export const REORDER_BURGER_SET_PREVIEW_INDEX = 'REORDER_BURGER_SET_PREVIEW_INDEX';
export const CLEAR_BURGER_INGREDIENTS = 'CLEAR_BURGER_INGREDIENTS';

export const clearBurgerIngredientsAction = () => ({
    type: CLEAR_BURGER_INGREDIENTS
});

export const insertBurgerIngredientsAction = (item) => ({
    type: INSERT_BURGER_IGREDIENT,
    item
});

export const eraseBurgerIngredientAction = (index) => ({
    type: ERASE_BURGER_IGREDIENT,
    index: index
});

export const reorderBurgerIngredientStatusAction = (status) => ({
    type: REORDER_BURGER_IGREDIENT_STATUS,
    status: status
});

export const reorderBurgerSetPreviewIndexAction = (index) => ({
    type: REORDER_BURGER_SET_PREVIEW_INDEX,
    status: index
});

export const reorderBurgerIngredientAction = (item, toIndex) => ({
    type: REORDER_BURGER_IGREDIENT,
    item: { ...item },
    newindex: toIndex,
    index: item.index
});

export const reorderBurgerIngredientPreviewAction = (item, toIndex) => ({
    type: REORDER_BURGER_IGREDIENT_PREVIEW,
    item: { ...item },
    newindex: toIndex,
    index: item.index
});
