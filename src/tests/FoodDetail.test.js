import React from 'react';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter'


describe('Testes para a página de Foods', () => {
  it('Verifica o redirecionamento para a página de detalhes da Foods', async () => {
    renderWithRouter('/foods/52795')
    Object.assign(window.navigator, {
      clipboard: {
        writeText: jest.fn().mockImplementation(() => Promise.resolve()),
      },
    });
    
    expect(await screen.findByText('Chicken Handi')).toBeInTheDocument()
    expect(await screen.findByTestId('0-recomendation-title')).toBeInTheDocument()
    expect(screen.getByTestId('share-btn')).toBeInTheDocument()
    userEvent.click(screen.getByTestId('share-btn'))
    expect(screen.getByText('Link copied!')).toBeInTheDocument()
  });  
});
