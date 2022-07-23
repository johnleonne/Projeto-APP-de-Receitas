import styled from 'styled-components';

export default styled.button`
  position: fixed;
  border-style: none;
  right: 1rem;
  bottom: 2rem;
  width: 10rem;
  padding: 12px 10px;
  border-radius: 5px;
  font-weight: 600;
  color: #fff;
  background: ${({ theme }) => theme.colors.background.red};
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    opacity: 0.8;
    transform: translateY(-2px);
  }

  &:active {
    opacity: 0.8;
  }
`;
