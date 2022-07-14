import React, { useContext, useEffect, useState } from 'react';
import searchIcon from '../../images/searchIcon.svg';
import FoodsService from '../../services/FoodsService';
import { FoodsContext } from '../../context/FoodContext';
import './SearchBar.css';

export default function SearchBar() {
  const [selectedRadio, setSelectedRadio] = useState(null);
  const [filterTextValue, setFilterTextValue] = useState('');

  const { handleChangeFilter, currentFilter, saveRecipes } = useContext(FoodsContext);

  async function handleInputSearchClick() {
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
    <div className="search-bar-container">

      <div className="search-input-container">

        <input
          type="text"
          data-testid="search-input"
          value={ filterTextValue }
          onChange={ handleFilterTextChange }
        />

        <button
          type="button"
          data-testid="exec-search-btn"
          onClick={ handleInputSearchClick }
        >
          <img src={ searchIcon } alt="search filter button" />
        </button>

      </div>

      <div className="search-radios-container">

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

      </div>
    </div>
  );
}
