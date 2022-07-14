import React from 'react';
import Login from '../pages/Login';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Testes para a página de login', () => {
  beforeEach(() => {
    render(<Login />);
  });

  it('Testa se as validações dos campos de email funcionam corretamente', () => {
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const loginButton = screen.getByRole('button', { name: /enter/i });

    expect(screen.getByRole('heading', { name: /login/i, level: 1 })).toBeInTheDocument();

    userEvent.type(emailInput, 'invalid');
    userEvent.type(passwordInput, '123');

    expect(loginButton.disabled).toBeTruthy();

    userEvent.type(emailInput, '{selectall}teste@gmail.com');
    userEvent.type(passwordInput, '1234567');

    expect(loginButton.disabled).toBeFalsy();
    userEvent.click(loginButton);

    expect(JSON.parse(localStorage.getItem('mealsToken'))).toBe(1);
    expect(JSON.parse(localStorage.getItem('cocktailsToken'))).toBe(1);
    expect(JSON.parse(localStorage.getItem('user'))).toEqual({
      email: 'teste@gmail.com'
    });
  })
});
