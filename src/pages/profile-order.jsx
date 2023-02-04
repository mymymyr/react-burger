import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import FeedDetails from '../components/feed-details/feed-details';
import FeedOrders from '../components/feed-orders/feed-orders';
import Modal from '../components/modal/modal';
import ProfileMenu from '../components/profile-menu/profile-menu';
import { closeOrderModalAction, openOrderModalAction } from '../services/actions/current-order';
import { ORDER_HISTORY_PATH } from '../utils/constants';
import profilePageStyles from './profile-order.module.css';

function ProfileOrderPage() {
    const { id: orderId, modal } = useSelector(store => store.currentOrder);
    const orders = useSelector(store => store.orders.profileOrders);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const handleOpenOrderModal = (orderId) => {
        dispatch(openOrderModalAction(orderId));
        navigate(`${ORDER_HISTORY_PATH}/${orderId}`);
    }

    const handleCloseOrderModal = () => {
        if (location.pathname !== `${ORDER_HISTORY_PATH}`) {
            navigate(`/${ORDER_HISTORY_PATH}`);
        }
        dispatch(closeOrderModalAction());
    }

    return (
        <div className={profilePageStyles.container}>
            <ProfileMenu subtitle='В этом разделе вы можете просмотреть свою историю заказов' />
            <div className={profilePageStyles.margin}>
                <FeedOrders openModal={handleOpenOrderModal} orders={orders} displayStatus={true} />
            </div>
            {
                orderId !== null && modal && (
                    <Modal onCloseModal={handleCloseOrderModal} isDigit={true} title={`#${orders.find((el) => el._id === orderId).number}`}>
                        <FeedDetails isProfile={true} />
                    </Modal>
                )
            }
        </div>
    );
}

export default ProfileOrderPage;
