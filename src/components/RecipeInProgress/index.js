import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import RecipeDetailsInteractions from '../RecipeDetailsInteractions';
import createDoneRecipeObject from '../../utils/createDoneRecipeObject';
import * as Styles from './styles';

export default function RecipeInProgress({ recipe }) {
  const history = useHistory();
  const [checkedIngredients, setCheckedIngredients] = useState([]);

  useEffect(() => {
    const currProgress = JSON.parse(localStorage.getItem('inProgressRecipes'))
    || {
      cocktails: {},
      meals: {},
    };

    const isRecipeAlreadyInProgress = currProgress.cocktails[recipe.idDrink]
      || currProgress.meals[recipe.idMeal];

    if (isRecipeAlreadyInProgress) {
      setCheckedIngredients(isRecipeAlreadyInProgress);
    }
  }, []);

  function handleFinishRecipes() {
    const foodType = recipe.idDrink ? '/drinks' : '/foods';

    const newDoneRecipe = createDoneRecipeObject(recipe, foodType);

    const doneRecipesLocalStorage = JSON.parse(localStorage
      .getItem('doneRecipes')) || [];
    localStorage.setItem('doneRecipes', JSON
      .stringify([...doneRecipesLocalStorage, newDoneRecipe]));

    history.push('/done-recipes');
  }

  function getIngredientsKeys() {
    return Object.keys(recipe).filter((key) => key.includes('Ingredient'));
  }

  function getNotNullIngredientsKeys() {
    return Object.entries(recipe)
      .filter(([key]) => key.includes('Ingredient'))
      .filter(([, value]) => value);
  }

  function handleLabelCheck({ target }) {
    const currProgress = JSON.parse(localStorage.getItem('inProgressRecipes'))
    || {
      cocktails: {},
      meals: {},
    };

    if (recipe.idDrink && target.checked) {
      currProgress.cocktails[recipe.idDrink] = checkedIngredients;
      setCheckedIngredients((prevState) => [...prevState, target.value]);
    }

    if (recipe.idMeal && target.checked) {
      currProgress.meals[recipe.idMeal] = checkedIngredients;
      setCheckedIngredients((prevState) => [...prevState, target.value]);
    }

    if (recipe.idDrink && !target.checked) {
      const filteredIngredients = checkedIngredients
        .filter((ingredient) => ingredient !== target.value);

      currProgress.cocktails[recipe.idDrink] = filteredIngredients;
      setCheckedIngredients(filteredIngredients);
    }

    if (recipe.idMeal && !target.checked) {
      const filteredIngredients = checkedIngredients
        .filter((ingredient) => ingredient !== target.value);

      currProgress.meals[recipe.idMeal] = filteredIngredients;
      setCheckedIngredients(filteredIngredients);
    }

    localStorage
      .setItem('inProgressRecipes', JSON.stringify(currProgress));
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

      <h3 data-testid="recipe-category" className="recipe-category">
        { recipe.strCategory && `Category: ${recipe.strCategory}`}
        { recipe.strAlcoholic && `Alcoholic: ${recipe.strAlcoholic}` }
      </h3>

      <RecipeDetailsInteractions
        recipe={ recipe }
        recipeType={ recipe.strDrink ? 'drinks' : 'foods' }
      />

      <Styles.SeparationLine />

      <Styles.IngredientsCheckboxesContainer>
        <h3>Ingredients</h3>
        {getIngredientsKeys().map((ingredientKey, index) => {
          if (!recipe[ingredientKey]) return;
          return (
            <Styles.IngredientLabel
              isChecked={ checkedIngredients.includes(recipe[ingredientKey]) }
              key={ Math.random() }
              htmlFor={ ingredientKey }
              data-testid={ `${index}-ingredient-step` }
            >
              <input
                type="checkbox"
                id={ ingredientKey }
                onChange={ (e) => handleLabelCheck(e) }
                value={ recipe[ingredientKey] }
                defaultChecked={ checkedIngredients.includes(recipe[ingredientKey]) }
              />
              { recipe[ingredientKey] }
            </Styles.IngredientLabel>
          );
        })}
      </Styles.IngredientsCheckboxesContainer>

      <Styles.SeparationLine />

      <h2 className="instructions-title">Tutorial</h2>

      <p data-testid="instructions" className="instructions">
        { recipe.strInstructions }
      </p>

      <button
        type="button"
        className="finish-recipe-btn"
        onClick={ () => handleFinishRecipes() }
        data-testid="finish-recipe-btn"
        disabled={ getNotNullIngredientsKeys().length !== checkedIngredients.length }
      >
        Finish recipe
      </button>
    </Styles.RecipeInProgressContainer>
  );
}

RecipeInProgress.propTypes = {
  recipe: PropTypes.shape().isRequired,
};
