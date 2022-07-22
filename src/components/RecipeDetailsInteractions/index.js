import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clipboardCopy from 'clipboard-copy';
import { BiShare } from 'react-icons/bi';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import createFavoriteRecipeObject from '../../utils/createFavoriteRecipeObject';
import InteractionButtonsContainer from './styles';

export default function RecipeDetailsInteractions({ recipe, recipeType }) {
  const [isLinkCopied, setIsLinkCopied] = useState(false);
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    const currentFavoriteRecipesArray = JSON
      .parse(localStorage.getItem('favoriteRecipes')) ?? [];

    const favoriteRecipeAlreadyExists = currentFavoriteRecipesArray
      .find((favRecipe) => (
        Number(favRecipe.id) === Number(recipe.idDrink || recipe.idMeal)));

    if (favoriteRecipeAlreadyExists) setIsFav(true);
  }, [recipe]);

  function handleShare() {
    const twoSeconds = 2000;

    setIsLinkCopied(true);

    if (window.location.href.includes('/in-progress')) {
      const parsedUrl = window.location.href.split('/in-progress');
      clipboardCopy(parsedUrl[0]);
    } else {
      clipboardCopy(window.location.href);
    }

    setTimeout(() => {
      setIsLinkCopied(false);
    }, twoSeconds);
  }

  function handleFavorite() {
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

      setIsFav(false);

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

    setIsFav(true);
  }

  return (
    <InteractionButtonsContainer isLinkCopied={ isLinkCopied }>
      <BiShare
        size={ 40 }
        color="#000"
        role="button"
        data-testid="share-btn"
        onClick={ () => handleShare() }
        className="share-button"
      />
      { isLinkCopied && <p className="copied-msg">Link copied!</p>}
      { isFav
        ? (
          <AiFillHeart
            size={ 40 }
            onClick={ () => handleFavorite() }
            alt="favorite icon"
            data-testid="favorite-btn"
            className="filled-favorite-button"
          />
        )
        : (
          <AiOutlineHeart
            size={ 40 }
            onClick={ () => handleFavorite() }
            alt="favorite icon"
            data-testid="favorite-btn"
            className="favorite-button"
          />
        )}
    </InteractionButtonsContainer>
  );
}

RecipeDetailsInteractions.propTypes = {
  recipe: PropTypes.shape().isRequired,
  recipeType: PropTypes.string.isRequired,
};
