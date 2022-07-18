import React from 'react';
import PropTypes from 'prop-types';
import useLocalStorage from '../../hooks/useLocalStorage';
import './StartRecipeButton.css';

export default function StartRecipeButton({ recipe, recipeType }) {
  const [doneRecipes] = useLocalStorage('doneRecipes');

  if (doneRecipes?.find((localStorageRecipe) => (
    Number(localStorageRecipe.id) === Number(recipe.idMeal ?? recipe.idDrink)
  ))) return null;

  return (
    <button
      type="button"
      data-testid="start-recipe-btn"
      className="start-recipe-button"
      onClick={ () => console.log(recipe, recipeType) }
    >
      Start Recipe
    </button>
  );
}

StartRecipeButton.propTypes = {
  recipe: PropTypes.shape().isRequired,
  recipeType: PropTypes.string.isRequired,
};
