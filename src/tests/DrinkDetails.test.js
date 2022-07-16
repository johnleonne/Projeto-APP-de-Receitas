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

    const searchBtn = screen.getByTestId('search-top-btn');
    userEvent.click(searchBtn);

    const searchInput = screen.getByTestId('search-input');
    const nameRadio = screen.getByLabelText(/name/i);
    userEvent.type(searchInput, 'abc')
    userEvent.click(nameRadio);

    const filterSearchBtn = screen.getByTestId('exec-search-btn');
    userEvent.click(filterSearchBtn);

    expect(await screen.findByText(/drink detail page/i)).toBeInTheDocument();

  });
});
