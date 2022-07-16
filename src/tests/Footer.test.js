import React from 'react';
import App from '../App';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Testes para a página de perfil', () => {
  it('Verifica se o header leva para a página `/profile` quando o botão de profile for clicado', () => {
    render(<App />);

    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const loginButton = screen.getByRole('button', { name: /enter/i });

    userEvent.type(emailInput, 'teste@gmail.com');
    userEvent.type(passwordInput, '1234567');

    userEvent.click(loginButton);

    expect(screen.getByTestId('footer')).toBeInTheDocument();

    const foodsPageRedirectButton = screen.getByTestId('food-bottom-btn');
    const drinksPageRedirectButton = screen.getByTestId('drinks-bottom-btn');

    userEvent.click(foodsPageRedirectButton);
    expect(screen.getByRole('heading', { name: 'Foods', level: 1 })).toBeInTheDocument();

    userEvent.click(drinksPageRedirectButton);
    expect(screen.getByRole('heading', { name: 'Drinks', level: 1 })).toBeInTheDocument();
  })
});
