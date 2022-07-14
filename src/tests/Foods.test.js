import React from 'react';
import { render, screen } from '@testing-library/react';
import { Foods } from '../pages';

describe('Testes para a página de perfil', () => {
  it('Verifica se o header renderiza com as informações corretas', () => {
    render(<Foods />);

    expect(screen.queryByTestId('header')).toBeTruthy();
    expect(screen.getByRole('heading', { level: 1, name: 'Foods' }));
    expect(screen.queryByTestId('profile-top-btn')).toBeTruthy();
    expect(screen.queryByTestId('search-top-btn')).toBeTruthy();
  });
});
