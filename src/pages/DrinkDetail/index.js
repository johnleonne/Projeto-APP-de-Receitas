import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import DrinksService from '../../services/DrinksService';
import './DrinkDetails.css';

export default function DrinkDetail() {
  const [drinkDetail, setDrinkDetail] = useState([]);
  const { pathname } = useLocation();

  useEffect(() => {
    async function requestRecipeDetail() {
      const drinkId = pathname.split('/').filter(Boolean)[1];
      const drink = await DrinksService.requestByDrinkId(drinkId);
      setDrinkDetail(drink);
    }
    requestRecipeDetail();
  }, []);

  return (
    <main className="drink-detail-page-container">
      <h1>Drink detail page</h1>
      <div className="drink-detail-container">
        <h3>{ drinkDetail[0]?.strDrink }</h3>
        <img
          src={ drinkDetail[0]?.strDrinkThumb }
          alt={ drinkDetail[0]?.strDrink }
        />
      </div>
    </main>
  );
}
