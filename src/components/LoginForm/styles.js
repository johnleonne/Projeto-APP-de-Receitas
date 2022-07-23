import styled, { keyframes } from 'styled-components';

const backgroundChange = keyframes`
  0% {
    background: #f00;
  }

  100% {
    background: #f9b9bd;
  }
`;

const pump = keyframes`
  from {
    -webkit-transform: scale(1);
            transform: scale(1);
    -webkit-transform-origin: center center;
            transform-origin: center center;
    -webkit-animation-timing-function: ease-out;
            animation-timing-function: ease-out;
  }
  10% {
    -webkit-transform: scale(0.91);
            transform: scale(0.91);
    -webkit-animation-timing-function: ease-in;
            animation-timing-function: ease-in;
  }
  17% {
    -webkit-transform: scale(0.98);
            transform: scale(0.98);
    -webkit-animation-timing-function: ease-out;
            animation-timing-function: ease-out;
  }
  33% {
    -webkit-transform: scale(0.87);
            transform: scale(0.87);
    -webkit-animation-timing-function: ease-in;
            animation-timing-function: ease-in;
  }
  45% {
    -webkit-transform: scale(1);
            transform: scale(1);
    -webkit-animation-timing-function: ease-out;
            animation-timing-function: ease-out;
  }
`;

export const LoginPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  animation: ${backgroundChange} 3s alternate infinite;
`;

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 16px;
  -webkit-box-shadow: 3px 6px 13px -4px rgba(0, 0, 0, 0.5); 
  box-shadow: 3px 6px 13px -4px rgba(0, 0, 0, 0.5);
  width: 80%;
  height: 30rem;
  background: rgba(255, 255, 255);
  

  h1 {
    font-size: 40px;
    color: ${({ theme }) => theme.colors.main.dark};
    margin-top: 1rem;
    margin-bottom: 2.3rem;

    span {
      color: ${({ theme }) => theme.colors.main.main};
      margin-left: 3px;
    }
  }

  input {
    margin: 0.8rem 0;
    height: 40px;
    width: 80%;
    outline: none;
    border: 2px solid #e6e5e3;
    border-radius: 10px;
    transition: all 0.3s ease-in-out;
    padding: 0px 10px;
    font-size: 1rem;

    &:focus {
      transform: translateY(-2px);
      border-color: ${({ theme }) => theme.colors.main.main}
    }
  }

  button {
    margin-top: 1rem;
    width: 12rem;
    height: 2.7rem;
    border-style: none;
    border-radius: 5px;
    background: ${({ theme }) => theme.colors.main.dark};
    font-size: 20px;
    font-weight: 600;
    color: #fff;
    transition: all 0.2s ease-in-out;

    &:hover:enabled {
      cursor: pointer;
      opacity: 0.6;
    }

    &:active:enabled {
      cursor: pointer;
      opacity: 0.6;
    }

    &:disabled {
      background: rgba(0, 0, 0, 0.2);
      cursor: not-allowed;
    }
  }

  .login-chef {
    animation: ${pump} 3s infinite;
  }
`;
