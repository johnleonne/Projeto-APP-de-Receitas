import React from 'react';
import PropTypes from 'prop-types';
import RecipeDetailsInteractions from '../RecipeDetailsInteractions';
import './RecipeInProgress.css';

export default function RecipeInProgress({ recipe }) {
  function getIngredientsKeys() {
    return Object.keys(recipe).filter((key) => key.includes('Ingredient'));
  }

  return (
    <div className="recipe-in-progress-page-container">
      <h1 data-testid="recipe-title">{ recipe.strDrink || recipe.strMeal }</h1>
      <h3 data-testid="recipe-category">{ recipe.strAlcoholic || recipe.strCategory }</h3>
      <img
        data-testid="recipe-photo"
        src={ recipe.strDrinkThumb || recipe.strMealThumb }
        alt={ recipe.strDrink || recipe.strMeal }
      />
      <RecipeDetailsInteractions
        recipe={ recipe }
        recipeType={ recipe.strDrink ? 'drinks' : 'foods' }
      />
      {getIngredientsKeys().map((ingredientKey, index) => {
        if (!recipe[ingredientKey]) return;
        return (
          <label
            key={ Math.random() }
            htmlFor={ recipe.strDrink || recipe.strMeal }
            data-testid={ `${index}-ingredient-step` }
          >
            <input
              type="checkbox"
              id={ recipe.strDrink || recipe.strMeal }
            />
            { recipe[ingredientKey] }
          </label>
        );
      })}
      <p data-testid="instructions">{ recipe.strInstructions }</p>
      <button type="button" data-testid="finish-recipe-btn">
        Finish recipe
      </button>
    </div>
  );
}

RecipeInProgress.propTypes = {
  recipe: PropTypes.shape().isRequired,
};
