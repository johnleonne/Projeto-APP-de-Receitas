import React from 'react';
import { useHistory } from 'react-router-dom';
import drinkIcon from '../../images/drinkIcon.svg';
import mealIcon from '../../images/mealIcon.svg';
import './Footer.css';

export default function Footer() {
  const history = useHistory();

  function handleRedirectToFoods() {
    history.push('/foods');
  }

  function handleRedirectToDrinks() {
    history.push('/drinks');
  }

  return (
    <footer data-testid="footer">
      <button type="button" onClick={ handleRedirectToFoods }>
        <img
          src={ mealIcon }
          alt="redirect to meal page icon"
          data-testid="food-bottom-btn"
        />
      </button>
      <button type="button" onClick={ handleRedirectToDrinks }>
        <img
          src={ drinkIcon }
          alt="redirect to drink page icon"
          data-testid="drinks-bottom-btn"
        />
      </button>
    </footer>
  );
}
