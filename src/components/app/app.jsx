import { useState, useEffect } from 'react';
import appStyles from './app.module.css';
import AppHeader from '../app-header/app-header.jsx';
import BurgerIngredients from '../burger-ingredients/burger-ingredients.jsx';
import BurgerConstructor from '../burger-constructor/burger-constructor.jsx';
import Modal from '../modal/modal.jsx';
import { getIngredients } from '../utils/burger-api.js'
import IngredientDetails from '../ingredient-details/ingredient-details.jsx';
import OrderDetails from '../order-details/order-details.jsx';

function App() {
  const [state, setState] = useState({
    data: null,
    loading: false
  });

  const Modals = { Ingredient: 'ingredient', Order: 'order' };

  const [modalCurrentType, setModalCurrentType] = useState(null);
  const [item, setItem] = useState(null);


  function handleOpenIngredientModal(item) {
    setItem(item);
    setModalCurrentType(Modals.Ingredient);
  }

  function handleOpenOrderModal(item) {
    setItem(item);
    setModalCurrentType(Modals.Order);
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
            <BurgerIngredients data={state.data} openModal={handleOpenIngredientModal} />
            <BurgerConstructor data={state.data} openModal={handleOpenOrderModal} />
          </main>
          <div className={appStyles.overflow}>
            {
              modalCurrentType === Modals.Ingredient &&
              <Modal onCloseModal={handleCloseModal} title='Детали ингредиента'>
                <IngredientDetails item={item} />
              </Modal>
            }
            {
              modalCurrentType === Modals.Order &&
              <Modal onCloseModal={handleCloseModal} title=''>
                <OrderDetails />
              </Modal>
            }
          </div>
        </>
      )}
    </div>
  );
}

export default App;
