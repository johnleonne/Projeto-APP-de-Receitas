/* eslint-disable indent */
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

export const StyledLink = styled(Link)`
    text-decoration: none;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50%;
    height: 100%;
    transition: all 0.4s ease-in-out;

    &.drinks {
      border-bottom: 3px solid ${({ theme, pathname }) => (
        pathname === '/drinks' ? '#fff' : theme.colors.main.dark
      )};
      ${({ pathname }) => pathname === '/drinks' && css`
        -webkit-box-shadow: inset 0px -2px 27px 1px rgba(255,255,255,0.42); 
        box-shadow: inset 0px -2px 27px 1px rgba(255,255,255,0.42);
      `}
    }

    &.foods {
      border-bottom: 3px solid ${({ theme, pathname }) => (
        pathname === '/foods' ? '#fff' : theme.colors.main.dark
      )};
      ${({ pathname }) => pathname === '/foods' && css`
        -webkit-box-shadow: inset 0px -2px 27px 1px rgba(255,255,255,0.42); 
        box-shadow: inset 0px -2px 27px 1px rgba(255,255,255,0.42);
      `}
    }

    .reverse-icon {
      transform: rotateY(180deg);
    } 
`;

export const FooterContainer = styled.footer`
  align-items: center;
  background: white;
  display: flex;
  justify-content: space-around;
  position: fixed;
  bottom: 0;
  height: 3.5rem;
  width: 100%;
  background: ${({ theme }) => theme.colors.main.dark};

  p {
      font-size: 1rem;
      margin-left: 8px;
      color: #fff;
      font-weight: 600;
    }
`;
