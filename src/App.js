import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Login from './pages/Login';
import Foods from './pages/Foods';

function App() {
  return (
    <BrowserRouter>
      <Route path="/" exact component={ Login } />
      <Route path="/foods" exact component={ Foods } />
    </BrowserRouter>
  );
}

export default App;
