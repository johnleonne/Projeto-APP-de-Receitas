import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

test('Farewell, front-end', () => {
  renderWithRouter('/');
  const linkElement = screen.getByText(/login/i);
  expect(linkElement).toBeInTheDocument();
});
