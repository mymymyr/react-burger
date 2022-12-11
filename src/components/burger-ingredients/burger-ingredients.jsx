import { useState, useMemo, useRef } from 'react';
import burgerIngredientsStyles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import BurgerIngredientCategory from '../burger-ingredient-category/burger-ingredient-category.jsx';
import { BURGER_COMPOSITION } from '../../utils/constants.js';
import { useSelector } from 'react-redux';

function BurgerIngredients({ openModal }) {
    const { ingredients } = useSelector(store => store.ingredients);

    const bunArr = useMemo(() => ingredients.filter((item) => item.type === BURGER_COMPOSITION.bun), [ingredients]);
    const mainArr = useMemo(() => ingredients.filter((item) => item.type === BURGER_COMPOSITION.main), [ingredients]);
    const sauceArr = useMemo(() => ingredients.filter((item) => item.type === BURGER_COMPOSITION.sauce), [ingredients]);
    const [current, setCurrent] = useState(BURGER_COMPOSITION.bun);
    const bunRef = useRef(null);
    const sauceRef = useRef(null);
    const mainRef = useRef(null);
    const scrollRef = useRef(null);

    const scrollToIngredientType = (value, ref) => {
        if (ref.current) {
            ref.current.scrollIntoView({ behavior: "smooth" });
        }
        setCurrent(value);
    }
    const setActiveTab = () => {
        const tabs = [bunRef, sauceRef];
        const types = [BURGER_COMPOSITION.bun, BURGER_COMPOSITION.sauce];
        const calcDestination = (ref) => {
            return Math.abs(scrollRef.current.getBoundingClientRect().y - ref.current.getBoundingClientRect().y);
        }
        let nearestPos = calcDestination(mainRef);
        let currentActiveTab = BURGER_COMPOSITION.main;
        tabs.forEach((tab, index) => {
            const tmp = calcDestination(tab);
            if (nearestPos >= tmp) {
                nearestPos = tmp;
                currentActiveTab = types[index];
            }
        })
        setCurrent(currentActiveTab);
    };


    return (
        <section>
            <p className='text text_type_main-large pt-10 pb-5'>
                Cоберите бургер
            </p>
            <div className={`${burgerIngredientsStyles.flex} mb-10`}>
                <Tab value={BURGER_COMPOSITION.bun} active={current === BURGER_COMPOSITION.bun} onClick={(value) => scrollToIngredientType(value, bunRef)}>
                    Булки
                </Tab>
                <Tab value={BURGER_COMPOSITION.sauce} active={current === BURGER_COMPOSITION.sauce} onClick={(value) => scrollToIngredientType(value, sauceRef)}>
                    Соусы
                </Tab>
                <Tab value={BURGER_COMPOSITION.main} active={current === BURGER_COMPOSITION.main} onClick={(value) => scrollToIngredientType(value, mainRef)}>
                    Начинки
                </Tab>
            </div>
            <div className={burgerIngredientsStyles.scroll} ref={scrollRef} onScroll={setActiveTab}>
                <BurgerIngredientCategory sectionRef={bunRef} name="Булки" data={bunArr} openModal={openModal} />
                <BurgerIngredientCategory sectionRef={sauceRef} name="Соусы" data={sauceArr} openModal={openModal} />
                <BurgerIngredientCategory sectionRef={mainRef} name="Начинки" data={mainArr} openModal={openModal} />
            </div>
        </section >
    );
}

BurgerIngredients.propTypes = {
    openModal: PropTypes.func.isRequired
};

export default BurgerIngredients;
