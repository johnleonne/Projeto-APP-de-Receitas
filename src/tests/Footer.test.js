import React from 'react';
import App from '../App';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter'

describe('Testes para a página de perfil', () => {
  it('Verifica se o header leva para a página `/profile` quando o botão de profile for clicado', () => {
    renderWithRouter('/foods')

    expect(screen.getByTestId('footer')).toBeInTheDocument();

    const foodsPageRedirectButton = screen.getByTestId('food-bottom-btn');
    const drinksPageRedirectButton = screen.getByTestId('drinks-bottom-btn');

    userEvent.click(foodsPageRedirectButton);
    expect(screen.getByRole('heading', { name: 'Foods', level: 1 })).toBeInTheDocument();

    userEvent.click(drinksPageRedirectButton);
    expect(screen.getByRole('heading', { name: 'Drinks', level: 1 })).toBeInTheDocument();
  })
});
