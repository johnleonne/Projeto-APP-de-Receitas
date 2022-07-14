import React from 'react';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Testa as validações da página de Login', () => {
  
  it('Testa se as validações dos campos de email funcionam corretamente', () => {
    render(<App />);

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
      email: 'teste@gmail.com',
    });

    expect(screen.queryByRole('heading', { name: /login/i, level: 1 })).toBeFalsy();
    expect(screen.queryByTestId('email-input')).toBeFalsy();
    expect(screen.queryByTestId('password-input')).toBeFalsy();
    expect(screen.queryByRole('button', { name: /enter/i })).toBeFalsy();
  });
});
