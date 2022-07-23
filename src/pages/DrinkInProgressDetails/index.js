import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DrinksService from '../../services/DrinksService';
import RecipeInProgress from '../../components/RecipeInProgress';

export default function DrinkInProgressDetails() {
  const [inProgressDrink, setInProgressDrink] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    async function requestDrinkById() {
      const drinkInProgress = await DrinksService.requestByDrinkId(id);

      setInProgressDrink(drinkInProgress);
    }

    requestDrinkById();
  }, []);

  if (!inProgressDrink) return null;

  return (
    <main className="drink-in-progress-details-page-container">
      <RecipeInProgress recipe={ inProgressDrink[0] } />
    </main>
  );
}
