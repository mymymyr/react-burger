import orderDetailsStyles from './order-details.module.css';
import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';

function OrderDetails() {
    return (
        <>
            <p className={`${orderDetailsStyles.maxWidth} text text_type_digits-large mt-10`}>034536</p>
            <p className={`${orderDetailsStyles.maxWidth} text text_type_main-medium pt-8 pb-15`}>идентификатор заказа</p>
            <div className={`${orderDetailsStyles.CheckMarkIcon}`}>
                <CheckMarkIcon type="primary" />
            </div>
            <p className={`${orderDetailsStyles.maxWidth} text text_type_main-default pt-15`}>Ваш заказ начали готовить</p>
            <p className={`${orderDetailsStyles.maxWidth} text text_type_main-default text_color_inactive pt-2 pb-15 pt-2 pb-30`}>Дождитесь готовности на орбитальной станции</p>
        </>
    );
}

export default OrderDetails;