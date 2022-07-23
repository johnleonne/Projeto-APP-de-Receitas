import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import themes from './styles/themes';
import GlobalStyles from './styles/global';
import {
  Login, Foods, Drinks, DoneRecipes, DrinkDetail, DrinkInProgressDetails,
  FavoriteRecipes, FoodDetail, FoodInProgressDetails, Profile,
} from './pages';
import FoodsProvider from './context/FoodContext';

function App() {
  return (
    <Switch>
      <FoodsProvider>
        <ThemeProvider theme={ themes }>
          <GlobalStyles />
          <Route exact path="/" component={ Login } />
          <Route exact path="/foods" component={ Foods } />
          <Route exact path="/foods/:id" component={ FoodDetail } />
          <Route
            exact
            path="/foods/:id/in-progress"
            component={ FoodInProgressDetails }
          />
          <Route exact path="/drinks" component={ Drinks } />
          <Route exact path="/drinks/:id" component={ DrinkDetail } />
          <Route
            exact
            path="/drinks/:id/in-progress"
            component={ DrinkInProgressDetails }
          />
          <Route exact path="/done-recipes" component={ DoneRecipes } />
          <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
          <Route exact path="/profile" component={ Profile } />
        </ThemeProvider>
      </FoodsProvider>
    </Switch>
  );
}

export default App;
