import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { FoodsContext } from '../../context/FoodContext';
import DrinksService from '../../services/DrinksService';
import Header from '../../components/Header';
import Footer from '../../components/Footer/Footer';
import Recipes from '../../components/Recipes/Recipes';
import RecipeCard from '../../components/RecipeCard';

export default function Drinks() {
  const { recipes, saveRecipes } = useContext(FoodsContext);
  const history = useHistory();

  useEffect(() => {
    if (recipes && recipes.length === 1) {
      const drinkId = recipes[0].idDrink;
      history.push(`/drinks/${drinkId}`);
    }

    if (!recipes) {
      global.alert(`${''}Sorry, we haven't found any recipes for these filters.`);
      saveRecipes([]);
    }
  }, [recipes]);

  useEffect(() => {
    DrinksService.requestFirst12().then((data) => saveRecipes(data));
  }, []);

  function filterDrinks(array) {
    if (!array) return;

    const maxRecipesArrayLenght = 12;
    if (array.length > maxRecipesArrayLenght) {
      return array.slice(0, maxRecipesArrayLenght);
    }

    return array;
  }

  return (
    <main className="drinks-page-container">
      <Header title="Drinks" haveSearch />
      <h1>Drinks page</h1>
      <Recipes>
        {!!recipes && filterDrinks(recipes).map((recipe, index) => (
          <RecipeCard
            key={ recipe.strDrink }
            recipe={ recipe }
            index={ index }
          />
        ))}
      </Recipes>
      <Footer />
    </main>
  );
}
