import feedOrdersStyles from './feed-orders.module.css';
import { type FC, useEffect } from 'react';
import Order from '../order/order';
import { useDispatch, useSelector } from '../../hooks/hooks';
import { getIngredients } from '../../services/actions/ingredients';
import { type TOrder } from '../../types';

type TFeedOrdersProps = {
  openModal: (id: string) => void
  orders: TOrder[]
  displayStatus?: boolean
}

const FeedOrders: FC<TFeedOrdersProps> = ({ openModal, orders, displayStatus }) => {
  orders.sort((a: TOrder, b: TOrder) => (a._id < b._id ? 1 : -1));
  const dispatch = useDispatch();

  const { ingredients: storeIngredients, ingredientsRequest } = useSelector(store => store.ingredients);

  useEffect(() => {
    if (!ingredientsRequest && storeIngredients.length === 0) {
      dispatch(getIngredients());
    }
  }, [dispatch, storeIngredients, ingredientsRequest]);

  return storeIngredients && (
        <section>
            <div className={feedOrdersStyles.scroll}>
                <ul className={feedOrdersStyles.list}>
                    {
                        orders.map((order: TOrder) => (
                            <Order key={order._id} order={order} openModal={openModal} displayStatus={displayStatus} />
                        ))
                    }
                </ul>
            </div>
        </section >
  );
};

export default FeedOrders;
