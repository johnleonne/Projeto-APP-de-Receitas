import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clipboardCopy from 'clipboard-copy';
import createFavoriteRecipeObject from '../../utils/createFavoriteRecipeObject';

export default function RecipeDetailsInteractions({ recipe, recipeType }) {
  const [isLinkCopied, setIsLinkCopied] = useState(false);

  function handleShare() {
    setIsLinkCopied(true);
    clipboardCopy(window.location.href);
  }

  function handleFavorite() {
    console.log(recipeType);
    const favoriteRecipeObj = createFavoriteRecipeObject(recipe, recipeType);

    const currentFavoriteRecipesObj = JSON
      .parse(localStorage.getItem('favoriteRecipes')) ?? [];

    const favoriteRecipeAlreadyExists = currentFavoriteRecipesObj.find((favRecipe) => (
      Number(favRecipe.id) === Number(favoriteRecipeObj.id)
    ));

    if (favoriteRecipeAlreadyExists) {
      const currentFavoriteRecipes = JSON
        .parse(localStorage.getItem('favoriteRecipes'));

      const removedFavorite = currentFavoriteRecipes.filter((favRevipe) => (
        Number(favRevipe.id) !== Number(favoriteRecipeObj.id)
      ));

      return localStorage
        .setItem(
          'favoriteRecipes',
          JSON.stringify(removedFavorite),
        );
    }

    localStorage
      .setItem(
        'favoriteRecipes',
        JSON.stringify([...currentFavoriteRecipesObj, favoriteRecipeObj]),
      );
  }

  return (
    <div className="interaction-buttons">
      <button
        type="button"
        data-testid="share-btn"
        onClick={ handleShare }
      >
        Share
      </button>
      { isLinkCopied && <p>Link copied!</p>}
      <button
        type="button"
        data-testid="favorite-btn"
        onClick={ handleFavorite }
      >
        Favorite
      </button>
    </div>
  );
}

RecipeDetailsInteractions.propTypes = {
  recipe: PropTypes.shape().isRequired,
  recipeType: PropTypes.string.isRequired,
};
