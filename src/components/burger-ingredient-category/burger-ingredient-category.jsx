import burgerIngredientCategoryStyles from './burger-ingredient-category.module.css';
import Card from '../card/card.jsx';
import PropTypes from 'prop-types';
import { burgerPropTypes } from '../../utils/dataPropTypes.js';
import { useMemo } from 'react';

function BurgerIngredientCategory({ data, name, openModal, sectionRef }) {
    return (
        <>
            <p className='text text_type_main-medium mb-6' ref={sectionRef}>
                {name}
            </p>
            <ul className={burgerIngredientCategoryStyles.list}>
                {
                    useMemo(() => data.map((item) => (
                        <Card key={item._id} item={item} openModal={openModal} />
                    )), [data, openModal])
                }
            </ul>
        </>
    );
}

BurgerIngredientCategory.propTypes = {
    data: PropTypes.arrayOf(burgerPropTypes).isRequired,
    name: PropTypes.string.isRequired,
    openModal: PropTypes.func.isRequired
};

export default BurgerIngredientCategory;
