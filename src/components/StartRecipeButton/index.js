import React from 'react';
import './StartRecipeButton.css';

export default function StartRecipeButton() {
  return (
    <button
      type="button"
      data-testid="start-recipe-btn"
      className="start-recipe-button"
    >
      Start Recipe
    </button>
  );
}
