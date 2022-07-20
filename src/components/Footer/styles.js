/* eslint-disable indent */
import styled from 'styled-components';

export const FooterContainer = styled.footer`
  align-items: center;
  background: white;
  bottom: 0;
  display: flex;
  justify-content: space-around;
  position: fixed;
  height: 3.5rem;
  width: 100%;
  background: ${({ theme }) => theme.colors.main.dark};

  p {
      font-size: 1rem;
      margin-left: 8px;
      /* color: ${({ theme }) => theme.colors.main.dark}; */
      color: #fff;
      font-weight: 600;
    }

  a {
    text-decoration: none;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50%;
    height: 100%;
    transition: all 0.4s ease-in-out;

    &.drinks {
      border-bottom: 5px solid ${({ theme, pathname }) => (
        pathname === '/drinks' ? '#fff' : theme.colors.main.dark
      )};
    }

    &.foods {
      border-bottom: 5px solid ${({ theme, pathname }) => (
        pathname === '/foods' ? '#fff' : theme.colors.main.dark
      )};
    }

    .reverse-icon {
      transform: rotateY(180deg);
    }
  }
`;

export const a = 1;
