import React from 'react';
import App from '../App';
import { render, screen } from '@testing-library/react';
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

    userEvent.click(screen.getByTestId('profile-top-btn'));

    expect(screen.getByRole('heading', { level: 1, name: 'Profile' })).toBeInTheDocument();
  })
});
