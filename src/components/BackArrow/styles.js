import styled from 'styled-components';

export default styled.div`
  width: 40px;
  height: 40px;
  position: fixed;
  background: ${({ theme }) => theme.colors.main.dark};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 1rem;
  left: 1rem;

  .arrow-icon {
    fill: #fff;
  }
`;
