import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import FoodsService from '../../services/FoodsService';
import DrinksService from '../../services/DrinksService';
import { FoodsContext } from '../../context/FoodContext';
import { RadiosContainer, SearchBarContainer, SearchInputContainer } from './styles';

export default function SearchBar({ visible }) {
  const [selectedRadio, setSelectedRadio] = useState(null);
  const [filterTextValue, setFilterTextValue] = useState('');
  const { pathname } = useLocation();

  const { handleChangeFilter, currentFilter, saveRecipes } = useContext(FoodsContext);

  async function handleFoodsInputSearchClick() {
    const { type, searchParam } = currentFilter;

    if (type === 'ingredient') {
      const recipesByIngredient = await FoodsService.requestByIngredient(searchParam);
      saveRecipes(recipesByIngredient);
    }

    if (type === 'name') {
      const recipesByName = await FoodsService.requestByName(searchParam);
      saveRecipes(recipesByName);
    }

    if (type === 'firstLetter') {
      const recipesByFirstLetter = await FoodsService.requestByFirstLetter(searchParam);
      saveRecipes(recipesByFirstLetter);
    }
  }

  async function handleDrinksInputSearchClick() {
    const { type, searchParam } = currentFilter;

    if (type === 'ingredient') {
      const recipesByIngredient = await DrinksService.requestByIngredient(searchParam);
      saveRecipes(recipesByIngredient);
    }

    if (type === 'name') {
      const recipesByName = await DrinksService.requestByName(searchParam);
      saveRecipes(recipesByName);
    }

    if (type === 'firstLetter') {
      const recipesByFirstLetter = await DrinksService.requestByFirstLetter(searchParam);
      saveRecipes(recipesByFirstLetter);
    }
  }

  function handleRadioOptionSelect({ target }) {
    const { value } = target;
    setSelectedRadio(value);
  }

  function handleFilterTextChange({ target }) {
    const { value } = target;

    if (currentFilter.type === 'firstLetter' && value.length > 1) {
      global.alert('Your search must have only 1 (one) character');
      setFilterTextValue(filterTextValue.split('')[0]);
      return;
    }

    setFilterTextValue(value);
  }

  useEffect(() => {
    handleChangeFilter((prevState) => ({
      ...prevState,
      type: selectedRadio,
      searchParam: filterTextValue,
    }));
  }, [selectedRadio, filterTextValue]);

  return (
    <SearchBarContainer visible={ visible }>

      <SearchInputContainer>
        <input
          type="text"
          data-testid="search-input"
          value={ filterTextValue }
          onChange={ handleFilterTextChange }
        />
        <div className="search-input-icon-container">
          <FaSearch
            role="button"
            className="search-input-icon"
            size={ 20 }
            color="#fff"
            data-testid="exec-search-btn"
            onClick={
              pathname === '/foods'
                ? handleFoodsInputSearchClick
                : handleDrinksInputSearchClick
            }
            alt="search filter button"
          />
        </div>
      </SearchInputContainer>

      <RadiosContainer>

        <label htmlFor="ingredient">
          <input
            onChange={ handleRadioOptionSelect }
            type="radio"
            name="filter"
            id="ingredient"
            value="ingredient"
            data-testid="ingredient-search-radio"
          />
          Ingredient
        </label>

        <label htmlFor="name">
          <input
            onChange={ handleRadioOptionSelect }
            type="radio"
            name="filter"
            value="name"
            id="name"
            data-testid="name-search-radio"
          />
          Name
        </label>

        <label htmlFor="first-letter">
          <input
            onChange={ handleRadioOptionSelect }
            type="radio"
            name="filter"
            value="firstLetter"
            id="first-letter"
            data-testid="first-letter-search-radio"
          />
          First Letter
        </label>

      </RadiosContainer>
    </SearchBarContainer>
  );
}

SearchBar.propTypes = {
  visible: PropTypes.bool,
};

SearchBar.defaultProps = {
  visible: false,
};
