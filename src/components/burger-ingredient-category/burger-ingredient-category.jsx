import React from 'react';
import BurgerIngredientCategoryStyles from './burger-ingredient-category.module.css';
import Card from '../card/card.jsx';
import PropTypes from 'prop-types';
import { burgerPropTypes } from '../utils/dataPropTypes.js';

function BurgerIngredientCategory(props) {
    return (
        <>
            <p className='text text_type_main-medium mb-6'>
                {props.name}
            </p>
            <ul className={BurgerIngredientCategoryStyles.list}>
                <Card data={props.data} />
            </ul>
        </>
    );
}

BurgerIngredientCategory.propTypes = {
    data: PropTypes.arrayOf(burgerPropTypes).isRequired,
    name: PropTypes.string.isRequired
};

export default BurgerIngredientCategory;