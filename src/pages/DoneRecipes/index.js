import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import FavoriteHeart from '../../components/FavoriteHeart';
import * as Styles from './styles';

export default function DoneRecipes() {
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [currFilter, setCurrFilter] = useState('all');

  useEffect(() => {
    const doneRecipesLocalStorage = JSON.parse(localStorage.getItem('doneRecipes')) || [];

    setDoneRecipes(doneRecipesLocalStorage);
  }, []);

  const handleButtonClick = useCallback((event) => {
    const { target } = event;
    setCurrFilter(target.value);
  }, []);

  const filteredByTypeRecipes = useMemo(() => {
    if (currFilter === 'all') return doneRecipes;

    return doneRecipes.filter(({ type }) => type === currFilter);
  }, [currFilter, doneRecipes]);

  return (
    <Styles.DoneRecipesPageContainer
      initial={{ opacity: 0, width: 0 }}
      animate={{ opacity: 1, width: '100%', transition: { duration: 0.3 } }}
      exit={{ opacity: 0, x: '100%', transition: { duration: 0.2 }  }}
    >
      <Header title="Done Recipes" />
      <Styles.ButtonsContainer currFilter={ currFilter }>
        <button
          type="button"
          value="all"
          className="all"
          data-testid="filter-by-all-btn"
          onClick={ (e) => handleButtonClick(e) }
        >
          All
        </button>
        <button
          type="button"
          value="food"
          className="food"
          data-testid="filter-by-food-btn"
          onClick={ (e) => handleButtonClick(e) }
        >
          Foods
        </button>
        <button
          type="button"
          value="drink"
          className="drink"
          data-testid="filter-by-drink-btn"
          onClick={ (e) => handleButtonClick(e) }
        >
          Drinks
        </button>
      </Styles.ButtonsContainer>
      <Styles.DoneRecipesContainer>
        { filteredByTypeRecipes
          && filteredByTypeRecipes.map((recipe, index) => (
            <Styles.DoneRecipeCard key={ Math.random() }>

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
            </Styles.DoneRecipeCard>
          ))}
      </Styles.DoneRecipesContainer>

    </Styles.DoneRecipesPageContainer>
  );
}
