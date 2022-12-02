import cardStyles from './card.module.css';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { burgerPropTypes } from '../../utils/dataPropTypes.js';
import { useMemo } from 'react';

function Card({ data, openModal }) {

    return (
        useMemo(() => data.map((item) => (
            <li className={cardStyles.element} key={item._id} onClick={() => { openModal(item) }}>
                <img className='ml-4 mr-4' src={item.image} alt={item.name} />
                <div className={`${cardStyles.flex} ${cardStyles.position__center} mt-1 mb-1`}>
                    <p className='text text_type_digits-default mr-2'>{item.price}</p>
                    <CurrencyIcon type='primary' />
                </div>
                <p className={`${cardStyles.position__center} text text_type_main-small`}>
                    {item.name}
                </p>
                <Counter count={1} size='default' extraClass='m-1' />
            </li>
        )), [data])
    );
}

Card.propTypes = {
    data: PropTypes.arrayOf(burgerPropTypes).isRequired,
    openModal: PropTypes.func.isRequired
}

export default Card;
