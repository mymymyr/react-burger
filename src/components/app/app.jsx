import { useState, useEffect } from 'react';
import appStyles from './app.module.css';
import AppHeader from '../app-header/app-header.jsx';
import BurgerIngredients from '../burger-ingredients/burger-ingredients.jsx';
import BurgerConstructor from '../burger-constructor/burger-constructor.jsx';
import Modal from '../modal/modal.jsx';
import { getIngredients, createOrder } from '../utils/burger-api.js';
import IngredientDetails from '../ingredient-details/ingredient-details.jsx';
import OrderDetails from '../order-details/order-details.jsx';
import { MODALS } from '../utils/constants.js';
import { BurgerContext, OrderContext } from '../utils/contexts.jsx';

function App() {
  const [state, setState] = useState({
    data: null,
    loading: false
  });
  const [modalCurrentType, setModalCurrentType] = useState(null);
  const [item, setItem] = useState(null);
  const [orderNumber, setOrderNumber] = useState(null);

  function handleOpenIngredientModal(item) {
    setItem(item);
    setModalCurrentType(MODALS.Ingredient);
  }

  function handleOpenOrderModal(item) {
    createOrder(item).then(
      (orderData) => {
        if (!orderData.success) { return; }
        setOrderNumber(orderData.order.number);
        setModalCurrentType(MODALS.Order);
      }
    ).catch((err) => {
      console.log(err);
    })
  }

  function handleCloseModal() {
    setModalCurrentType(null)
  }

  useEffect(() => {

    setState({ ...state, loading: true });

    getIngredients().then(
      (data) => {
        setState({ ...state, data: data.data, loading: false });
      }
    ).catch((err) => {
      console.log(err);
      setState({ ...state, loading: false });
    })

  }, []);

  return (
    <div className={appStyles.page}>
      <AppHeader />
      {state.data && (
        <>
          <main className={appStyles.main}>
            <BurgerContext.Provider value={state}>
              <BurgerIngredients openModal={handleOpenIngredientModal} />
              <BurgerConstructor openModal={handleOpenOrderModal} />
            </BurgerContext.Provider>
          </main>
          <div className={appStyles.overflow}>
            {
              modalCurrentType === MODALS.Ingredient && (
                <Modal onCloseModal={handleCloseModal} title='Детали ингредиента'>
                  <IngredientDetails item={item} />
                </Modal>
              )
            }
            {
              modalCurrentType === MODALS.Order && (
                <Modal onCloseModal={handleCloseModal}>
                  <OrderContext.Provider value={orderNumber}>
                    <OrderDetails />
                  </OrderContext.Provider>
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
