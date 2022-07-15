import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../../components/Header';
import { FoodsContext } from '../../context/FoodContext';

export default function Foods() {
  const { recipes } = useContext(FoodsContext);
  const history = useHistory();

  useEffect(() => {
    if (recipes.length === 1) {
      const mealId = recipes[0].idMeal;
      history.push(`/foods/${mealId}`);
    }
  }, [recipes]);

  return (
    <main className="foods-page-container">
      <Header title="Foods" haveSearch />
      <h1>Foods page</h1>
    </main>
  );
}
