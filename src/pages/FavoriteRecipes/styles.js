import styled, { css } from 'styled-components'
import { motion } from 'framer-motion';

export const FavoriteRecipesPageContainer = styled(motion.applymain)`
  margin-top: 6rem;
`;

export const ButtonsContainer = styled.main`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;

  button {
    width: 6rem;
    height: 2rem;
    border-style: none;
    border-radius: 5px;
    background: ${({ theme }) => theme.colors.main.dark};
    font-weight: 600;
    color: #fff;
    transition: all 0.2s ease-in-out;

    &.all {
      ${({ theme, currFilter }) => currFilter === 'all' && css`
        background: ${theme.colors.main.main};
        color: ${theme.colors.pinks.dark};
      `}
    }

    &.food {
      ${({ theme, currFilter }) => currFilter === 'food' && css`
        background: ${theme.colors.main.main};
        color: ${theme.colors.pinks.dark};
      `}
    }

    &.drink {
      ${({ theme, currFilter }) => currFilter === 'drink' && css`
        background: ${theme.colors.main.main};
        color: ${theme.colors.pinks.dark};
      `}
    }
  }
`;

export const FavoriteRecipesContainer = styled.main`
  margin: 4rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
`;

export const FavoriteRecipeCard = styled.div`
  position: relative;
  display: flex;
  border-radius: 10%;
  padding: 10px;
  background: #fff;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 2px solid ${({ theme }) => theme.colors.main.light};
  z-index: 1;
  gap: 1rem;
  width: 15rem;
  box-shadow: 4px 6px 12px -4px rgba(168,168,168,0.43);
  -webkit-box-shadow: 4px 6px 12px -4px rgba(168,168,168,0.43);
  -moz-box-shadow: 4px 6px 12px -4px rgba(168,168,168,0.43);

  a {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;
    text-decoration: none;
  }

  h2 {
    color: ${({ theme }) => theme.colors.main.dark};
  }

  img {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    align-self: flex-start;
    margin-bottom: 1rem;
  }

  .favorite-heart {
    position: absolute;
    bottom: 0.5rem;
    right: 0.5rem;
  }
`;
