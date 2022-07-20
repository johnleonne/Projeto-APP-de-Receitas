import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import FoodsService from '../../services/FoodsService';
import RecipeCard from '../../components/RecipeCard';
import StartRecipeButton from '../../components/StartRecipeButton';
import RecipeDetailsInteractions from '../../components/RecipeDetailsInteractions';
import './FoodDetail.css';

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
    <main className="food-detail-page-container">
      <div className="food-detail-container">

        <h3 data-testid="recipe-title">{ recipeDetail[0]?.strMeal }</h3>

        <p data-testid="recipe-category">{ recipeDetail[0]?.strCategory }</p>

        <img
          data-testid="recipe-photo"
          src={ recipeDetail[0]?.strMealThumb }
          alt={ recipeDetail[0]?.strMeal }
        />

        <RecipeDetailsInteractions
          recipe={ recipeDetail[0] ?? {} }
          recipeType={ pathname.split('/').filter(Boolean)[0] }
        />

        <div className="ingredients-container">
          { recipeDetail[0]
          && Object.entries(generateMeasuresObject(recipeDetail[0]))
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
          <p data-testid="instructions">{recipeDetail[0]?.strInstructions}</p>
        </div>

        <iframe
          data-testid="video"
          src={ generateEmbedYoutubeLink(recipeDetail[0]?.strYoutube) }
          width="300"
          height="auto"
          title={ `${recipeDetail[0]?.strMeal} preparation` }
        />

        <section className="recommendations-container">
          { recommendedDrinks.map((recipe, index) => (
            <RecipeCard
              recomendation
              key={ Math.random() }
              recipe={ recipe }
              index={ index }
              dataTestId={ `${index}-recomendation-card` }
            />
          ))}
        </section>
        <StartRecipeButton
          recipe={ recipeDetail[0] ?? {} }
          recipeType={ pathname.split('/').filter(Boolean)[0] }
        />
      </div>
    </main>
  );
}
