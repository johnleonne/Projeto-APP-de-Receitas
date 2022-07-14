import React, { useContext, useEffect } from 'react';
import Header from '../../components/Header';
import { FoodsContext } from '../../context/FoodContext';

export default function Foods() {
  const { recipes } = useContext(FoodsContext);

  useEffect(() => {
    console.log(recipes);
  }, [recipes]);

  return (
    <main className="foods-page-container">
      <Header title="Foods" haveSearch />
      <h1>Foods page</h1>
    </main>
  );
}
