import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './RecipeCard.css';

export default function RecipeCard({ recipe, index }) {
  const redirectEndpoint = recipe.idMeal
    ? `/foods/${recipe.idMeal}`
    : `/drinks/${recipe.idDrink}`;

  return (
    <Link
      to={ redirectEndpoint }
      className="recipe-anchor"
    >
      <section data-testid={ `${index}-recipe-card` } className="recipe-card">
        <img
          src={ recipe.strMealThumb ?? recipe.strDrinkThumb }
          alt={ recipe.strMeal ?? recipe.strDrink }
          data-testid={ `${index}-card-img` }
        />
        <h3 data-testid={ `${index}-card-name` }>
          { recipe.strMeal ?? recipe.strDrink }
        </h3>
      </section>
    </Link>
  );
}

RecipeCard.propTypes = {
  recipe: PropTypes.shape().isRequired,
  index: PropTypes.number.isRequired,
};
