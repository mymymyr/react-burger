import burgerConstructorStyles from './burger-constructor.module.css';
import { ConstructorElement, Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { BURGER_COMPOSITION } from '../../utils/constants';
import { useDispatch, useSelector } from '../../hooks/hooks';
import { useDrop } from 'react-dnd';
import { type TInsertBurgerIngredientsAction, insertBurgerIngredientsAction } from '../../services/actions/burger-ingredients';
import BurgerItem from '../burger-item/burger-item';
import { type FC } from 'react';
import { type TIngredient } from '../../types';
import { v4 as uuidv4 } from 'uuid';

type TBurgerConstructorProps = {
  openModal: (item: string[]) => void
}

const BurgerConstructor: FC<TBurgerConstructorProps> = ({ openModal }) => {
  let { ingredients, ingredientsPreview, preview } = useSelector(store => store.burgerIngredients);
  if (preview) {
    ingredients = ingredientsPreview;
  }
  const bun = ingredients.find((item: TIngredient) => item.type === BURGER_COMPOSITION.bun);
  const dispatch = useDispatch();

  const addItem = (ingredient: TInsertBurgerIngredientsAction) => {
    dispatch(insertBurgerIngredientsAction({ ...ingredient.item, uuid: uuidv4() }));
  };

  const [{ isHover, canDrop }, dropTarget] = useDrop({
    accept: 'ingredient',
    canDrop: (ingredient: TInsertBurgerIngredientsAction) => {
      return bun !== undefined || ingredient.item.type === BURGER_COMPOSITION.bun;
    },
    collect: monitor => ({
      isHover: monitor.isOver(),
      canDrop: monitor.canDrop()
    }),
    drop (ingredient) {
      addItem(ingredient);
    }
  });

  const internalIngredients = ingredients.filter((item) => item.type !== BURGER_COMPOSITION.bun);
  const sum = ((bun != null) ? bun.price * 2 : 0) +
        internalIngredients.reduce((prev, cur) => prev + cur.price, 0);

  const getIdsIngredients = () => {
    const resultArr = internalIngredients.reduce((arr: string[], item: TIngredient) => { arr.push(item._id); return arr; }, []);
    if (bun != null) {
      resultArr.push(bun._id);
    }
    return resultArr;
  };

  return (
        <section className={`${burgerConstructorStyles.section} mt-25 mr-5`}>
            <ul ref={dropTarget} className={`${burgerConstructorStyles.list} ${isHover ? canDrop ? burgerConstructorStyles.border_green : burgerConstructorStyles.border_red : burgerConstructorStyles.border} `} >
                {ingredients.length === 0 && (
                    <li className={`${burgerConstructorStyles.legend} 'text text_type_main-medium mb-6' ml-4 mr-4`}>
                        Перетащите сюда ингредиенты для того, чтобы собрать бургер
                    </li>
                )}
                {(bun != null) && (
                    <li className='ml-8 mb-4'>
                        <ConstructorElement
                            type='top'
                            isLocked={true}
                            text={bun.name + ' (верх)'}
                            price={bun.price}
                            thumbnail={bun.image}
                        />
                    </li>
                )}
                <ul className={`${burgerConstructorStyles.list} ${burgerConstructorStyles.scroll}`}>
                    {internalIngredients.map((item: TIngredient, index: number) => (
                        <BurgerItem key={item.uuid} item={item} index={index} />
                    ))}
                </ul>
                {(bun != null) && (
                    <li className='ml-8 mt-4'>
                        <ConstructorElement
                            type="bottom"
                            isLocked={true}
                            text={bun.name + ' (низ)'}
                            price={bun.price}
                            thumbnail={bun.image}
                        />
                    </li>
                )}
            </ul>

            <div className={`${burgerConstructorStyles.container} mt-10`}>
                <p className='text text_type_digits-medium'>
                    {sum}
                </p>
                <div className={`${burgerConstructorStyles.currencyIcon} mr-10`}>
                    <CurrencyIcon type='primary' />
                </div>
                <Button disabled={sum === 0} type='primary' size='large' htmlType='button' onClick={() => { openModal(getIdsIngredients()); }}>
                    Оформить заказ
                </Button>
            </div>
        </section>
  );
};

export default BurgerConstructor;
