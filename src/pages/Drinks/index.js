import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FoodsContext } from '../../context/FoodContext';
import DrinksService from '../../services/DrinksService';
import Header from '../../components/Header';
import Footer from '../../components/Footer/Footer';
import Recipes from '../../components/Recipes/Recipes';
import RecipeCard from '../../components/RecipeCard';
import CategoryButton from '../../components/CategoryButton';
import {
  FilterButtonsContainer,
  DrinksPageContainer,
  DrinksCardsContainer,
} from './styles';

export default function Drinks() {
  const [drinksCategories, setDrinksCategories] = useState(['All']);
  const { recipes, saveRecipes, category, saveCategory } = useContext(FoodsContext);
  const history = useHistory();

  useEffect(() => {
    const halfSecond = 500;
    if (recipes && recipes.length === 1) {
      const drinkId = recipes[0].idDrink;
      setTimeout(() => {
        history.push(`/drinks/${drinkId}`);
      }, halfSecond);
    }

    if (!recipes) {
      global.alert(`${''}Sorry, we haven't found any recipes for these filters.`);
      saveRecipes([]);
    }
  }, [recipes]);

  useEffect(() => {
    DrinksService.requestFirst12().then((data) => saveRecipes(data));
    DrinksService.requestFirst5Categories().then((data) => {
      setDrinksCategories((prevState) => [...prevState, ...data]);
    });

    return () => {
      saveCategory('All');
    };
  }, []);

  useEffect(() => {
    if (category === 'All') {
      DrinksService.requestFirst12().then((data) => saveRecipes(data));
      return;
    }

    DrinksService.requestByCategory(category).then((data) => saveRecipes(data));
  }, [category]);

  function filterDrinks(array) {
    const maxRecipesArrayLenght = 12;
    if (array.length > maxRecipesArrayLenght) {
      return array.slice(0, maxRecipesArrayLenght);
    }

    return array;
  }

  return (
    <DrinksPageContainer>
      <Header title="Drinks" haveSearch />
      <DrinksCardsContainer>
        <FilterButtonsContainer>
          { drinksCategories.map((categoryName) => (
            <CategoryButton key={ categoryName } name={ categoryName } />
          ))}
        </FilterButtonsContainer>
        <Recipes>
          {!!recipes && filterDrinks(recipes).map((recipe, index) => (
            <RecipeCard
              key={ Math.random() }
              recipe={ recipe }
              index={ index }
            />
          ))}
        </Recipes>
      </DrinksCardsContainer>
      <Footer />
    </DrinksPageContainer>
  );
}
