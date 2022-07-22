import React, { useEffect, useState } from 'react';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import PropTypes from 'prop-types';
import DrinksService from '../../services/DrinksService';
import FoodsService from '../../services/FoodsService';
import createFavoriteRecipeObject from '../../utils/createFavoriteRecipeObject';
import FavoriteHeartContainer from './styles';

export default function FavoriteHeart({ recipeId, recipeType }) {
  const [isFav, setIsFav] = useState(false);
  const [favRecipe, setFavRecipe] = useState(null);

  useEffect(() => {
    async function requestFavRecipe() {
      if (recipeType === 'food') {
        const favRecipeData = await FoodsService.requestByFoodId(recipeId);
        setFavRecipe(favRecipeData);
        return;
      }

      const favRecipeData = await DrinksService.requestByDrinkId(recipeId);
      setFavRecipe(favRecipeData);
    }

    requestFavRecipe();
  }, []);

  useEffect(() => {
    const localStorageFavorites = JSON.parse(localStorage.getItem('favoriteRecipes'))
    || [];
    const isRecipeFavorited = localStorageFavorites.find(({ id }) => id === recipeId);

    if (isRecipeFavorited) {
      setIsFav(true);
      return;
    }

    setIsFav(false);
  }, []);

  function handleFavorite(id) {
    const localStorageFavorites = JSON.parse(localStorage.getItem('favoriteRecipes'))
    ?? [];

    if (isFav) {
      const removeFromFavorites = localStorageFavorites.filter((favorite) => (
        favorite.id !== id
      ));

      localStorage.setItem('favoriteRecipes', JSON.stringify(removeFromFavorites));
      setIsFav(false);
      return;
    }

    const isFoodOrDrink = recipeType === 'food' ? 'foods' : 'drinks';

    const favoriteRecipeObj = createFavoriteRecipeObject(favRecipe[0], isFoodOrDrink);

    const updatedFavorites = [...localStorageFavorites, favoriteRecipeObj];

    localStorage.setItem('favoriteRecipes', JSON.stringify(updatedFavorites));
    setIsFav(true);
  }

  return (
    <FavoriteHeartContainer>
      {isFav
        ? (
          <AiFillHeart
            size={ 40 }
            onClick={ () => handleFavorite(recipeId) }
            alt="favorite icon"
            data-testid="favorite-btn"
            className="favorite-heart"
          />
        )
        : (
          <AiOutlineHeart
            size={ 40 }
            onClick={ () => handleFavorite(recipeId) }
            alt="favorite icon"
            data-testid="favorite-btn"
            className="favorite-heart"
          />
        )}
    </FavoriteHeartContainer>
  );
}

FavoriteHeart.propTypes = {
  recipeId: PropTypes.string.isRequired,
  recipeType: PropTypes.string.isRequired,
};
