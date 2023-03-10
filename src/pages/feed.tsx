import { useMemo } from 'react';
import { useDispatch, useSelector } from '../hooks/hooks';
import { useLocation, useNavigate } from 'react-router-dom';
import FeedDetails from '../components/feed-details/feed-details';
import FeedOrders from '../components/feed-orders/feed-orders';
import Modal from '../components/modal/modal';
import { closeOrderModalAction, openOrderModalAction } from '../services/actions/current-order';
import { ORDER_FEED_PATH, STATUS_DONE, STATUS_PENDING } from '../utils/constants';
import feedStyles from './feed.module.css';

function FeedPage () {
  const { total, totalToday, orders } = useSelector(store => store.orders);
  const { id: orderId, modal } = useSelector(store => store.currentOrder);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleOpenOrderModal = (orderId: string) => {
    dispatch(openOrderModalAction(orderId));
    navigate(`${ORDER_FEED_PATH}/${orderId}`);
  };

  const handleCloseOrderModal = () => {
    if (location.pathname !== `${ORDER_FEED_PATH}`) {
      navigate(`/${ORDER_FEED_PATH}`);
    }
    dispatch(closeOrderModalAction());
  };

  return (
        <div className={feedStyles.page}>
            <main className={feedStyles.main}>
                <p className={`${feedStyles.title} text text_type_main-large pt-10 pb-5`}>
                    Лента заказов
                </p>
                <FeedOrders openModal={handleOpenOrderModal} orders={orders} />
                <div>
                    <div className={feedStyles.grid}>
                        <p className="text text_type_main-medium mb-6">Готовы:</p>
                        <div className={`${feedStyles.numbers} ${feedStyles.done}`}>
                            {
                                useMemo(() => orders.map((order) =>
                                  order.status === STATUS_DONE && (
                                        <p className={`${feedStyles.number} text text_type_digits-default pb-2`} key={order._id}>
                                            {order.number}
                                        </p>
                                  )
                                ), [orders])
                            }
                        </div>
                        <p className={`${feedStyles.pendingHeader} text text_type_main-medium mb-6`}>В работе:</p>
                        <div className={`${feedStyles.numbers} ${feedStyles.pending}`}>
                            {
                                useMemo(() => orders.map((order) =>
                                  order.status === STATUS_PENDING && (
                                        <p className={`${feedStyles.number} text text_type_digits-default pb-2`} key={order._id}>
                                            {order.number}
                                        </p>
                                  )
                                ), [orders])
                            }
                        </div>
                    </div>
                    <p className='text text_type_main-medium mt-15'>Выполнено за все время:</p>
                    <p className={`${feedStyles.shadow} text text_type_digits-large`}>
                        {total}
                    </p>
                    <p className='text text_type_main-medium mt-15'>Выполнено за сегодня:</p>
                    <p className={`${feedStyles.shadow} text text_type_digits-large`}>
                        {totalToday}
                    </p>
                </div>
            </main>
            {
                orderId !== null && modal && (
                    <Modal onCloseModal={handleCloseOrderModal} isDigit={true} title={`#${orders.find((el) => el._id === orderId)?.number ?? 'undefined'}`}>
                        <FeedDetails />
                    </Modal>
                )
            }
        </div>
  );
}

export default FeedPage;
