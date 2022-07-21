import React from 'react';
import { useLocation } from 'react-router-dom';
import { GiMeal, GiWineBottle } from 'react-icons/gi';
import { FooterContainer, StyledLink } from './styles';

export default function Footer() {
  const { pathname } = useLocation();

  return (
    <FooterContainer data-testid="footer" pathname={ pathname }>
      <StyledLink to="/foods" className="foods" pathname={ pathname }>
        <GiMeal
          role="button"
          color="#fff"
          size={ 40 }
          alt="redirect to meal page icon"
          data-testid="food-bottom-btn"
        />
        <p>Foods</p>
      </StyledLink>
      <StyledLink to="/drinks" className="drinks" pathname={ pathname }>
        <GiWineBottle
          className="reverse-icon"
          role="button"
          color="#fff"
          size={ 40 }
          alt="redirect to drink page icon"
          data-testid="drinks-bottom-btn"
        />
        <p>Drinks</p>
      </StyledLink>
    </FooterContainer>
  );
}
