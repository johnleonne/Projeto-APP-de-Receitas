import React from 'react';
import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

export const renderWithRouter = (component, route = '/') => {
  const history = createMemoryHistory({ initialEntries: [route] });

  return {
    ...render(
        <Router history={ history }>
          {component}
        </Router>,
    ),
    history,
  };
};

export default renderWithRouter;