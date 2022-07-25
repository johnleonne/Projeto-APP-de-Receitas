import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import DrinksService from '../../services/DrinksService';
import StartRecipeButton from '../../components/StartRecipeButton';
import RecipeDetailsInteractions from '../../components/RecipeDetailsInteractions';
import RecipeCard from '../../components/RecipeCard';
import BackArrow from '../../components/BackArrow';
import * as Styles from './styles';

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
    <Styles.RecipeDetailsPageContainer
      initial={{ opacity: 0, width: 0 }}
      animate={{ opacity: 1, width: '100%' }}
      exit={{ opacity: 0, x: '100%', transition: { duration: 0.4 } }}
    >
      <Styles.RecipeDetailsContainer>
        <BackArrow />

        <Styles.RecipeImageHeader
          imgUrl={ drinkDetail[0]?.strDrinkThumb }
        />

        <h1 data-testid="recipe-title">{ drinkDetail[0]?.strDrink }</h1>

        <p data-testid="recipe-category" className="alcoholic">
          { `Alcoholic: ${drinkDetail[0]?.strAlcoholic ?? ''}` }
        </p>

        <RecipeDetailsInteractions
          recipe={ drinkDetail[0] ?? {} }
          recipeType={ pathname.split('/').filter(Boolean)[0] }
        />

        <Styles.RecipeIngredientsContainer>
          <Styles.SeparationLine />
          <h3 className="ingredients-title">
            Ingredients
          </h3>
          { drinkDetail[0]
          && Object.entries(generateMeasuresObject(drinkDetail[0]))
            .map((ingredientAndMeasure, index) => (
              <p
                key={ Math.random() }
                data-testid={ `${index}-ingredient-name-and-measure` }
                className="ingredient-and-measure"
              >
                { `${ingredientAndMeasure[1]} ${ingredientAndMeasure[0]}` }
              </p>
            ))}
          <Styles.SeparationLine />
        </Styles.RecipeIngredientsContainer>

        <Styles.InstructionsContainer>
          <h3 className="instructions-title">Instructions</h3>

          <p data-testid="instructions" className="instructions">
            {drinkDetail[0]?.strInstructions}
          </p>
        </Styles.InstructionsContainer>

        <Styles.SeparationLine />

        <Styles.RecommendationsContainer>
          <h3 className="recommendations-title">
            Recommended Meals
          </h3>
          <div className="recommendations-scroll">
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
        </Styles.RecommendationsContainer>

        <StartRecipeButton
          recipe={ drinkDetail[0] ?? {} }
          recipeType={ pathname.split('/').filter(Boolean)[0] }
        />

      </Styles.RecipeDetailsContainer>
    </Styles.RecipeDetailsPageContainer>
  );
}
