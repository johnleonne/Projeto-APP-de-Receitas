import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import RecipeDetailsInteractions from '../RecipeDetailsInteractions';
import createDoneRecipeObject from '../../utils/createDoneRecipeObject';
import * as Styles from './styles';

export default function RecipeInProgress({ recipe }) {
  const history = useHistory();

  function getCheckedIngredientsArray() {
    const arrayChecked = Array
      .from(document.querySelectorAll('input[type="checkbox"]:checked'))
      .map(({ value }) => value);

    return arrayChecked;
  }

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

    const ingredientsArray = getCheckedIngredientsArray();

    const finishButton = document.querySelector('#finish-recipe-btn');

    function handleFinishRecipes() {
      const foodType = recipe.idDrink ? 'drinks' : '/foods';
      const newDoneRecipe = createDoneRecipeObject(recipe, foodType);
      const doneRecipesLocalStorage = JSON.parse(localStorage
        .getItem('doneRecipes')) || [];
      localStorage.setItem('doneRecipes', JSON
        .stringify([...doneRecipesLocalStorage, newDoneRecipe]));
      history.push('/done-recipes');
    }

    finishButton.addEventListener('click', handleFinishRecipes);

    if (ingredientsArray.length === Array.from(inputs).length) {
      finishButton.disabled = false;
    } else {
      finishButton.disabled = true;
    }
  }, []);

  function getIngredientsKeys() {
    return Object.keys(recipe).filter((key) => key.includes('Ingredient'));
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
    const allCheckboxInputs = document.querySelectorAll('input[type="checkbox"]');

    const finishButton = document.querySelector('#finish-recipe-btn');

    if (ingredientsArray.length === Array.from(allCheckboxInputs).length) {
      finishButton.disabled = false;
    } else {
      finishButton.disabled = true;
    }

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

  return (
    <Styles.RecipeInProgressContainer>
      <Styles.RecipeImageHeader
        imgUrl={ recipe.strDrinkThumb || recipe.strMealThumb }
        data-testid="recipe-photo"
      />

      <h1 data-testid="recipe-title">
        { recipe.strDrink || recipe.strMeal }
      </h1>

      <h3 data-testid="recipe-category">
        { recipe.strAlcoholic || recipe.strCategory }
      </h3>

      <RecipeDetailsInteractions
        recipe={ recipe }
        recipeType={ recipe.strDrink ? 'drinks' : 'foods' }
      />
      {getIngredientsKeys().map((ingredientKey, index) => {
        if (!recipe[ingredientKey]) return;
        return (
          <Styles.IngredientLabel
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
              defaultChecked={
                getCheckedIngredientsArray()
                  .includes(recipe[ingredientKey])
              }
            />
            { recipe[ingredientKey] }
          </Styles.IngredientLabel>
        );
      })}
      <p data-testid="instructions">{ recipe.strInstructions }</p>
      <button
        type="button"
        id="finish-recipe-btn"
        data-testid="finish-recipe-btn"
        disabled={ !areAllCheckboxChecked() }
      >
        Finish recipe
      </button>
    </Styles.RecipeInProgressContainer>
  );
}

RecipeInProgress.propTypes = {
  recipe: PropTypes.shape().isRequired,
};
