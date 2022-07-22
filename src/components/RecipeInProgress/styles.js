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

  h3 {
    font-size: 1rem;
    color: ${({ theme }) => theme.colors.main.darkLighter};
    margin-bottom: 2rem;
  }
`;

export const IngredientLabel = styled.label`

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
