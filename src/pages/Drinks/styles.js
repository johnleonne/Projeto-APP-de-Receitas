import styled from 'styled-components';
import { motion } from 'framer-motion';

export const DrinksPageContainer = styled(motion.main)`
  margin-top: 6rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const DrinksCardsContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const FilterButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
`;
