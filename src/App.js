import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Foods from './pages/Foods';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/foods" component={ Foods } />
        <Route exact path="/foods/:id" />
        <Route exact path="/foods/:id/in-progress" />
        <Route exact path="/drinks" />
        <Route exact path="/drinks/:id" />
        <Route exact path="/drinks/:id/in-progress" />
        <Route exact path="/done-recipes" />
        <Route exact path="/favorite-recipes" />
        <Route exact path="/profile" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
