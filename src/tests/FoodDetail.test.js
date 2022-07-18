import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter'
import { wait } from '@testing-library/user-event/dist/utils';

describe('Testes para a página de Foods', () => {
  it('Verifica o redirecionamento para a página de detalhes da Foods', async () => {
    const { history } = renderWithRouter('/foods/52795')
    console.log(history.location.pathname);
    
    expect(await screen.findByText('Chicken Handi')).toBeInTheDocument()
  });  
});
