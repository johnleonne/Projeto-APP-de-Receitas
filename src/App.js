import React from 'react';
import { ThemeProvider } from 'styled-components';
import themes from './styles/themes';
import GlobalStyles from './styles/global';
import FoodsProvider from './context/FoodContext';
import Routes from './Routes';

function App() {
  return (
    <FoodsProvider>
      <ThemeProvider theme={ themes }>
        <GlobalStyles />
        <Routes />
      </ThemeProvider>
    </FoodsProvider>
  );
}

export default App;
