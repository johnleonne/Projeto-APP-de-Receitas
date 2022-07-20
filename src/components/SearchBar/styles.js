import styled, { css, keyframes } from 'styled-components';

const swingIn = keyframes`
  0% {
    -webkit-transform: translateX(-1000px) scaleX(2.5) scaleY(0.2);
            transform: translateX(-1000px) scaleX(2.5) scaleY(0.2);
    -webkit-transform-origin: 100% 50%;
            transform-origin: 100% 50%;
    -webkit-filter: blur(40px);
            filter: blur(40px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateX(0) scaleY(1) scaleX(1);
            transform: translateX(0) scaleY(1) scaleX(1);
    -webkit-transform-origin: 50% 50%;
            transform-origin: 50% 50%;
    -webkit-filter: blur(0);
            filter: blur(0);
    opacity: 1;
  }
  0% {
    -webkit-transform: translateX(-1000px) scaleX(2.5) scaleY(0.2);
            transform: translateX(-1000px) scaleX(2.5) scaleY(0.2);
    -webkit-transform-origin: 100% 50%;
            transform-origin: 100% 50%;
    -webkit-filter: blur(40px);
            filter: blur(40px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateX(0) scaleY(1) scaleX(1);
            transform: translateX(0) scaleY(1) scaleX(1);
    -webkit-transform-origin: 50% 50%;
            transform-origin: 50% 50%;
    -webkit-filter: blur(0);
            filter: blur(0);
    opacity: 1;
  }
`;

const swingOut = keyframes`
  0% {
    -webkit-transform: translateX(0) scaleY(1) scaleX(1);
            transform: translateX(0) scaleY(1) scaleX(1);
    -webkit-transform-origin: 50% 50%;
            transform-origin: 50% 50%;
    -webkit-filter: blur(0);
            filter: blur(0);
    opacity: 1;
  }
  100% {
    -webkit-transform: translateX(1000px) scaleX(2) scaleY(0.2);
            transform: translateX(1000px) scaleX(2) scaleY(0.2);
    -webkit-transform-origin: 0% 50%;
            transform-origin: 0% 50%;
    -webkit-filter: blur(40px);
            filter: blur(40px);
    opacity: 0;
  }
  0% {
    -webkit-transform: translateX(0) scaleY(1) scaleX(1);
            transform: translateX(0) scaleY(1) scaleX(1);
    -webkit-transform-origin: 50% 50%;
            transform-origin: 50% 50%;
    -webkit-filter: blur(0);
            filter: blur(0);
    opacity: 1;
  }
  100% {
    -webkit-transform: translateX(1000px) scaleX(2) scaleY(0.2);
            transform: translateX(1000px) scaleX(2) scaleY(0.2);
    -webkit-transform-origin: 0% 50%;
            transform-origin: 0% 50%;
    -webkit-filter: blur(40px);
            filter: blur(40px);
    opacity: 0;
  }
`;

export const SearchBarContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  transition: all 0.5s ease-in-out;

  ${({ visible }) => visible && css`
    -webkit-animation: ${swingIn} 0.6s cubic-bezier(0.230, 1.000, 0.320, 1.000) both;
    animation: ${swingIn} 0.6s cubic-bezier(0.230, 1.000, 0.320, 1.000) both;
  `};

  ${({ visible }) => !visible && css`
    -webkit-animation: ${swingOut} 0.45s cubic-bezier(0.755, 0.050, 0.855, 0.060) both;
    animation: ${swingOut} 0.45s cubic-bezier(0.755, 0.050, 0.855, 0.060) both;
  `};
`;

export const SearchInputContainer = styled.div`
  display: flex;
  margin: 16px 0;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  .search-input-icon-container {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 6.5px 10px;
    background: #96DFE1;
    border-radius: 0 5px 5px 0;
  }

  .search-input-icon {
    transform: rotateY(180deg);
  }

  input {
    margin: 0.5rem 0;
    height: 31px;
    outline: none;
    border-style: none;
    border-radius: 5px 0 0 5px;
    transition: 0.2s ease-in-out;
    padding: 0px 10px;
  }
`;
