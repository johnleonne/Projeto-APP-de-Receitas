import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import {
  Login, Foods, Drinks, DoneRecipes, DrinkDetail, DrinkInProgressDetails,
  FavoriteRecipes, FoodDetail, FoodInProgressDetails, Profile,
} from './pages';
import FoodsProvider from './context/FoodContext';

function App() {
  return (
    <BrowserRouter>
      <FoodsProvider>
        <Switch>
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
        </Switch>
      </FoodsProvider>
    </BrowserRouter>
  );
}

export default App;
