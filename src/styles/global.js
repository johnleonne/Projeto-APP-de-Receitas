import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: ${({ theme }) => theme.fontFamily};

    input, button {
      font-family: ${({ theme }) => theme.fontFamily};
    }

  }

  body {
    background: ${({ theme }) => theme.colors.background.light};
  }
  `;
