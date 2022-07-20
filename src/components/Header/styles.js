import styled from 'styled-components';

export const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  padding: 1rem 0;
  background: ${({ theme }) => theme.colors.main.dark};
  border-bottom: 7px solid ${({ theme }) => theme.colors.main.light};

  .header-input-container {
    transition: all 0.4s ease-in-out;
    height: ${({ isSearchInputVisible }) => (isSearchInputVisible ? '100px' : '0px')};
  }
`;

export const HeaderIconsContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  padding: 0px 1.5rem;
  justify-content: space-between;
  width: 100%;

  h1 {
    font-size: 30px;
    color: #fff;
  }

  .header-icon {
    transition: all 0.2s ease-in-out;
    
    &:hover {
      cursor: pointer;
      transform: scale(1.05);
    }

    &:active {
      cursor: pointer;
      transform: scale(1.05);
    }
  }
`;
