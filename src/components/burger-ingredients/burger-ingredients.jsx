import React from 'react';
import BurgerIngredientsStyles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import Card from '../card/card.jsx';
import PropTypes from 'prop-types';

function BurgerIngredients(props) {
    const [current, setCurrent] = React.useState('one');
    return (
        <section>
            <p className='text text_type_main-large pt-10 pb-5'>
                Cоберите бургер
            </p>
            <div className={`${BurgerIngredientsStyles.flex} mb-10`}>
                <Tab value='one' active={current === 'one'} onClick={setCurrent}>
                    Булки
                </Tab>
                <Tab value='two' active={current === 'two'} onClick={setCurrent}>
                    Соусы
                </Tab>
                <Tab value='three' active={current === 'three'} onClick={setCurrent}>
                    Начинки
                </Tab>
            </div>
            <div className={BurgerIngredientsStyles.scroll}>
                <p className='text text_type_main-medium mb-6'>
                    Булки
                </p>
                <ul className={BurgerIngredientsStyles.list}>
                    <Card data={props.cards.bunArr} />
                </ul>
                <p className='text text_type_main-medium mt-10 mb-6'>
                    Соусы
                </p>
                <ul className={BurgerIngredientsStyles.list}>
                    <Card data={props.cards.sauceArr} />
                </ul>
                <p className='text text_type_main-medium mt-10 mb-6'>
                    Начинки
                </p>
                <ul className={BurgerIngredientsStyles.list}>
                    <Card data={props.cards.mainArr} />
                </ul>
            </div>
        </section >
    );
}

BurgerIngredients.propTypes = {
    cards: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
        _id: PropTypes.string.isRequired
    }))).isRequired
};

export default BurgerIngredients;