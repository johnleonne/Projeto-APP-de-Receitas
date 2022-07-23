/* eslint-disable no-magic-numbers */
import styled from 'styled-components';

export const RecipeInProgressContainer = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h1 {
    font-size: 3rem;
    color: ${({ theme }) => theme.colors.main.dark};
  }

  .recipe-category {
    color: ${({ theme }) => theme.colors.main.darkLighter};
  }

  h3 {
    font-size: 1rem;
    color: ${({ theme }) => theme.colors.main.darker};
    margin-bottom: 2rem;
  }

  .instructions-title {
    font-size: 1.5rem;
    text-align: center;
    width: 100%;
    margin: 2rem 0;
    color: ${({ theme }) => theme.colors.main.darker};
  }
  
  .instructions {
    line-height: 32px;
    text-align: justify;
    margin-bottom: 2rem;
    width: 85%;
  }

  .finish-recipe-btn {
    width: 12.5rem;
    height: 4rem;
    margin: 3rem 0;
    font-size: 1.5rem;
    font-weight: 600;
    border-style: none;
    border-radius: 10px;
    background: ${({ theme }) => theme.colors.main.darker};
    color: #fff;
    transition: all 0.3s ease-in-out;
    cursor: pointer;

    &:hover:enabled {
      background: ${({ theme }) => theme.colors.main.darkLighter};
      transform: translateY(-3px);
    }

    &:disabled {
      background: rgba(0, 0, 0, 0.6);
      opacity: 0.6;
      cursor: not-allowed;
    }
  }
`;

export const RecipeImageHeader = styled.header`
  background-image: ${({ imgUrl }) => `url(${imgUrl})`};
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 250px;
  border-bottom: 4px solid ${({ theme }) => theme.colors.main.dark};
  margin-bottom: 1rem;
  border-radius: 0 0 20% 20%;
`;

export const SeparationLine = styled.div`
  background: ${({ theme }) => theme.colors.main.light};
  width: 90%;
  margin: 0 auto;
  height: 3px;
`;

export const IngredientsCheckboxesContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  margin: 2rem 0;

  h3 {
    font-size: 24px;
    text-align: center;
    align-self: center;
  }
`;

export const IngredientLabel = styled.label`
  display: flex;
  align-items: center;
  font-size: 1.2rem;
  margin-left: 3rem;
  opacity: ${({ isChecked }) => (isChecked ? 0.4 : 1)};
  transition: all 0.3s ease-in-out;
  cursor: pointer;

  & + & {
    margin-top: 0.8rem;
  }

  input {
    margin-right: 8px;
    appearance: none;
    width: 16px;
    height: 16px;
    background-color: #fff;
    border: 1px solid #000;
    border-radius: 5px;
    cursor: pointer;

    &:checked {
      border-style: none;
      background-color: ${({ theme }) => theme.colors.main.darker};
    }
  }
`;
