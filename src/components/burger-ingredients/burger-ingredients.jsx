import { useContext, useState } from 'react';
import burgerIngredientsStyles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import BurgerIngredientCategory from '../burger-ingredient-category/burger-ingredient-category.jsx';
import { BURGER_COMPOSITION } from '../utils/constants.js';
import { BurgerContext } from '../utils/contexts.jsx';

function BurgerIngredients({ openModal }) {
    const { data } = useContext(BurgerContext);
    const bunArr = data.filter((item) => item.type === BURGER_COMPOSITION.bun);
    const mainArr = data.filter((item) => item.type === BURGER_COMPOSITION.main);
    const sauceArr = data.filter((item) => item.type === BURGER_COMPOSITION.sauce);
    const [current, setCurrent] = useState(BURGER_COMPOSITION.bun);

    return (
        <section>
            <p className='text text_type_main-large pt-10 pb-5'>
                Cоберите бургер
            </p>
            <div className={`${burgerIngredientsStyles.flex} mb-10`}>
                <Tab value={BURGER_COMPOSITION.bun} active={current === BURGER_COMPOSITION.bun} onClick={setCurrent}>
                    Булки
                </Tab>
                <Tab value={BURGER_COMPOSITION.sauce} active={current === BURGER_COMPOSITION.sauce} onClick={setCurrent}>
                    Соусы
                </Tab>
                <Tab value={BURGER_COMPOSITION.main} active={current === BURGER_COMPOSITION.main} onClick={setCurrent}>
                    Начинки
                </Tab>
            </div>
            <div className={burgerIngredientsStyles.scroll}>
                <BurgerIngredientCategory name="Булки" data={bunArr} openModal={openModal} />
                <BurgerIngredientCategory name="Соусы" data={sauceArr} openModal={openModal} />
                <BurgerIngredientCategory name="Начинки" data={mainArr} openModal={openModal} />
            </div>
        </section >
    );
}

BurgerIngredients.propTypes = {
    openModal: PropTypes.func.isRequired
};

export default BurgerIngredients;