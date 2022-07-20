/* eslint-disable no-magic-numbers */
import styled from 'styled-components';

export default styled.button`
  width: 6rem;
  height: 2rem;
  margin: 10px;
  border-style: none;
  border-radius: 10px;
  transition: all 0.3s ease-in-out;
  background-color: ${({ theme, active }) => (
    active ? theme.colors.main.light : theme.colors.main.dark
  )};
  color: ${({ theme, active }) => (
    active ? theme.colors.blues.dark : '#fff'
  )};
  font-weight: 600;
  font-size: ${({ nameLength }) => (nameLength > 7 ? '12px' : '14px')};
  word-break: ${({ nameLength }) => (nameLength > 9 && 'break-word')};
`;
