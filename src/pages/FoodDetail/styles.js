import styled from 'styled-components';

export const RecipeDetailsPageContainer = styled.main`
  width: 100vw;
  height: 100vh;
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

export const RecipeDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  h1 {
    font-weight: 600;
    font-size: 40px;
    color: ${({ theme }) => theme.colors.main.dark};
  }

  .category {
    font-size: 18px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.main.darkLighter};
    margin-bottom: 2rem;
  }

  img {
    width: 100%;
    height: auto;
  }
`;

export const RecipeIngredientsContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.5rem;
  justify-content: center;
  margin-bottom: 2rem;

  .ingredients-title {
    font-size: 2rem;
    text-align: center;
    width: 100%;
    margin-bottom: 0.5rem;
    color: ${({ theme }) => theme.colors.main.darker};
  }

  .ingredient-and-measure {
    margin-left: 2rem;
    font-size: 1rem;
    font-weight: 500;
  }
`;

export const InstructionsContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 85%;
  margin-bottom: 3rem;

  .instructions-title {
    font-size: 2rem;
    text-align: center;
    width: 100%;
    margin-bottom: 2rem;
    color: ${({ theme }) => theme.colors.main.darker};
  }
  
  .instructions {
    line-height: 32px;
    text-align: justify;
    margin-bottom: 3rem;
  }
`;

export const SeparationLine = styled.div`
  background: ${({ theme }) => theme.colors.main.light};
  width: 90%;
  margin: 0 auto;
  height: 3px;
`;

export const RecommendationsContainer = styled.section`
  margin-top: 3rem;
  max-width: 95%;

  .recommendations-title {
    font-size: 2rem;
    text-align: center;
    width: 100%;
    margin-bottom: 2rem;
    color: ${({ theme }) => theme.colors.main.darker};
  }

  .recommendations-scroll {
    display: flex;
    flex-direction: row;
    overflow-x: scroll;
    gap: 1rem;
  }
`;
