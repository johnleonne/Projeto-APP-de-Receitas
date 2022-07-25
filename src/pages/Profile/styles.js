import styled from 'styled-components';
import { motion } from 'framer-motion';

export const ProfilePageContainer = styled(motion.main)`
  width: 100%;
  height: 100%;
`;

export const ProfileContentContainer = styled(motion.section)`
  margin-top: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4rem;

  .user-email {
    font-size: 1.2rem;
    font-weight: 500;
    text-align: center;
    max-width: 350px;
    word-break: break-word;
  }
`;

export const ProfileButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;

  button {
    width: 12rem;
    height: 4rem;
    border-style: none;
    border-radius: 20px;
    background: ${({ theme }) => theme.colors.main.dark};
    font-size: 1.2rem;
    font-weight: 600;
    color: #fff;
  }
`;
