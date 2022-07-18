import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter'


describe('Testes para a página de Drink Details', () => {
  it('Verifica o redirecionamento para a página de detalhes da Drinks', async () => {
    const { history } = renderWithRouter('/drinks/17228')

    expect(await screen.findByText('Addison')).toBeInTheDocument()
    expect(await screen.findByText('Corba')).toBeInTheDocument()
  });
});
