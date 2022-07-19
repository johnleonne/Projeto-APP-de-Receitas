import React from 'react';
import { render, screen } from '@testing-library/react';
import { Profile } from '../pages';
import renderWithRouter from './helpers/renderWithRouter';
import userEvent from '@testing-library/user-event';



describe('Testes para a página de perfil', () => {
  it('Testando Botao logout', () => {
    const{history} = renderWithRouter('/profile')
    expect(screen.queryByTestId('header')).toBeTruthy();
    expect(screen.getByRole('heading', { level: 1, name: 'Profile' }));
    expect(screen.queryByTestId('profile-top-btn')).toBeTruthy();
    expect(screen.queryByTestId('search-top-btn')).toBeFalsy();
    userEvent.click(screen.getByRole('button', {  name: /logout/i}))
    expect(history.location.pathname).toBe('/')
  });

  it('Testando Botão Done-recipes', ()=> {
    const{history} = renderWithRouter('/profile')
    userEvent.click(screen.getByRole('button', {  name: /done recipes/i}))
    expect(history.location.pathname).toBe('/done-recipes')
  })
  it('Testando Botão Favorite-recipes', ()=> {
    const{history} = renderWithRouter('/profile')
    userEvent.click(screen.getByRole('button', {  name: /favorite recipes/i}))
    expect(history.location.pathname).toBe('/favorite-recipes')
  })

  it('Testando LocalStorage', async ()=> {
    const {history} = renderWithRouter('/')

    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const loginButton = screen.getByRole('button', { name: /enter/i });

    expect(screen.getByRole('heading', { name: /login/i, level: 1 })).toBeInTheDocument();


    userEvent.type(emailInput, 'teste@gmail.com');
    userEvent.type(passwordInput, '1234561');
    expect(loginButton.disabled).toBeFalsy();

    userEvent.click(loginButton);

    expect(JSON.parse(localStorage.getItem('user'))).toEqual({
      email: 'teste@gmail.com',
    });

    expect(await screen.findByText(/foods page/i)).toBeInTheDocument()

    userEvent.click(screen.getByTestId('profile-top-btn'))
    expect(history.location.pathname).toBe('/profile')
    expect(screen.getByTestId('profile-email').innerHTML).toBe('teste@gmail.com')

  })




});
