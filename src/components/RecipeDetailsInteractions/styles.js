import styled, { css } from 'styled-components';

export default styled.div`
  display: flex;
  gap: 4rem;
  margin-bottom: 2rem;
  
  .share-button, .favorite-button {
    fill: ${({ theme }) => theme.colors.main.main};
  }

  .filled-favorite-button {
    fill: #FF2C55;
  }

  .copied-msg {
    position: fixed;
    text-align: center;
    left: 1rem;
    bottom: 2rem;
    padding: 10px;
    border-radius: 5px;
    font-weight: 600;
    color: #fff;
    background: ${({ theme }) => theme.colors.background.blue};
    opacity: 0;
    transition: all 0.5s ease-in-out;

    ${({ isLinkCopied }) => isLinkCopied && css`
      opacity: 1;
    `}
  }
`;
