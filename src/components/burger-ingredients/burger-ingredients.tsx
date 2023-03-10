import { useState, useMemo, useRef, type FC, type RefObject } from 'react';
import burgerIngredientsStyles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerIngredientCategory from '../burger-ingredient-category/burger-ingredient-category';
import { BURGER_COMPOSITION } from '../../utils/constants';
import { useSelector } from '../../hooks/hooks';
import { type TIngredient } from '../../types';

type TBurgerIngredientsProps = {
  openModal: (item: TIngredient) => void
}

const BurgerIngredients: FC<TBurgerIngredientsProps> = ({ openModal }) => {
  const { ingredients } = useSelector(store => store.ingredients);
  const bunArr = useMemo(() => ingredients.filter((item) => item.type === BURGER_COMPOSITION.bun), [ingredients]);
  const mainArr = useMemo(() => ingredients.filter((item) => item.type === BURGER_COMPOSITION.main), [ingredients]);
  const sauceArr = useMemo(() => ingredients.filter((item) => item.type === BURGER_COMPOSITION.sauce), [ingredients]);
  const [current, setCurrent] = useState(BURGER_COMPOSITION.bun);
  const bunRef = useRef<HTMLParagraphElement>(null);
  const sauceRef = useRef<HTMLParagraphElement>(null);
  const mainRef = useRef<HTMLParagraphElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToIngredientType = (value: string, ref: RefObject<HTMLParagraphElement>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
    setCurrent(value);
  };

  const setActiveTab = () => {
    const tabs = [bunRef, sauceRef];
    const types = [BURGER_COMPOSITION.bun, BURGER_COMPOSITION.sauce];
    const calcDestination = (ref: RefObject<HTMLParagraphElement>) => {
      if (!ref.current || !scrollRef.current) {
        return 0;
      }
      return Math.abs(scrollRef.current.getBoundingClientRect().y - ref.current.getBoundingClientRect().y);
    };
    let nearestPos = calcDestination(mainRef);
    let currentActiveTab = BURGER_COMPOSITION.main;
    tabs.forEach((tab, index) => {
      const tmp = calcDestination(tab);
      if (nearestPos >= tmp) {
        nearestPos = tmp;
        currentActiveTab = types[index];
      }
    });
    setCurrent(currentActiveTab);
  };

  return (
        <section>
            <p className='text text_type_main-large pt-10 pb-5'>
                Cоберите бургер
            </p>
            <div className={`${burgerIngredientsStyles.flex} mb-10`}>
                <Tab value={BURGER_COMPOSITION.bun} active={current === BURGER_COMPOSITION.bun} onClick={(value) => { scrollToIngredientType(value, bunRef); }}>
                    Булки
                </Tab>
                <Tab value={BURGER_COMPOSITION.sauce} active={current === BURGER_COMPOSITION.sauce} onClick={(value) => { scrollToIngredientType(value, sauceRef); }}>
                    Соусы
                </Tab>
                <Tab value={BURGER_COMPOSITION.main} active={current === BURGER_COMPOSITION.main} onClick={(value) => { scrollToIngredientType(value, mainRef); }}>
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
};

export default BurgerIngredients;
