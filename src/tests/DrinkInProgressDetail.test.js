import React from 'react';
import { render, screen } from '@testing-library/react';
import { DrinkInProgressDetails } from '../pages';

describe('Testes para a página de perfil', () => {
  it('Verifica se o header renderiza com as informações corretas', () => {
    render(<DrinkInProgressDetails />);

    expect(screen.queryByTestId('header')).toBeFalsy();
    expect(screen.queryByTestId('profile-top-btn')).toBeFalsy();
    expect(screen.queryByTestId('search-top-btn')).toBeFalsy();
  });
});
