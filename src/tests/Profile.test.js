import React from 'react';
import { render, screen } from '@testing-library/react';
import { Profile } from '../pages';

describe('Testes para a página de perfil', () => {
  it('Verifica se o header renderiza com as informações corretas', () => {
    render(<Profile />);

    expect(screen.queryByTestId('header')).toBeTruthy();
    expect(screen.getByRole('heading', { level: 1, name: 'Profile' }));
    expect(screen.queryByTestId('profile-top-btn')).toBeTruthy();
    expect(screen.queryByTestId('search-top-btn')).toBeFalsy();
  });
});
