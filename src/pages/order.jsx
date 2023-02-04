import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import FeedPage from "./feed";
import FeedDetails from '../components/feed-details/feed-details';
import { setCurrentOrderAction } from "../services/actions/current-order";
import { getIngredients } from "../services/actions/ingredients";
import orderPadeStyles from './order.module.css';
import ProfileOrderPage from "./profile-order";

function OrderPage() {
    const params = useParams();
    const dispatch = useDispatch();
    const isProfile = useLocation().pathname.split('/')[1] === 'profile';
    const orders = useSelector(store => isProfile ? store.orders.profileOrders : store.orders.orders);
    const { id: orderId, modal } = useSelector(store => store.currentOrder);
    const { ingredients, ingredientsRequest } = useSelector(store => store.ingredients);
    const order = orders.find((el) => el._id === orderId);
    const orderNumber = order ? order.number : undefined;

    useEffect(() => {
        if (!ingredientsRequest && ingredients.length === 0) {
            dispatch(getIngredients());
        } else if (ingredients && ingredients.length > 0 && !orderId && orders.length > 0) {
            dispatch(setCurrentOrderAction(params.id));
        }
    }, [dispatch, orderId, orders, ingredients, ingredientsRequest, params.id]);

    return orderId && (modal ? (isProfile ? <ProfileOrderPage /> : <FeedPage />) : (
        <div className={orderPadeStyles.container}>
            <p className={`${orderPadeStyles.title} text text_type_digits-default mt-30`}>{`#${orderNumber}`}</p>
            <FeedDetails isProfile={isProfile} />
        </div>));

}

export default OrderPage;
