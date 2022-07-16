import React from 'react';
import PropTypes from 'prop-types';
import './RecipeCard.css';

export default function RecipeCard({ recipe, index }) {
  return (
    <section data-testid={ `${index}-recipe-card` } className="recipe-card">
      <img
        src={ recipe.strMealThumb ?? recipe.strDrinkThumb }
        alt={ recipe.strMeal ?? recipe.strDrink }
        data-testid={ `${index}-card-img` }
      />
      <h3 data-testid={ `${index}-card-name` }>{ recipe.strMeal ?? recipe.strDrink }</h3>
    </section>
  );
}

RecipeCard.propTypes = {
  recipe: PropTypes.shape().isRequired,
  index: PropTypes.number.isRequired,
};
