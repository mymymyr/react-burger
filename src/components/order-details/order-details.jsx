import OrderDetailsStyles from './order-details.module.css';
import { CloseIcon, CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

function OrderDetails(props) {
    return (
        <div className={OrderDetailsStyles.container}>
            <div className={`${OrderDetailsStyles.header} pl-10 pt-10 pr-10`} >
                <p className='text text_type_main-large pr-9'></p>
                <p className={OrderDetailsStyles.cursor}>
                    <CloseIcon type="primary" onClick={props.onCloseModal} />
                </p>
            </div >
            <p className={`${OrderDetailsStyles.maxWidth} text text_type_digits-large mt-10`}>034536</p>
            <p className={`${OrderDetailsStyles.maxWidth} text text_type_main-medium pt-8 pb-15`}>идентификатор заказа</p>
            <div className={`${OrderDetailsStyles.CheckMarkIcon}`}>
                <CheckMarkIcon type="primary" />
            </div>
            <p className={`${OrderDetailsStyles.maxWidth} text text_type_main-default pt-15`}>Ваш заказ начали готовить</p>
            <p className={`${OrderDetailsStyles.maxWidth} text text_type_main-default text_color_inactive pt-2 pb-15 pt-2 pb-30`}>Дождитесь готовности на орбитальной станции</p>
        </div>
    );
}

OrderDetails.propTypes = {
    onCloseModal: PropTypes.func.isRequired
};

export default OrderDetails;