import React, { useContext, useEffect } from 'react';
import { FoodsContext } from '../../context/FoodContext';
import Header from '../../components/Header';

export default function Drinks() {
  const { recipes } = useContext(FoodsContext);

  useEffect(() => {
    console.log(recipes);
  }, [recipes]);
  return (
    <main className="drinks-page-container">
      <Header title="Drinks" haveSearch />
      <h1>Drinks page</h1>
    </main>
  );
}
