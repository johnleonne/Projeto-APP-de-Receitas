import React, { useContext, useEffect, useState } from 'react';
import { FoodsContext } from '../../context/FoodContext';
import FoodsService from '../../services/FoodsService';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Recipes from '../../components/Recipes';
import RecipeCard from '../../components/RecipeCard';
import CategoryButton from '../../components/CategoryButton';
import { FoodsPageContainer, FoodCardsContainer, FilterButtonsContainer } from './styles';

export default function Foods() {
  const [foodCategories, setFoodCategories] = useState(['All']);
  const { recipes, saveRecipes, category, saveCategory } = useContext(FoodsContext);

  useEffect(() => {
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
    <FoodsPageContainer>
      <Header title="Foods" haveSearch />
      <FoodCardsContainer>
        <FilterButtonsContainer>
          { foodCategories.map((categoryName) => (
            <CategoryButton key={ categoryName } name={ categoryName } />
          ))}
        </FilterButtonsContainer>
        <Recipes>
          {!!recipes && filterRecipes(recipes).map((recipe, index) => (
            <RecipeCard
              key={ Math.random() }
              recipe={ recipe }
              index={ index }
            />
          ))}
        </Recipes>
      </FoodCardsContainer>
      <Footer />
    </FoodsPageContainer>
  );
}
