import feedOrdersStyles from './feed-orders.module.css';
import { useEffect } from "react";
import Order from "../order/order";
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { getIngredients } from '../../services/actions/ingredients';

function FeedOrders({ openModal, orders, displayStatus }) {
    orders.sort((a, b) => (a._id < b._id ? 1 : -1));
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
                        orders.map((order) => (
                            <Order key={order._id} order={order} openModal={openModal} displayStatus={displayStatus} />
                        ))
                    }
                </ul>
            </div>
        </section >
    );
}

FeedOrders.propTypes = {
    openModal: PropTypes.func.isRequired,
    orders: PropTypes.array.isRequired,
    displayStatus: PropTypes.bool
};

export default FeedOrders;
