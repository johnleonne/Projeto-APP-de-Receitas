import React from 'react';
import PropTypes from 'prop-types';
import useLocalStorage from '../../hooks/useLocalStorage';
import './StartRecipeButton.css';

export default function StartRecipeButton({ recipe, recipeType }) {
  const [doneRecipes] = useLocalStorage('doneRecipes');
  const [inProgressRecipes] = useLocalStorage('inProgressRecipes');
  console.log(recipeType);

  if (doneRecipes?.find((localStorageRecipe) => (
    Number(localStorageRecipe.id) === Number(recipe.idMeal ?? recipe.idDrink)
  ))) return null;

  function isRecipeInProgress(recipeId) {
    if (inProgressRecipes) {
      return Object.keys(inProgressRecipes?.cocktails || {}).includes(recipeId)
      || Object.keys(inProgressRecipes?.meals || {}).includes(recipeId);
    }
  }

  return (
    <button
      type="button"
      data-testid="start-recipe-btn"
      className="start-recipe-button"
    >
      { isRecipeInProgress(recipe.idMeal || recipe.idDrink)
        ? 'Continue Recipe'
        : 'Start Recipe' }
    </button>
  );
}

StartRecipeButton.propTypes = {
  recipe: PropTypes.shape().isRequired,
  recipeType: PropTypes.string.isRequired,
};
