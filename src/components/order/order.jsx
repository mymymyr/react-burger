import orderStyles from './order.module.css';
import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { BURGER_COMPOSITION, MAX_COUNT, STATUS_CREATED, STATUS_DONE, STATUS_PENDING } from '../../utils/constants';
import { useSelector } from 'react-redux';
import { useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';


function Order({ order, openModal, displayStatus }) {
    const orderIngredients = order.ingredients;
    const { ingredients: storeIngredients } = useSelector(store => store.ingredients);
    const isCorrectData = useMemo(() => orderIngredients.every((el) => storeIngredients.some((x) => el === x._id)), [orderIngredients, storeIngredients]);
    let ingredients = useMemo(() => [], []);
    storeIngredients.length > 0 && orderIngredients.forEach(id => {
        ingredients.push({ ...storeIngredients.find(el => el._id === id) });
    });
    const bun = useMemo(() => ingredients.find((item) => item.type === BURGER_COMPOSITION.bun), [ingredients]);
    const internalIngredients = useMemo(() => ingredients.filter((item) => item.type !== BURGER_COMPOSITION.bun), [ingredients]);
    bun ? ingredients = [bun, ...internalIngredients] : ingredients = [...internalIngredients];
    const sum = (bun ? bun.price * 2 : 0) +
        internalIngredients.reduce((prev, cur) => prev + cur.price, 0);
    const orderNumber = order ? order.number : undefined;

    return (
        <li className={orderStyles.element} onClick={() => { openModal(order._id) }}>
            <div className={`${orderStyles.container} text text_type_digits-default`}>
                <p className={'text text_type_digits-default'}>
                    #{orderNumber}
                </p>
                <p className={'text text_type_main-default text_color_inactive'}>
                    <FormattedDate
                        date={
                            new Date(order.createdAt)
                        }
                    />
                </p>
            </div>
            <p className={`${orderStyles.position__center} text text_type_main-medium mt-6 mb-6`}>
                {order.name}
            </p>
            {!isCorrectData ?
                <p className={`${orderStyles.red} text text_type_main-default`}>
                    Нет корректных данных
                </p>
                :
                <>
                    {displayStatus && (<p className={`${order.status === STATUS_DONE && orderStyles.colorDone} text text_type_main-small mb-15`}>
                        {order.status === STATUS_CREATED ? 'Создан' : order.status === STATUS_DONE ? 'Выполнен' : order.status === STATUS_PENDING ? 'Готовится' : 'Отменен'}
                    </p>)}
                    <div className={`${orderStyles.container} text text_type_digits-default`}>
                        <div className={orderStyles.images}>
                            {ingredients.slice(0, MAX_COUNT + 1).map((el, index) => {
                                const condition = index === MAX_COUNT && ingredients.length !== (MAX_COUNT + 1);
                                return (
                                    <div className={orderStyles.imageWrap} style={{ zIndex: 6 - index }} key={uuidv4()} >
                                        <img className={orderStyles.image} src={el.image} alt={el.name} style={{ zIndex: 1 + 6 - index }} />
                                        {condition && (
                                            <>
                                                <p className={`${orderStyles.lastImg} text text_type_digits-default`}>
                                                    {ingredients.length - index - 1 > 9 ? (<>&#8734;</>) : `+${ingredients.length - index - 1}`}
                                                </p>
                                                <div className={orderStyles.cover}></div>
                                            </>
                                        )}
                                    </div>

                                )
                            })}
                        </div>
                        <div className={orderStyles.flex}>
                            <p className='text text_type_digits-default'>
                                {sum}
                            </p>
                            <div className={orderStyles.currencyIcon}>
                                <CurrencyIcon type='primary' />
                            </div>
                        </div>
                    </div>
                </>
            }
        </li>
    );
}

Order.propTypes = {
    order: PropTypes.object.isRequired,
    openModal: PropTypes.func.isRequired,
    displayStatus: PropTypes.bool
};

export default Order;
