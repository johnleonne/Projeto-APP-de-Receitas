import styled, { keyframes } from 'styled-components';

const backgroundChange = keyframes`
  from {
    background: #48CECB;
  }

  to {
    background: #C6EAEF;
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
    border: 2px solid rgba(0, 0, 0, 0.3);
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
    width: 10rem;
    height: 2.5rem;
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
`;
