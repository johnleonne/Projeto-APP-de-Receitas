import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';
import {
  foodResponseByIngredientOnion,
  foodResponseByName } from './Mocks/Meals';

describe('Testes para a página de perfil', () => {

  jest.fn(fetch).mockResolvedValueOnce(foodResponseByIngredientOnion);

  it('Verifica a funcionalidade da barra de pesquisa', async () => {
    render(<App />);

    const nameInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const loginBtn = screen.getByTestId('login-submit-btn');

    userEvent.type(nameInput, 'teste@gmail.com');
    userEvent.type(passwordInput, '123456789');
    userEvent.click(loginBtn);

    expect(screen.getByText('Foods')).toBeInTheDocument();

    const searchBtn = screen.getByTestId('search-top-btn');
    userEvent.click(searchBtn);

    const searchInput = screen.getByTestId('search-input');
    const ingredientRadio = screen.getByLabelText(/ingredient/i);
    userEvent.type(searchInput, 'onion')
    userEvent.click(ingredientRadio);

    const filterSearchBtn = screen.getByTestId('exec-search-btn');
    userEvent.click(filterSearchBtn);
    expect(await screen.findAllByRole('heading', { level: 3 })).toHaveLength(12);
    
    foodResponseByIngredientOnion.meals.forEach(({ strMeal, strMealThumb }) => {
      expect(screen.getByRole('heading', { level: 3, name: strMeal.trim() })).toBeInTheDocument()
      expect(screen.getByAltText(strMeal.trim())).toBeInTheDocument()
      expect(screen.getByAltText(strMeal.trim()).src).toBe(strMealThumb)
    })

    jest.fn(fetch).mockResolvedValueOnce(foodResponseByName);

    const nameRadio = screen.getByLabelText(/name/i);
    userEvent.click(nameRadio);
    userEvent.type(searchInput,'{selectall}chicken');
    userEvent.click(filterSearchBtn);
    expect(await screen.findAllByRole('heading', { level: 3 })).toHaveLength(12);
  });
});
