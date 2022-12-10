import { useEffect } from 'react';
import appStyles from './app.module.css';
import AppHeader from '../app-header/app-header.jsx';
import BurgerIngredients from '../burger-ingredients/burger-ingredients.jsx';
import BurgerConstructor from '../burger-constructor/burger-constructor.jsx';
import Modal from '../modal/modal.jsx';
import { getIngredients } from '../../services/actions/ingredients.js';
import IngredientDetails from '../ingredient-details/ingredient-details.jsx';
import OrderDetails from '../order-details/order-details.jsx';
import { useSelector, useDispatch } from 'react-redux';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { closeingredientModalAction, openIngredientModalAction } from '../../services/actions/current-ingredient.js';
import { closeOrderModal, createOrder } from '../../services/actions/order.js';
import { clearBurgerIngredientsAction } from '../../services/actions/burger-ingredients.js';

function App() {
  const dispatch = useDispatch();
  const { ingredients } = useSelector(store => store.ingredients);
  const { ingredient } = useSelector(store => store.currentIngredient);
  const { order } = useSelector(store => store.order);

  const handleOpenIngredientModal = (item) => {
    dispatch(openIngredientModalAction(item));
  }

  const handleOpenOrderModal = (item) => {
    dispatch(createOrder(item));
  }

  const handleCloseModal = () => {
    dispatch(closeingredientModalAction());
    dispatch(closeOrderModal());
  }

  useEffect(() => {
    if (order !== null) {
      dispatch(clearBurgerIngredientsAction());
      return;
    }
    dispatch(getIngredients());
  }, [dispatch, order]);

  return (
    <div className={appStyles.page}>
      <AppHeader />
      {ingredients.length !== 0 && (
        <>
          <main className={appStyles.main}>
            <DndProvider backend={HTML5Backend}>
              <BurgerIngredients openModal={handleOpenIngredientModal} />
              <BurgerConstructor openModal={handleOpenOrderModal} />
            </DndProvider>
          </main>
          <div className={appStyles.overflow}>
            {
              ingredient !== null && (
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

export default App;
