import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import RecipeCard from '../../components/RecipeCard';
import Header from '../../components/Header';
import { FoodsContext } from '../../context/FoodContext';
import Footer from '../../components/Footer/Footer';
import Recipes from '../../components/Recipes/Recipes';
import FoodsService from '../../services/FoodsService';

export default function Foods() {
  const { recipes, saveRecipes } = useContext(FoodsContext);
  const history = useHistory();

  useEffect(() => {
    if (recipes && recipes.length === 1) {
      const mealId = recipes[0].idMeal;
      history.push(`/foods/${mealId}`);
    }

    if (!recipes) {
      global.alert(`${''}Sorry, we haven't found any recipes for these filters.`);
      saveRecipes([]);
    }
  }, [recipes]);

  useEffect(() => {
    FoodsService.requestFirst12().then((data) => saveRecipes(data));
  }, []);

  function filterRecipes(array) {
    const maxRecipesArrayLenght = 12;
    if (array?.length > maxRecipesArrayLenght) {
      return array.slice(0, maxRecipesArrayLenght);
    }

    return array;
  }

  return (
    <main className="foods-page-container">
      <Header title="Foods" haveSearch />
      <h1>Foods page</h1>
      <div className="food-cards-container">
        <Recipes>
          {!!recipes && filterRecipes(recipes).map((recipe, index) => (
            <RecipeCard
              key={ recipe.strMeal }
              recipe={ recipe }
              index={ index }
            />
          ))}
        </Recipes>
      </div>
      <Footer />
    </main>
  );
}
