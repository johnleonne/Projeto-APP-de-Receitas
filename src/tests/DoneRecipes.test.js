import React from 'react';
import { render, screen } from '@testing-library/react';
import { DoneRecipes } from '../pages';

describe('Testes para a página de Favorites Recipes', () => {
  it('Verifica se o header renderiza com as informações corretas', () => {
    render(<DoneRecipes />);

    expect(screen.queryByTestId('header')).toBeTruthy();
  });
});
