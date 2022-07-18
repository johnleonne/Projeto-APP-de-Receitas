import React from 'react';
import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import App from '../../App';

export const renderWithRouter = (route) => {
  const history = createMemoryHistory({ initialEntries: [route] });

  return {
    ...render(
        <Router history={ history }>
          <App/>
        </Router>,
    ),
    history,
  };
};

export default renderWithRouter;