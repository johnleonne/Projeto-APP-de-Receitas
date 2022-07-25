import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
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
    <motion.main
      className="drink-in-progress-details-page-container"
      initial={{ opacity: 0, width: 0 }}
      animate={{ opacity: 1, width: '100%' }}
      exit={{ opacity: 0, x: '100%', transition: { duration: 0.4 } }}
    >
      <RecipeInProgress recipe={ inProgressDrink[0] } />
    </motion.main>
  );
}
