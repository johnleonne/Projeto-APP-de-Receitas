import React from 'react';

export default function RecipeDetailsInteractions() {
  return (
    <div className="interaction-buttons">
      <button
        type="button"
        data-testid="share-btn"
      >
        Share
      </button>
      <button
        type="button"
        data-testid="favorite-btn"
      >
        Favorite
      </button>
    </div>
  );
}
