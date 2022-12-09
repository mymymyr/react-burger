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
import { CLOSE_INGREDIENT_MODAL, OPEN_INGREDIENT_MODAL } from '../../services/actions/current-ingredient';
import { CLOSE_ORDER_MODAL, createOrder } from '../../services/actions/order';

function App() {
  const dispatch = useDispatch();

  const { ingredients } = useSelector(store => store.ingredients);
  const { ingredient } = useSelector(store => store.currentIngredient);
  const { order } = useSelector(store => store.order);

  function handleOpenIngredientModal(item) {
    dispatch({
      type: OPEN_INGREDIENT_MODAL,
      ingredient: { ...item }
    })
  }

  function handleOpenOrderModal(item) {
    dispatch(createOrder(item));
  }

  function handleCloseModal() {
    dispatch({
      type: CLOSE_INGREDIENT_MODAL
    });
    dispatch({
      type: CLOSE_ORDER_MODAL
    })
  }

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

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
