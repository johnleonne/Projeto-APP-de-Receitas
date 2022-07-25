import React from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import {
  Login, Foods, Drinks, DoneRecipes, DrinkDetail, DrinkInProgressDetails,
  FavoriteRecipes, FoodDetail, FoodInProgressDetails, Profile,
} from './pages';


export default function Routes() {
  const location = useLocation();

  return (
    <AnimatePresence>
      <Switch location={location} key={ location.pathname }>
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
    </AnimatePresence>
  )
}
