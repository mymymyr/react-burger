import feedDetailsStyles from './feed-details.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { BURGER_COMPOSITION, STATUS_CREATED, STATUS_DONE, STATUS_PENDING } from '../../utils/constants';
import { useEffect, useMemo } from 'react';
import { getIngredients } from '../../services/actions/ingredients';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

function FeedDetails({ isProfile }) {
    const orderId = useSelector(store => store.currentOrder.id);
    const orders = useSelector(store => isProfile ? store.orders.profileOrders : store.orders.orders);
    const order = useMemo(() => orders.find((el) => el._id === orderId), [orders, orderId]);
    const status = order ? order.status : undefined;
    const dispatch = useDispatch();
    const { ingredients: storeIngredients, ingredientsRequest } = useSelector(store => store.ingredients);
    const orderIngredients = useMemo(() => order ? order.ingredients : [], [order]);
    const isCorrectData = useMemo(() => orderIngredients.every((el) => storeIngredients.some((x) => el === x._id)), [orderIngredients, storeIngredients]);
    const ingredients = useMemo(() => [], []);

    storeIngredients.length > 0 && orderIngredients.forEach(id => {
        ingredients.push({ ...storeIngredients.find(el => el._id === id) });
    });

    const bun = useMemo(() => ingredients.find((item) => item.type === BURGER_COMPOSITION.bun), [ingredients]);
    const internalIngredients = useMemo(() => ingredients.filter((item) => item.type !== BURGER_COMPOSITION.bun), [ingredients]);

    const sum = (bun ? bun.price * 2 : 0) +
        internalIngredients.reduce((prev, cur) => prev + cur.price, 0);

    const multipleIngredients = (bun ? [bun, bun, ...internalIngredients] : [...internalIngredients]).reduce((total, el) => { total[el._id] ? total[el._id] += 1 : total[el._id] = 1; return total }, {});

    useEffect(() => {
        if (!ingredientsRequest && storeIngredients.length === 0) {
            dispatch(getIngredients());
        }
    }, [dispatch, storeIngredients, ingredientsRequest]);

    return (orders.length > 0) && (order ? (
        <div className={feedDetailsStyles.container}>
            <p className='text text_type_main-medium mt-10 mb-3'>
                {order.name}
            </p>
            <p className={`${status === STATUS_DONE && feedDetailsStyles.colorDone} text text_type_main-small mb-15`}>
                {status === STATUS_CREATED ? 'Создан' : status === STATUS_DONE ? 'Выполнен' : status === STATUS_PENDING ? 'Готовится' : 'Отменен'}
            </p>
            <p className='text text_type_main-medium mb-6'>
                Состав:
            </p>
            {isCorrectData ?
                <ul className={feedDetailsStyles.list}>
                    {Object.entries(multipleIngredients).map((el) => {
                        const ing = ingredients.find((x) => x._id === el[0]);
                        return (
                            <li className={feedDetailsStyles.listItem} key={ing._id}>
                                <div className={feedDetailsStyles.imageWrap}>
                                    <img className={feedDetailsStyles.image} src={ing.image} alt={ing.name} />
                                </div>
                                <p className="text text_type_main-default">{ing.name}</p>
                                <div className={feedDetailsStyles.flex}>
                                    <p className='text text_type_digits-default mr-2'>
                                        {`${multipleIngredients[ing._id]} x ${ing.price}`}
                                    </p>
                                    <CurrencyIcon type='primary' />
                                </div>
                            </li>
                        )
                    })}
                </ul>
                :
                <p className={`${feedDetailsStyles.red} text text_type_main-default`}>
                    Нет корректных данных
                </p>
            }
            <div className={`${feedDetailsStyles.flex} text text_type_main-default mt-10 mb-10`}>
                <FormattedDate
                    date={
                        new Date(order.createdAt)
                    }
                />
                {isCorrectData &&
                    <div className={feedDetailsStyles.flex}>
                        <p className='text text_type_digits-default mr-2'>
                            {sum}
                        </p>
                        <CurrencyIcon type='primary' />
                    </div>
                }
            </div>
        </div>
    ) : (<p className={`${feedDetailsStyles.center} text text_type_main-medium mt-10`}>Заказ не найден</p>));
}

FeedDetails.propTypes = {
    isProfile: PropTypes.bool
};

export default FeedDetails;
