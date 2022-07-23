import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import FavoriteHeart from '../../components/FavoriteHeart';
import * as Styles from './styles';

export default function DoneRecipes() {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);

  useEffect(() => {
    const doneRecipesLocalStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));

    setFavoriteRecipes(doneRecipesLocalStorage);
  }, []);

  return (
    <Styles.FavoriteRecipesPageContainer>
      <Header title="Favorite Recipes" />
      <Styles.FavoriteRecipesContainer>
        { favoriteRecipes
          && favoriteRecipes.map((recipe, index) => (
            <Styles.FavoriteRecipeCard key={ Math.random() }>

              <Link
                to={ recipe.type === 'food'
                  ? `foods/${recipe.id}` : `drinks/${recipe.id}` }
              >
                <img
                  src={ recipe.image }
                  alt={ recipe.name }
                  data-testid={ `${index}-horizontal-image` }
                />

                <h2 data-testid={ `${index}-horizontal-name` }>
                  { recipe.name }
                </h2>
              </Link>

              <p data-testid={ `${index}-horizontal-done-date` }>{ recipe.doneDate }</p>

              <FavoriteHeart
                recipeId={ recipe.id }
                recipeType={ recipe.type }
              />
            </Styles.FavoriteRecipeCard>
          ))}
      </Styles.FavoriteRecipesContainer>

    </Styles.FavoriteRecipesPageContainer>
  );
}
