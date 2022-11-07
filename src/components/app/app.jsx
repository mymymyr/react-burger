import React, { useState } from 'react';
import appStyles from './app.module.css';
import AppHeader from '../app-header/app-header.jsx';
import BurgerIngredients from '../burger-ingredients/burger-ingredients.jsx';
import data from '../utils/data.js';
import BurgerConstructor from '../burger-constructor/burger-constructor.jsx';

function App() {
  const bunArr = data.filter((item) => item.type === 'bun');
  const mainArr = data.filter((item) => item.type === 'main');
  const sauceArr = data.filter((item) => item.type === 'sauce');
  const [cards, setCards] = useState({bunArr, mainArr, sauceArr});
  return (
    <div className={appStyles.page}>
      <AppHeader />
      <main className={appStyles.main}>
        <BurgerIngredients cards={cards}/>
        <BurgerConstructor cards={cards} />
      </main>
    </div>
  );
}

export default App;
