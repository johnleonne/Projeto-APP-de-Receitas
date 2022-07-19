import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import RecipeDetailsInteractions from '../RecipeDetailsInteractions';
import './RecipeInProgress.css';

export default function RecipeInProgress({ recipe }) {
  const history = useHistory();

  useEffect(() => {
    const currProgress = JSON.parse(localStorage.getItem('inProgressRecipes'))
    || {
      cocktails: {},
      meals: {},
    };

    const inputs = Array
      .from(document.querySelectorAll('input[type="checkbox"]'));

    inputs.forEach((input) => {
      if (
        currProgress.cocktails[recipe.idDrink]?.includes(input.parentNode.innerText)
        || currProgress.meals[recipe.idMeal]?.includes(input.parentNode.innerText)
      ) {
        input.checked = true;
        input.parentNode.className = 'checked';
      } else {
        input.checked = false;
      }
    });
  }, []);

  function getIngredientsKeys() {
    return Object.keys(recipe).filter((key) => key.includes('Ingredient'));
  }

  function getCheckedIngredientsArray() {
    const arrayChecked = Array
      .from(document.querySelectorAll('input[type="checkbox"]:checked'))
      .map(({ value }) => value);

    return arrayChecked;
  }

  function toggleLabelClass({ target }) {
    const label = target.parentNode;

    if (label.classList.contains('checked')) {
      label.classList.remove('checked');
    } else {
      label.classList.add('checked');
    }
  }

  function handleLabelCheck(e) {
    const currProgress = JSON.parse(localStorage.getItem('inProgressRecipes'))
    || {
      cocktails: {},
      meals: {},
    };

    const ingredientsArray = getCheckedIngredientsArray();

    if (recipe.idDrink) {
      currProgress.cocktails[recipe.idDrink] = Array.from(new Set(ingredientsArray));
    } else {
      currProgress.meals[recipe.idMeal] = Array.from(new Set(ingredientsArray));
    }

    localStorage
      .setItem('inProgressRecipes', JSON.stringify(currProgress));

    toggleLabelClass(e);
  }

  function areAllCheckboxChecked() {
    const notNullIngredientsLength = Object.entries(recipe)
      .filter(([key]) => key.includes('Ingredient'))
      .filter(([, value]) => value)
      .length;

    const checkedCheckboxesLength = Array
      .from(document.querySelectorAll('input[type="checkbox"]:checked')).length;

    return notNullIngredientsLength === checkedCheckboxesLength;
  }

  function handleFinishRecipe() {
    history.push('/done-recipes');
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
            htmlFor={ ingredientKey }
            data-testid={ `${index}-ingredient-step` }
            className={
              getCheckedIngredientsArray()
                .includes(recipe[ingredientKey]) ? 'checked' : ''
            }
          >
            <input
              type="checkbox"
              id={ ingredientKey }
              onChange={ (e) => handleLabelCheck(e) }
              value={ recipe[ingredientKey] }
              checked={
                getCheckedIngredientsArray()
                  .includes(recipe[ingredientKey])
              }
            />
            { recipe[ingredientKey] }
          </label>
        );
      })}
      <p data-testid="instructions">{ recipe.strInstructions }</p>
      <button
        type="button"
        data-testid="finish-recipe-btn"
        disabled={ !areAllCheckboxChecked() }
        onClick={ handleFinishRecipe }
      >
        Finish recipe
      </button>
    </div>
  );
}

RecipeInProgress.propTypes = {
  recipe: PropTypes.shape().isRequired,
};
