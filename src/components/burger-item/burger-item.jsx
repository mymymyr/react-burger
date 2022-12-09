import burgerItemStyles from './burger-item.module.css';
import PropTypes from 'prop-types';
import { burgerPropTypes } from '../../utils/dataPropTypes.js';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrop, useDrag, DragPreviewImage } from 'react-dnd';
import { useDispatch } from 'react-redux';
import { ERASE_BURGER_IGREDIENT, REORDER_BURGER_IGREDIENT } from '../../services/actions/burger-ingredients.js';

function BurgerItem({ item, index }) {
    const dispatch = useDispatch();

    const deleteItem = (index) => {
        dispatch({
            type: ERASE_BURGER_IGREDIENT,
            index: index
        });
    };

    const reorderItem = (item, toIndex) => {
        dispatch({
            type: REORDER_BURGER_IGREDIENT,
            item: { ...item },
            newindex: toIndex,
            index: item.index
        });
    };

    const [{ opacity }, ref, preview] = useDrag({
        type: 'burgerIngredient',
        item: {
            ...item,
            index: index
        },
        collect: monitor => ({
            opacity: monitor.isDragging() ? 0.5 : 1
        })
    });

    const [{ }, burgerIngredientDropRef] = useDrop({
        accept: 'burgerIngredient',
        canDrop: (ingredient) => {
            return true;
        },
        collect: monitor => ({

        }),
        drop(item) {
            reorderItem(item, index)
        }
    });

    return (
        <li className={`${burgerItemStyles.element} mb-4`} ref={burgerIngredientDropRef}>
            <DragPreviewImage connect={preview} src={item.image} />
            <div className={burgerItemStyles.dragIcon} ref={ref}>
                <DragIcon type='primary' />
            </div>
            <ConstructorElement
                text={item.name}
                price={item.price}
                thumbnail={item.image}
                handleClose={() => deleteItem(index)}
            />
        </li>
    )
}

BurgerItem.propTypes = {
    item: burgerPropTypes.isRequired,
    index: PropTypes.number.isRequired
};

export default BurgerItem;
