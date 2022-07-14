import React from 'react';
import { FavoriteRecipes } from '../pages'
import { render, screen } from '@testing-library/react';


describe('Testes para a página de Favorites Recipes', () => {
  it('Verifica se o header renderiza com as informações corretas', () => {
    render(<FavoriteRecipes/>);

    expect(screen.queryByTestId('header')).toBeTruthy();
  });
});

