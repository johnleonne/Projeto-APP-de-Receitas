import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

describe('RecipeCard Test', () => {
  it('teste', async () => {
    const { history } = renderWithRouter('/foods');

    expect(await screen.findByTestId('0-recipe-card')).toBeInTheDocument();
  })
})