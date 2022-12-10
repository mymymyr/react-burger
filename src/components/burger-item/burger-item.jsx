import burgerItemStyles from './burger-item.module.css';
import PropTypes from 'prop-types';
import { burgerPropTypes } from '../../utils/dataPropTypes.js';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrop, useDrag, DragPreviewImage } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { ERASE_BURGER_IGREDIENT, REORDER_BURGER_IGREDIENT, REORDER_BURGER_IGREDIENT_PREVIEW, REORDER_BURGER_IGREDIENT_STATUS } from '../../services/actions/burger-ingredients.js';

function BurgerItem({ item, index }) {
    const dispatch = useDispatch();
    let {preview, previewNewIndex } = useSelector(store => store.burgerIngredients);

    const deleteItem = (index) => {
        dispatch({
            type: ERASE_BURGER_IGREDIENT,
            index: index
        });
    };

    const setDragStatus = (status) => {
        dispatch({
            type: REORDER_BURGER_IGREDIENT_STATUS,
            status: status
        });
    };

    const setPreviewNewIndex = (index) => {
        dispatch({
            type: REORDER_BURGER_IGREDIENT_STATUS,
            newIndex: index
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

    const reorderItemPreview = (item, toIndex) => {
        dispatch({
            type: REORDER_BURGER_IGREDIENT_PREVIEW,
            item: { ...item },
            newindex: toIndex,
            index: item.index
        });
    };
    const [{ opacity }, ref, previewDrag] = useDrag({
        type: 'burgerIngredient',
        item: {
            ...item,
            index: index
        },
        end(_, monitor) {
            setDragStatus(monitor.didDrop());
        }
    });

    const [{ isHover }, burgerIngredientDropRef] = useDrop({
        accept: 'burgerIngredient',
        canDrop: (ingredient) => {
            return true;
        },
        collect: monitor => ({
            isHover: monitor.isOver()
        }),
        drop(item, monitor) {
            reorderItem(item, index);
        }, 
        hover(item) {
            if ((preview && previewNewIndex === -1) || previewNewIndex === index + 1) {
                return;
            }
            previewNewIndex = index;
            setPreviewNewIndex(index);
            reorderItemPreview(item, index);
        } 
    });

    return (
        <li className={`${burgerItemStyles.element} ${isHover ? burgerItemStyles.opacity : ""} mb-4`} ref={burgerIngredientDropRef}>
            <DragPreviewImage connect={previewDrag} src={item.image} />
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
