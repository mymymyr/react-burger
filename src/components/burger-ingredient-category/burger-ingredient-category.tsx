import burgerIngredientCategoryStyles from './burger-ingredient-category.module.css';
import Card from '../card/card';
import { type FC, useMemo, type RefObject } from 'react';
import { type TIngredient } from '../../types';

type TBurgerIngredientCategoryProps = {
  data: TIngredient[]
  name: string
  openModal: (item: TIngredient) => void
  sectionRef: RefObject<HTMLParagraphElement>
}

const BurgerIngredientCategory: FC<TBurgerIngredientCategoryProps> = ({ data, name, openModal, sectionRef }) => {
  return (
        <>
            <p className='text text_type_main-medium mb-6' ref={sectionRef}>
                {name}
            </p>
            <ul className={burgerIngredientCategoryStyles.list}>
                {
                    useMemo(() => data.map((item: TIngredient) => (
                        <Card key={item._id} item={item} openModal={openModal} />
                    )), [data, openModal])
                }
            </ul>
        </>
  );
};

export default BurgerIngredientCategory;
