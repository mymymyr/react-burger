import { useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import homeStyles from './home.module.css';
import BurgerConstructor from "../components/burger-constructor/burger-constructor";
import BurgerIngredients from "../components/burger-ingredients/burger-ingredients";
import IngredientDetails from "../components/ingredient-details/ingredient-details";
import Modal from "../components/modal/modal";
import OrderDetails from "../components/order-details/order-details";
import { clearBurgerIngredientsAction } from "../services/actions/burger-ingredients";
import { closeIngredientModalAction, openIngredientModalAction } from "../services/actions/current-ingredient";
import { getIngredients } from "../services/actions/ingredients";
import { closeOrderModal, createOrder } from "../services/actions/order";
import { getAccessToken } from "../utils/token";


function HomePage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { ingredients, ingredientsRequest } = useSelector(store => store.ingredients);
    const { ingredient, modal } = useSelector(store => store.currentIngredient);
    const { order } = useSelector(store => store.order);
    const userIsAuth = useSelector(store => store.user.isAuthenticated);

    const handleOpenIngredientModal = (item) => {
        dispatch(openIngredientModalAction(item));
        navigate(`/ingredients/${item._id}`);
    }

    const handleOpenOrderModal = async (item) => {
        const accessToken = await getAccessToken();
        if (userIsAuth) {
            dispatch(createOrder(item, accessToken));
        } else {
            navigate('/login?redirect=/');
        }
    }

    const handleCloseModal = () => {
        if (location.pathname !== '/') {
            navigate('/');
        }
        dispatch(closeIngredientModalAction());
        dispatch(closeOrderModal());
    }

    useEffect(() => {
        if (order !== null) {
            dispatch(clearBurgerIngredientsAction());
            return;
        }
        if (!ingredientsRequest && ingredients.length === 0) {
            dispatch(getIngredients());
        }
    }, [dispatch, order, ingredients, ingredientsRequest]);

    return (
        <div className={homeStyles.page}>
            {ingredients.length !== 0 && (
                <>
                    <main className={homeStyles.main}>
                        <DndProvider backend={HTML5Backend}>
                            <BurgerIngredients openModal={handleOpenIngredientModal} />
                            <BurgerConstructor openModal={handleOpenOrderModal} />
                        </DndProvider>
                    </main>
                    <div className={homeStyles.overflow}>
                        {
                            ingredient !== null && modal && (
                                <Modal onCloseModal={handleCloseModal} title='Детали ингредиента'>
                                    <IngredientDetails />
                                </Modal>
                            )
                        }
                        {
                            order !== null && (
                                <Modal onCloseModal={handleCloseModal}>
                                    <OrderDetails />
                                </Modal>
                            )
                        }
                    </div>
                </>
            )}
        </div>
    );
}

export default HomePage;
