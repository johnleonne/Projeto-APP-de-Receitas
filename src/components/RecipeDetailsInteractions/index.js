import React, { useState } from 'react';
import clipboardCopy from 'clipboard-copy';

export default function RecipeDetailsInteractions() {
  const [isLinkCopied, setIsLinkCopied] = useState(false);

  function handleShare() {
    setIsLinkCopied(true);
    clipboardCopy(window.location.href);
  }

  return (
    <div className="interaction-buttons">
      <button
        type="button"
        data-testid="share-btn"
        onClick={ handleShare }
      >
        Share
      </button>
      { isLinkCopied && <p>Link copied!</p>}
      <button
        type="button"
        data-testid="favorite-btn"
      >
        Favorite
      </button>
    </div>
  );
}
