import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { GiMeal, GiWineBottle } from 'react-icons/gi';
import { FooterContainer } from './styles';

export default function Footer() {
  const { pathname } = useLocation();

  return (
    <FooterContainer data-testid="footer" pathname={ pathname }>
      <Link to="/foods" className="foods">
        <GiMeal
          role="button"
          color="#fff"
          size={ 40 }
          alt="redirect to meal page icon"
          data-testid="food-bottom-btn"
        />
        <p>Foods</p>
      </Link>
      <Link to="/drinks" className="drinks">
        <GiWineBottle
          className="reverse-icon"
          role="button"
          color="#fff"
          size={ 40 }
          alt="redirect to drink page icon"
          data-testid="drinks-bottom-btn"
        />
        <p>Drinks</p>
      </Link>
    </FooterContainer>
  );
}
