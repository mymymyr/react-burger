import burgerIngredientCategoryStyles from './burger-ingredient-category.module.css';
import Card from '../card/card.jsx';
import PropTypes from 'prop-types';
import { BURGER_PROP_TYPES } from '../utils/dataPropTypes.js';

function BurgerIngredientCategory({ data, name, openModal }) {
    return (
        <>
            <p className='text text_type_main-medium mb-6'>
                {name}
            </p>
            <ul className={burgerIngredientCategoryStyles.list}>
                <Card data={data} openModal={openModal} />
            </ul>
        </>
    );
}

BurgerIngredientCategory.propTypes = {
    data: PropTypes.arrayOf(BURGER_PROP_TYPES).isRequired,
    name: PropTypes.string.isRequired,
    openModal: PropTypes.func.isRequired
};

export default BurgerIngredientCategory;