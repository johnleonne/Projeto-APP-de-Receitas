import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import shareIcon from '../../images/shareIcon.svg';
import Header from '../../components/Header';
import './DoneRecipes.css';

export default function DoneRecipes() {
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [sharedRecipes, setSharedRecipes] = useState([]);
  const [currFilter, setCurrFilter] = useState('all');

  useEffect(() => {
    const doneRecipesLocalStorage = JSON.parse(localStorage.getItem('doneRecipes'));

    setDoneRecipes(doneRecipesLocalStorage);
  }, []);

  const handleButtonClick = useCallback((event) => {
    const { target } = event;
    setCurrFilter(target.value);
  }, []);

  const filteredByTypeRecipes = useMemo(() => {
    if (currFilter === 'all') return doneRecipes;

    return doneRecipes.filter(({ type }) => type === currFilter);
  }, [currFilter, doneRecipes]);

  const handleShareButtonClick = useCallback((recipe) => {
    if (recipe.type === 'food') {
      clipboardCopy(`http://localhost:3000/foods/${recipe.id}`);
    } else {
      clipboardCopy(`http://localhost:3000/drinks/${recipe.id}`);
    }

    setSharedRecipes((prevState) => [...prevState, recipe.id]);
  }, []);

  return (
    <main className="done-recipes-page-container">
      <Header title="Done Recipes" />
      <h1>Done recipes page</h1>
      <div className="buttons-container">
        <button
          type="button"
          value="all"
          data-testid="filter-by-all-btn"
          onClick={ (e) => handleButtonClick(e) }
        >
          All
        </button>
        <button
          type="button"
          value="food"
          data-testid="filter-by-food-btn"
          onClick={ (e) => handleButtonClick(e) }
        >
          Foods
        </button>
        <button
          type="button"
          value="drink"
          data-testid="filter-by-drink-btn"
          onClick={ (e) => handleButtonClick(e) }
        >
          Drinks
        </button>
      </div>
      { filteredByTypeRecipes
        && filteredByTypeRecipes.map((recipe, index) => (
          <div key={ Math.random() } className="done-recipe-container">
            <Link
              to={ recipe.type === 'food' ? `foods/${recipe.id}` : `drinks/${recipe.id}` }
            >
              <img
                src={ recipe.image }
                alt={ recipe.name }
                data-testid={ `${index}-horizontal-image` }
              />
              <h1 data-testid={ `${index}-horizontal-name` }>
                { recipe.name }
              </h1>
            </Link>
            <h3 data-testid={ `${index}-horizontal-top-text` }>
              { recipe.type === 'food'
                ? `${recipe.nationality} - ${recipe.category}`
                : recipe.alcoholicOrNot }
            </h3>
            { recipe.type === 'food'
            && (
              <p>
                {`${recipe.nationality} - ${recipe.category}`}
              </p>
            )}
            <p data-testid={ `${index}-horizontal-done-date` }>{ recipe.doneDate }</p>
            { recipe.tags.length > 2
              ? recipe.tags.slice(0, 2).map((tag) => (
                <p
                  key={ Math.random() }
                  data-testid={ `${index}-${tag}-horizontal-tag` }
                >
                  {tag}
                </p>
              ))
              : recipe.tags.map((tag) => (
                <p
                  key={ Math.random() }
                  data-testid={ `${index}-${tag}-horizontal-tag` }
                  id="a"
                >
                  {tag}
                </p>
              ))}
            { sharedRecipes.includes(recipe.id) && <p>Link copied!</p> }
            <button
              type="button"
              onClick={ () => handleShareButtonClick(recipe) }
            >
              <img
                data-testid={ `${index}-horizontal-share-btn` }
                src={ shareIcon }
                alt="share"
              />
            </button>
          </div>
        ))}
    </main>
  );
}
