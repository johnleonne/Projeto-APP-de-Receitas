import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';

describe('Testes para a página de perfil', () => {
  it('Verifica o redirecionamento para a página de detalhes da bebida', async () => {
    render(<App />);   

    const nameInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const loginBtn = screen.getByTestId('login-submit-btn');

    userEvent.type(nameInput, 'teste@gmail.com');
    userEvent.type(passwordInput, '123456789');
    userEvent.click(loginBtn);

    expect(screen.getByText('Foods')).toBeInTheDocument();

    const footerDrinkBtnRedirect = screen.getByTestId('drinks-bottom-btn');

    userEvent.click(footerDrinkBtnRedirect);

    expect(screen.getByText('Drinks')).toBeInTheDocument();

    expect(await screen.findByTestId('0-card-img')).toBeInTheDocument();

    userEvent.click(await screen.findByTestId('0-card-img'));

    expect(await screen.findByRole('heading', { level: 1, name: /drink detail page/i }))

    expect(await screen.findByText(/gg/i)).toBeInTheDocument();

  });
});
