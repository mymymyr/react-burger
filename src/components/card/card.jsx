import cardStyles from './card.module.css';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { burgerPropTypes } from '../../utils/dataPropTypes.js';
import { useDrag, DragPreviewImage } from 'react-dnd';
import { useSelector } from 'react-redux';

function Card({ item, openModal }) {
    const { counters } = useSelector(store => store.burgerIngredients);
 
    const [, ref, preview] = useDrag({
        type: 'ingredient',
        item: { item }
    });
    const counterVisible = counters && (counters[item._id] !== undefined) && (counters[item._id] !== 0);
    return (
        <li ref={ref} className={cardStyles.element} onClick={() => { openModal(item) }}>
            <DragPreviewImage connect={preview} src={item.image} />
            <img className='ml-4 mr-4' src={item.image} alt={item.name} />
            <div className={`${cardStyles.flex} ${cardStyles.position__center} mt-1 mb-1`}>
                <p className='text text_type_digits-default mr-2'>{item.price}</p>
                <CurrencyIcon type='primary' />
            </div>
            <p className={`${cardStyles.position__center} text text_type_main-small`}>
                {item.name}
            </p>
            {counterVisible &&
                (<Counter count={counters[item._id]} size='default' extraClass='m-1' />)
            }
        </li>
    );
}

Card.propTypes = {
    item: burgerPropTypes.isRequired,
    openModal: PropTypes.func.isRequired
}

export default Card;
