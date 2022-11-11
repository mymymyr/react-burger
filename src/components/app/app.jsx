import { useState, useEffect } from 'react';
import appStyles from './app.module.css';
import AppHeader from '../app-header/app-header.jsx';
import BurgerIngredients from '../burger-ingredients/burger-ingredients.jsx';
import BurgerConstructor from '../burger-constructor/burger-constructor.jsx';
import Modal from '../modal/modal.jsx';

function App() {
  const url = 'https://norma.nomoreparties.space/api/ingredients';

  const [state, setState] = useState({
    data: null,
    loading: false
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [item, setItem] = useState({});
  const [modalType, setModalType] = useState({});

  function handleOpenModal(type, item) {
    setItem(item);
    setModalType(type);
    setModalVisible({ modalVisible: true });
  }

  function handleCloseModal() {
    setModalVisible({ modalVisible: false });
  }

  useEffect(() => {
    async function fetchData() {
      setState({ ...state, loading: true });
      try {
        const res = await fetch(url);
        if (!res.ok) {
          const message = `Произошла ошибка: ${res.status}`;
          throw new Error(message);
        };
        const data = await res.json();
        setState({ ...state, data: data.data, loading: false });
      } catch (err) {
        console.log(err);
        setState({ ...state, loading: false });
      }
    };
    fetchData();
  }, []);

  return (
    <div className={appStyles.page}>
      <AppHeader />
      {state.data && (
        <>
          <main className={appStyles.main}>
            <BurgerIngredients data={state.data} openModal={handleOpenModal} />
            <BurgerConstructor data={state.data} openModal={handleOpenModal} />
          </main>
          <div style={{ overflow: 'hidden' }}>
            {
              modalVisible.modalVisible &&
              <Modal onCloseModal={handleCloseModal} item={item} type={modalType}></Modal>
            }
          </div>
        </>
      )}
    </div>
  );
}

export default App;
