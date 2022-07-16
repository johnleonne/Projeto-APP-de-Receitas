import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import FoodsService from '../../services/FoodsService';

export default function FoodDetail() {
  const [recipeDetail, setRecipeDetail] = useState([]);
  const { pathname } = useLocation();

  useEffect(() => {
    async function requestRecipeDetail() {
      const recipeId = pathname.split('/').filter(Boolean)[1];
      const recipe = await FoodsService.requestByFoodId(recipeId);
      setRecipeDetail(recipe);
      console.log(recipeDetail);
    }

    requestRecipeDetail();
  }, []);

  return (
    <main className="food-detail-page-container">
      <h1>Food detail page</h1>
      <h3>{ recipeDetail[0]?.strMeal }</h3>
      <img
        src={ recipeDetail[0]?.strMealThumb }
        alt={ recipeDetail[0]?.strMeal }
      />
    </main>
  );
}
