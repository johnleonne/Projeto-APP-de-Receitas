import React from 'react';
import { render, screen } from '@testing-library/react';
import { drinksResponseByName } from './Mocks/Drink';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

describe('Testes para a página de perfil', () => {
  it('Verifica se o header renderiza com as informações corretas', async () => {
    // const { history } = renderWithRouter(<App />);
    // history.push('/drinks');
    // console.log(history.location.pathname);
    // expect(await screen.findByTestId('header')).toBeTruthy();
    // expect(screen.getByRole('heading', { level: 1, name: 'Drinks' }));
    // expect(screen.queryByTestId('profile-top-btn')).toBeTruthy();
    // expect(screen.queryByTestId('search-top-btn')).toBeTruthy();
    render(<App />);

    const nameInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const loginBtn = screen.getByTestId('login-submit-btn');

    userEvent.type(nameInput, 'teste@gmail.com');
    userEvent.type(passwordInput, '123456789');
    userEvent.click(loginBtn);

    expect(screen.getByText('Foods')).toBeInTheDocument();

  });
  // it('teste', () => {
  //   const { history } =  renderWithRouter(<App />);

  //   const searchButton = screen.getByTestId('search-top-btn');
  //   const input = screen.getByTestId('search-input');
    
  //   userEvent.click(searchButton);

  //   // expect(input).toBeInTheDocument();

  //   userEvent.type('')
  // })
});
