import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
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
    <motion.main
      className="food-in-progress-details-page-container"
      initial={{ opacity: 0, width: 0 }}
      animate={{ opacity: 1, width: '100%' }}
      exit={{ opacity: 0, x: '100%', transition: { duration: 0.4 } }}
    >
      <RecipeInProgress recipe={ inProgressMeal[0] } />
    </motion.main>
  );
}
