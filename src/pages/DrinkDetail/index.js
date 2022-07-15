import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import DrinksService from '../../services/DrinksService';

export default function DrinkDetail() {
  const [drinkDetail, setDrinkDetail] = useState(null);
  const { pathname } = useLocation();

  useEffect(() => {
    async function requestRecipeDetail() {
      const drinkId = pathname.split('/').filter(Boolean)[1];
      const drink = await DrinksService.requestByDrinkId(drinkId);
      setDrinkDetail(drink);
      console.log(drinkDetail);
    }

    requestRecipeDetail();
  }, []);

  return (
    <main className="drink-detail-page-container">
      <h1>Drink detail page</h1>
    </main>
  );
}
