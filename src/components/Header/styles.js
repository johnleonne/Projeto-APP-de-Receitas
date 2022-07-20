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
  justify-content: space-around;
  width: 100%;

  h1 {
    font-size: 30px;
    color: #fff;
  }
`;
