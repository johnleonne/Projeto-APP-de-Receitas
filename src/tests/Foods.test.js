import React from 'react';
import { render, screen, cleanup, act, waitFor } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';
import {
  foodResponseByIngredientOnion,
  foodResponseByName,
  foodResponseByFirstLetter,
  foodResponseNotFound
} from './Mocks/Meals';


  jest.spyOn(global, 'fetch' );

describe('Testes para a página de perfil', () => {

  it('Verifica a funcionalidade da barra de pesquisa', async () => {
    act(() => {
      render(<App />);
    });

    global.fetch.mockResolvedValue({json: () => foodResponseByIngredientOnion});

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

    jest.clearAllMocks()

    global.fetch.mockResolvedValue({json: () => foodResponseByName});

    const nameRadio = screen.getByLabelText(/name/i);
    userEvent.click(nameRadio);
    userEvent.type(searchInput,'{selectall}chicken');
    userEvent.click(filterSearchBtn);
    expect(await screen.findAllByRole('heading', { level: 3 })).toHaveLength(12);

    foodResponseByName.meals.forEach(({ strMeal, strMealThumb }, index) => {
      if ( index === 12) return
      expect(screen.getByRole('heading', { level: 3, name: strMeal.trim() })).toBeInTheDocument()
      expect(screen.getByAltText(strMeal.trim())).toBeInTheDocument()
      expect(screen.getByAltText(strMeal.trim()).src).toBe(strMealThumb)
    })

    jest.clearAllMocks()

    global.fetch.mockResolvedValue({json: () => foodResponseByFirstLetter});

    const firstLetterRadio = screen.getByLabelText(/first letter/i);
    userEvent.click(firstLetterRadio);
    userEvent.type(searchInput,'{selectall}c');
    userEvent.click(filterSearchBtn);
    expect(await screen.findAllByRole('heading', { level: 3 })).toHaveLength(12);

    expect(await screen.findByText(/chocolate gateau/i)).toBeInTheDocument();

    foodResponseByFirstLetter.meals.forEach(({ strMeal, strMealThumb }, index) => {
      if ( index === 12) return
      expect(screen.getByRole('heading', { level: 3, name: strMeal.trim() })).toBeInTheDocument()
      expect(screen.getByAltText(strMeal.trim())).toBeInTheDocument()
      expect(screen.getByAltText(strMeal.trim()).src).toBe(strMealThumb)
    })

    jest.clearAllMocks()

    global.fetch.mockResolvedValue({ json: () => foodResponseNotFound });

    userEvent.click(nameRadio);
    userEvent.type(searchInput,'{selectall}odeiotestes');
    userEvent.click(filterSearchBtn);

    // jest.spyOn(global, 'alert');
    global.alert = jest.fn()

    waitFor(() => expect(global.alert).toHaveBeenCalled());
    waitFor(() => expect(global.alert).toHaveBeenCalledWith(`${''}Sorry, we haven't found any recipes for these filters.`));


    userEvent.click(firstLetterRadio);
    userEvent.type(searchInput,'{selectall}od');
    userEvent.click(filterSearchBtn);
    
    expect(global.alert).toBeCalled()
    expect(global.alert).toBeCalledWith('Your search must have only 1 (one) character')
  });
});
