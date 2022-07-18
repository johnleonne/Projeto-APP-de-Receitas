import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './helpers/renderWithRouter';

describe('Testes para a página de perfil', () => {
  it('Verifica se o header renderiza com as informações corretas', async () => {
    const { history } = renderWithRouter('/foods/52977/in-progress')
    expect(screen.queryByTestId('header')).toBeFalsy();
    expect(screen.queryByTestId('profile-top-btn')).toBeFalsy();
    expect(screen.queryByTestId('search-top-btn')).toBeFalsy();
    console.log(history.location.pathname);
    const title = await screen.findByRole('heading', {  name: /corba/i})
    expect(title).toBeInTheDocument()
  });
});
