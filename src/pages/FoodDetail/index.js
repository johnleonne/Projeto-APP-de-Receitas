import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import FoodsService from '../../services/FoodsService';
import RecipeCard from '../../components/RecipeCard';
import StartRecipeButton from '../../components/StartRecipeButton';
import RecipeDetailsInteractions from '../../components/RecipeDetailsInteractions';
import BackArrow from '../../components/BackArrow';
import * as Styles from './styles';

export default function FoodDetail() {
  const [recipeDetail, setRecipeDetail] = useState([]);
  const [recommendedDrinks, setRecommendedDrinks] = useState([]);
  const { id } = useParams();
  const { pathname } = useLocation();

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

  function generateEmbedYoutubeLink(youtubeLink) {
    if (!youtubeLink) return;
    const baseEmbedURL = 'https://www.youtube.com/embed/';
    const videoId = youtubeLink.split('v=')[1];
    return `${baseEmbedURL}${videoId}`;
  }

  useEffect(() => {
    async function requestRecipeDetail() {
      const recipe = await FoodsService.requestByFoodId(id);
      setRecipeDetail(recipe);
    }

    async function requestRecommendedDrinks() {
      const recommendation = await FoodsService.requestRecommendedDrinks();
      setRecommendedDrinks(recommendation);
    }

    requestRecipeDetail();
    requestRecommendedDrinks();
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
          imgUrl={ recipeDetail[0]?.strMealThumb }
        />

        <h1 data-testid="recipe-title">{ recipeDetail[0]?.strMeal }</h1>

        <p data-testid="recipe-category" className="category">
          { `Category: ${recipeDetail[0]?.strCategory ?? ''}` }
        </p>

        <RecipeDetailsInteractions
          recipe={ recipeDetail[0] ?? {} }
          recipeType={ pathname.split('/').filter(Boolean)[0] }
        />

        <Styles.RecipeIngredientsContainer>
          <Styles.SeparationLine />
          <h3 className="ingredients-title">
            Ingredients
          </h3>
          { recipeDetail[0]
          && Object.entries(generateMeasuresObject(recipeDetail[0]))
            .map((ingredientAndMeasure, index) => (
              <p
                key={ Math.random() }
                data-testid={ `${index}-ingredient-name-and-measure` }
                className="ingredient-and-measure"
              >
                { `${ingredientAndMeasure[1]} - ${ingredientAndMeasure[0]}` }
              </p>
            ))}
          <Styles.SeparationLine />
        </Styles.RecipeIngredientsContainer>

        <Styles.InstructionsContainer>
          <h3 className="instructions-title">Instructions</h3>

          <p data-testid="instructions" className="instructions">
            {recipeDetail[0]?.strInstructions}
          </p>

          <iframe
            data-testid="video"
            src={ generateEmbedYoutubeLink(recipeDetail[0]?.strYoutube) }
            width="300"
            height="auto"
            title={ `${recipeDetail[0]?.strMeal} preparation` }
          />
        </Styles.InstructionsContainer>

        <Styles.SeparationLine />

        <Styles.RecommendationsContainer>
          <h3 className="recommendations-title">
            Recommended Drinks
          </h3>
          <div className="recommendations-scroll">
            { recommendedDrinks.map((recipe, index) => (
              <RecipeCard
                recomendation
                key={ Math.random() }
                recipe={ recipe }
                index={ index }
                dataTestId={ `${index}-recomendation-card` }
              />
            ))}
          </div>
        </Styles.RecommendationsContainer>

        <StartRecipeButton
          recipe={ recipeDetail[0] ?? {} }
          recipeType={ pathname.split('/').filter(Boolean)[0] }
        />
      </Styles.RecipeDetailsContainer>
    </Styles.RecipeDetailsPageContainer>
  );
}
