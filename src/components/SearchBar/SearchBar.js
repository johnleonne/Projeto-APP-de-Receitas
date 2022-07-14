import React from 'react';
import searchIcon from '../../images/searchIcon.svg';
import './SearchBar.css';

export default function SearchBar() {
  return (
    <div className="search-bar-container">
      <div className="search-input-container">
        <input type="text" data-testid="search-input" />
        <button type="button" data-testid="exec-search-btn">
          <img src={ searchIcon } alt="search filter button" />
        </button>
      </div>
      <div className="search-radios-container">
        <label htmlFor="ingredient">
          <input
            type="radio"
            name="filter"
            id="ingredient"
            data-testid="ingredient-search-radio"
          />
          Ingredient
        </label>
        <label htmlFor="name">
          <input
            type="radio"
            name="filter"
            id="name"
            data-testid="name-search-radio"
          />
          Name
        </label>
        <label htmlFor="first-letter">
          <input
            type="radio"
            name="filter"
            id="first-letter"
            data-testid="first-letter-search-radio"
          />
          First Letter
        </label>
      </div>
    </div>
  );
}
