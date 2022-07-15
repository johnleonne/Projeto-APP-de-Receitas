import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { FoodsContext } from '../../context/FoodContext';
import Header from '../../components/Header';

export default function Drinks() {
  const { recipes } = useContext(FoodsContext);
  const history = useHistory();

  useEffect(() => {
    if (recipes.length === 1) {
      const drinkId = recipes[0].idDrink;
      history.push(`/drinks/${drinkId}`);
    }
  }, [recipes]);

  return (
    <main className="drinks-page-container">
      <Header title="Drinks" haveSearch />
      <h1>Drinks page</h1>
    </main>
  );
}
