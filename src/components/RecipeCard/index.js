import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import RecipeCardContainer from './styles';

export default function RecipeCard({ recipe, index, dataTestId, recomendation }) {
  const redirectEndpoint = recipe.idMeal
    ? `/foods/${recipe.idMeal}`
    : `/drinks/${recipe.idDrink}`;

  return (
    <Link
      to={ redirectEndpoint }
      className="recipe-anchor"
      style={ { textDecoration: 'none' } }
    >
      <RecipeCardContainer data-testid={ dataTestId ?? `${index}-recipe-card` }>
        <img
          src={ recipe.strMealThumb ?? recipe.strDrinkThumb }
          alt={ recipe.strMeal ?? recipe.strDrink }
          data-testid={ `${index}-card-img` }
        />
        <h3
          data-testid={ recomendation
            ? `${index}-recomendation-title`
            : `${index}-card-name` }
        >
          { recipe.strMeal ?? recipe.strDrink }
        </h3>
      </RecipeCardContainer>
    </Link>
  );
}

RecipeCard.propTypes = {
  recipe: PropTypes.shape().isRequired,
  index: PropTypes.number.isRequired,
  dataTestId: PropTypes.string,
  recomendation: PropTypes.bool,
};

RecipeCard.defaultProps = {
  dataTestId: null,
  recomendation: false,
};
