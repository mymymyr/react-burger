import { useState } from 'react';
import BurgerIngredientsStyles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { burgerPropTypes } from '../utils/dataPropTypes.js';
import BurgerIngredientCategory from '../burger-ingredient-category/burger-ingredient-category.jsx';

function BurgerIngredients(props) {
    const bunArr = props.data.filter((item) => item.type === 'bun');
    const mainArr = props.data.filter((item) => item.type === 'main');
    const sauceArr = props.data.filter((item) => item.type === 'sauce');
    const Tabs = {
        bun: 'bun',
        sauce: 'sauce',
        main: 'main'
    }
    const [current, setCurrent] = useState(Tabs.bun);

    return (
        <section>
            <p className='text text_type_main-large pt-10 pb-5'>
                Cоберите бургер
            </p>
            <div className={`${BurgerIngredientsStyles.flex} mb-10`}>
                <Tab value={Tabs.bun} active={current === Tabs.bun} onClick={setCurrent}>
                    Булки
                </Tab>
                <Tab value={Tabs.sauce} active={current === Tabs.sauce} onClick={setCurrent}>
                    Соусы
                </Tab>
                <Tab value={Tabs.main} active={current === Tabs.main} onClick={setCurrent}>
                    Начинки
                </Tab>
            </div>
            <div className={BurgerIngredientsStyles.scroll}>
                <BurgerIngredientCategory name="Булки" data={bunArr} openModal={props.openModal} />
                <BurgerIngredientCategory name="Соусы" data={sauceArr} openModal={props.openModal} />
                <BurgerIngredientCategory name="Начинки" data={mainArr} openModal={props.openModal} />
            </div>
        </section >
    );
}

BurgerIngredients.propTypes = {
    data: PropTypes.arrayOf(burgerPropTypes).isRequired,
    openModal: PropTypes.func.isRequired
};

export default BurgerIngredients;