import React from 'react';
import { render, screen } from '@testing-library/react';
import renderWithRouter from './helpers/renderWithRouter'
import App from '../App';


describe('Testes para a página de perfil', () => {
  it('Verifica se o header renderiza com as informações corretas', async () => {
    const { history } = renderWithRouter('/drinks/17228/in-progress')
    expect(screen.queryByTestId('header')).toBeFalsy();
    expect(screen.queryByTestId('profile-top-btn')).toBeFalsy();
    expect(screen.queryByTestId('search-top-btn')).toBeFalsy();
    console.log(history.location.pathname);
    const title = await screen.findByRole('heading', {  name: /addison/i})
    expect(title).toBeInTheDocument()
  });
});
