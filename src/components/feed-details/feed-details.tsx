import feedDetailsStyles from './feed-details.module.css';
import { BURGER_COMPOSITION, STATUS_CREATED, STATUS_DONE, STATUS_PENDING } from '../../utils/constants';
import { type FC, useEffect, useMemo } from 'react';
import { getIngredients } from '../../services/actions/ingredients';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector, useDispatch } from '../../hooks/hooks';
import { type TIngredient } from '../../types';

type TFeedDetailsProps = {
  isProfile?: boolean
}

const FeedDetails: FC<TFeedDetailsProps> = ({ isProfile }) => {
  const orderId = useSelector(store => store.currentOrder.id);
  const orders = useSelector(store => isProfile ? store.orders.profileOrders : store.orders.orders);
  const order = useMemo(() => orders?.find((el) => el._id === orderId), [orders, orderId]);
  const status = order ? order.status : undefined;
  const dispatch = useDispatch();
  const { ingredients: storeIngredients, ingredientsRequest } = useSelector(store => store.ingredients);
  const orderIngredients = useMemo(() => order ? order.ingredients : [], [order]);
  const isCorrectData = useMemo(() => orderIngredients.every((el: string) => storeIngredients.some((x) => el === x._id)), [orderIngredients, storeIngredients]);
  const ingredients: TIngredient[] = useMemo(() => [], []);

  storeIngredients.length > 0 && orderIngredients.forEach((id: string) => {
    const ingredient = storeIngredients.find((el: TIngredient) => el._id === id);
    if (ingredient != null) {
      ingredients.push({ ...ingredient });
    }
  });

  const bun = useMemo(() => ingredients.find((item) => item.type === BURGER_COMPOSITION.bun), [ingredients]);
  const internalIngredients = useMemo(() => ingredients.filter((item) => item.type !== BURGER_COMPOSITION.bun), [ingredients]);

  const sum = ((bun != null) ? bun.price * 2 : 0) +
        internalIngredients.reduce((prev, cur) => prev + cur.price, 0);

  const multipleIngredients = ((bun != null) ? [bun, bun, ...internalIngredients] : [...internalIngredients]).reduce((total: Record<string, number>, el: TIngredient) => { total[el._id] ? total[el._id] += 1 : total[el._id] = 1; return total; }, {});

  useEffect(() => {
    if (!ingredientsRequest && storeIngredients.length === 0) {
      dispatch(getIngredients());
    }
  }, [dispatch, storeIngredients, ingredientsRequest]);

  if (orders?.length === 0) {
    return null;
  }
  return (order
    ? (
        <div className={feedDetailsStyles.container}>
            <p className='text text_type_main-medium mt-10 mb-3'>
                {order.name}
            </p>
            <p className={`${status === STATUS_DONE ? feedDetailsStyles.colorDone : ''} text text_type_main-small mb-15`}>
                {status === STATUS_CREATED ? 'Создан' : status === STATUS_DONE ? 'Выполнен' : status === STATUS_PENDING ? 'Готовится' : 'Отменен'}
            </p>
            <p className='text text_type_main-medium mb-6'>
                Состав:
            </p>
            {isCorrectData
              ? <ul className={feedDetailsStyles.list}>
                    {Object.entries(multipleIngredients).map((el) => {
                      const ing = ingredients.find((x) => x._id === el[0]);
                      if (!ing) {
                        return null;
                      }
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
                      );
                    })}
                </ul>
              : <p className={`${feedDetailsStyles.red} text text_type_main-default`}>
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
      )
    : (<p className={`${feedDetailsStyles.center} text text_type_main-medium mt-10`}>Заказ не найден</p>));
};

export default FeedDetails;
