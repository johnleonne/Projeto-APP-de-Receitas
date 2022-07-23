import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import FoodsService from '../../services/FoodsService';
import RecipeInProgress from '../../components/RecipeInProgress';

export default function FoodInProgressDetails() {
  const [inProgressMeal, setInProgressMeal] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    async function requestMealById() {
      const drinkInProgress = await FoodsService.requestByFoodId(id);

      setInProgressMeal(drinkInProgress);
    }

    requestMealById();
  }, []);

  if (!inProgressMeal) return null;

  return (
    <main className="food-in-progress-details-page-container">
      <RecipeInProgress recipe={ inProgressMeal[0] } />
    </main>
  );
}
