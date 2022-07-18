import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FoodsContext } from '../../context/FoodContext';
import FoodsService from '../../services/FoodsService';
import Header from '../../components/Header';
import Footer from '../../components/Footer/Footer';
import Recipes from '../../components/Recipes/Recipes';
import RecipeCard from '../../components/RecipeCard';
import CategoryButton from '../../components/CategoryButton';

export default function Foods() {
  const [foodCategories, setFoodCategories] = useState(['All']);
  const { recipes, saveRecipes, category, saveCategory } = useContext(FoodsContext);
  const history = useHistory();

  useEffect(() => {
    const halfSecond = 500;
    if (recipes && recipes.length === 1) {
      const mealId = recipes[0].idMeal;
      setTimeout(() => {
        history.push(`/foods/${mealId}`);
      }, halfSecond);
    }

    if (!recipes) {
      global.alert(`${''}Sorry, we haven't found any recipes for these filters.`);
      saveRecipes([]);
    }
  }, [recipes]);

  useEffect(() => {
    FoodsService.requestFirst12().then((data) => saveRecipes(data));
    FoodsService.requestFirst5Categories().then((data) => {
      setFoodCategories((prevState) => [...prevState, ...data]);
    });

    return () => {
      saveCategory('All');
    };
  }, []);

  useEffect(() => {
    if (category === 'All') {
      FoodsService.requestFirst12().then((data) => saveRecipes(data));
      return;
    }

    FoodsService.requestByCategory(category).then((data) => saveRecipes(data));
  }, [category]);

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
        <div className="filter-buttons-container">
          { foodCategories.map((categoryName) => (
            <CategoryButton key={ categoryName } name={ categoryName } />
          ))}
        </div>
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
