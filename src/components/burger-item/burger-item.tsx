import burgerItemStyles from './burger-item.module.css';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrop, useDrag, DragPreviewImage } from 'react-dnd';
import { useDispatch, useSelector } from '../../hooks/hooks';
import {
  eraseBurgerIngredientAction,
  reorderBurgerIngredientAction,
  reorderBurgerIngredientPreviewAction,
  reorderBurgerIngredientStatusAction,
  reorderBurgerSetPreviewIndexAction
} from '../../services/actions/burger-ingredients';
import { type FC } from 'react';
import { type TIngredient } from '../../types';

type TBurgerItemProps = {
  item: TIngredient
  index: number
}

const BurgerItem: FC<TBurgerItemProps> = ({ item, index }) => {
  const dispatch = useDispatch();
  let { preview, previewNewIndex } = useSelector(store => store.burgerIngredients);

  const deleteItem = (index: number) => {
    dispatch(eraseBurgerIngredientAction(index));
  };

  const setDragStatus = (status: boolean) => {
    dispatch(reorderBurgerIngredientStatusAction(status));
  };

  const setPreviewNewIndex = (index: number) => {
    dispatch(reorderBurgerSetPreviewIndexAction(index));
  };

  const reorderItem = (item: TIngredient, toIndex: number) => {
    dispatch(reorderBurgerIngredientAction(item, toIndex));
  };

  const reorderItemPreview = (item: TIngredient, toIndex: number) => {
    dispatch(reorderBurgerIngredientPreviewAction(item, toIndex));
  };
  const [, ref, previewDrag] = useDrag({
    type: 'burgerIngredient',
    item: {
      ...item,
      index
    },
    end (_, monitor) {
      setDragStatus(monitor.didDrop());
    }
  });

  const [{ isHover }, burgerIngredientDropRef] = useDrop({
    accept: 'burgerIngredient',
    canDrop: (ingredient: TIngredient) => {
      return true;
    },
    collect: monitor => ({
      isHover: monitor.isOver()
    }),
    drop (item, monitor) {
      reorderItem(item, index);
    },
    hover (item) {
      if ((preview && previewNewIndex === -1) || previewNewIndex === index + 1) {
        return;
      }
      previewNewIndex = index;
      setPreviewNewIndex(index);
      reorderItemPreview(item, index);
    }
  });

  return (
        <li className={`${burgerItemStyles.element} ${isHover ? burgerItemStyles.opacity : ''} mb-4`} ref={burgerIngredientDropRef}>
            <DragPreviewImage connect={previewDrag} src={item.image} />
            <div className={burgerItemStyles.dragIcon} ref={ref}>
                <DragIcon type='primary' />
            </div>
            <ConstructorElement
                text={item.name}
                price={item.price}
                thumbnail={item.image}
                handleClose={() => { deleteItem(index); }}
            />
        </li>
  );
};

export default BurgerItem;
