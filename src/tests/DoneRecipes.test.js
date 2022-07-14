import React from 'react';
import { render, screen } from '@testing-library/react';
import { DoneRecipes } from '../pages';

describe('Testes para a página de perfil', () => {
  it('Verifica se o header renderiza com as informações corretas', () => {
    render(<DoneRecipes />);

    expect(screen.queryByTestId('header')).toBeTruthy();
    expect(screen.getByRole('heading', { level: 1, name: 'Done Recipes' }));
    expect(screen.queryByTestId('DoneRecipes-top-btn')).toBeFalsy();
    expect(screen.queryByTestId('search-top-btn')).toBeFalsy();
  });
});
