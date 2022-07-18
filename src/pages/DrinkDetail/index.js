import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import DrinksService from '../../services/DrinksService';
import StartRecipeButton from '../../components/StartRecipeButton';
import RecipeCard from '../../components/RecipeCard';
import './DrinkDetail.css';

export default function DrinkDetail() {
  const [drinkDetail, setDrinkDetail] = useState([]);
  const [recommendedMeals, setRecommendedMeals] = useState([]);
  const { pathname } = useLocation();
  const { id } = useParams();

  function filterIngredients(recipe) {
    return Object.keys(recipe)
      .filter((key) => (key.includes('strIngredient')))
      .map((key) => recipe[key])
      .filter(Boolean);
  }

  function filterMeasures(recipe) {
    return Object.keys(recipe)
      .filter((key) => (key.includes('strMeasure')))
      .map((key) => recipe[key])
      .filter(Boolean);
  }

  function generateMeasuresObject(recipe) {
    const measures = filterMeasures(recipe);
    const ingredients = filterIngredients(recipe);

    const measuresObject = {};

    ingredients.forEach((ingredient, index) => {
      measuresObject[ingredient] = measures[index] ?? '';
    });

    return measuresObject;
  }

  useEffect(() => {
    async function requestRecipeDetail() {
      const drink = await DrinksService.requestByDrinkId(id);
      setDrinkDetail(drink);
    }

    async function requestRecommendedMeals() {
      const recommendation = await DrinksService.requestRecommendedFoods();
      setRecommendedMeals(recommendation);
    }

    requestRecipeDetail();
    requestRecommendedMeals();
  }, []);

  return (
    <main className="drink-detail-page-container">
      <h1>Drink detail page</h1>
      <div className="drink-detail-container">

        <h3 data-testid="recipe-title">{ drinkDetail[0]?.strDrink }</h3>

        <p data-testid="recipe-category">{drinkDetail[0]?.strCategory }</p>

        <img
          data-testid="recipe-photo"
          src={ drinkDetail[0]?.strDrinkThumb }
          alt={ drinkDetail[0]?.strDrink }
        />

        <div className="ingredients-container">
          { drinkDetail[0]
          && Object.entries(generateMeasuresObject(drinkDetail[0]))
            .map((ingredientAndMeasure, index) => (
              <p
                key={ Math.random() }
                data-testid={ `${index}-ingredient-name-and-measure` }
              >
                { `${ingredientAndMeasure[1]} ${ingredientAndMeasure[0]}` }
              </p>
            ))}
        </div>

        <div className="instructions-container">
          <p data-testid="instructions">{drinkDetail[0]?.strInstructions}</p>
        </div>

        <div className="recommendations-container">
          { recommendedMeals.map((recipe, index) => (
            <RecipeCard
              recomendation
              key={ Math.random() }
              dataTestId={ `${index}-recomendation-card` }
              recipe={ recipe }
              index={ index }
            />
          ))}
        </div>
        <StartRecipeButton
          recipe={ drinkDetail[0] ?? {} }
          recipeType={ pathname.split('/').filter(Boolean)[0] }
        />
      </div>
    </main>
  );
}
