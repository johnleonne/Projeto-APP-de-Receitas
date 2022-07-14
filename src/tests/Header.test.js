import React from 'react';
import Header from '../components/Header';
import App from '../App';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Testes para a página de perfil', () => {
  afterEach(cleanup);

  it('Verifica se o header renderiza com as informações corretas', () => {
    render(<Header haveSearch title="Test"/>);

    const searchButton = screen.getByTestId('search-top-btn');

    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1, name: 'Test' }));

    expect(screen.queryByTestId('search-input')).toBeFalsy();

    userEvent.click(searchButton);

    expect(screen.getByTestId('search-input')).toBeInTheDocument();
  });

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
