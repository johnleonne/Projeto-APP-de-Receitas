import React from 'react';
import {  screen } from '@testing-library/react';
import renderWithRouter from './helpers/renderWithRouter'

describe('Testes para a página de Favorites Recipes', () => {
  it('Verifica se o header renderiza com as informações corretas', () => {
    renderWithRouter('/done-recipes')
    expect(screen.queryByTestId('header')).toBeTruthy();
  });
});
