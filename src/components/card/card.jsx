import CardStyles from './card.module.css';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { burgerPropTypes } from '../utils/dataPropTypes.js';

function Card(props) {

    return (
        props.data.map((item) => (
            <li className={CardStyles.element} key={item._id} onClick={() => { props.openModal('ingredient', item) }}>
                <img className='ml-4 mr-4' src={item.image} alt={item.name} />
                <div className={`${CardStyles.flex} ${CardStyles.position__center} mt-1 mb-1`}>
                    <p className='text text_type_digits-default mr-2'>{item.price}</p>
                    <CurrencyIcon type='primary' />
                </div>
                <p className={`${CardStyles.position__center} text text_type_main-small`}>
                    {item.name}
                </p>
                <Counter count={1} size='default' extraClass='m-1' />
            </li>
        ))
    );
}

Card.propTypes = {
    data: PropTypes.arrayOf(burgerPropTypes).isRequired,
    openModal: PropTypes.func.isRequired
}

export default Card;