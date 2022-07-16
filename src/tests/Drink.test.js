import React from 'react';
import { render, screen } from '@testing-library/react';
import { drinkResponseByFirstLetter, drinkResponseByIngredientVodka, drinkResponseByName } from './Mocks/Drink';
import userEvent from '@testing-library/user-event';
import App from '../App';

jest.spyOn(global, 'fetch' );


describe('Testes para a página de Drinks', () => {
  it('Verifica se o header renderiza com as informações corretas', async () => {
    render(<App />);

    global.fetch.mockResolvedValue({json: () => drinkResponseByIngredientVodka});

    const nameInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const loginBtn = screen.getByTestId('login-submit-btn');

    userEvent.type(nameInput, 'teste@gmail.com');
    userEvent.type(passwordInput, '123456789');
    userEvent.click(loginBtn);
    userEvent.click(screen.getByTestId('drinks-bottom-btn'))
     
    const searchBtn = screen.getByTestId('search-top-btn');
    userEvent.click(searchBtn);

    
    const searchInput = screen.getByTestId('search-input');
    const ingredientRadio = screen.getByLabelText(/ingredient/i);
    expect(searchBtn).toBeInTheDocument()
    userEvent.click(ingredientRadio);
    userEvent.type(searchInput, 'vodka')

    const filterSearchBtn = screen.getByTestId('exec-search-btn');
    userEvent.click(filterSearchBtn);

    expect(await screen.findAllByRole('heading', { level: 3 })).toHaveLength(12);
    expect(screen.getByRole('heading', {
      name: /155 belmont/i
    })).toBeInTheDocument()
    
    // drinkResponseByIngredientVodka.drinks.forEach(({ strDrink, strDrinkThumb }) => {
    //   expect(screen.getByRole('heading', { level: 3, name: strDrink })).toBeInTheDocument()
    //   expect(screen.getByAltText(strDrink.trim())).toBeInTheDocument()
    //   expect(screen.getByAltText(strDrink.trim()).src).toBe(strDrinkThumb)
    // })

    jest.clearAllMocks()
    global.fetch.mockResolvedValue({json: () => drinkResponseByName});

    const nameRadio = screen.getByLabelText(/name/i);
    userEvent.click(nameRadio);
    userEvent.type(searchInput,'{selectall}Margarita');
    userEvent.click(filterSearchBtn);

    jest.clearAllMocks()
    global.fetch.mockResolvedValue({json: () => drinkResponseByFirstLetter});    

    const firstLetterRadio = screen.getByLabelText(/first letter/i);
    userEvent.click(firstLetterRadio);
    userEvent.type(searchInput,'{selectall}a');
    userEvent.click(filterSearchBtn);
    expect(await screen.findAllByRole('heading', { level: 3 })).toHaveLength(12);
    expect(screen.getByRole('heading', {  name: /a1/i})).toBeInTheDocument()

    global.alert = jest.fn()


    userEvent.click(firstLetterRadio);
    userEvent.type(searchInput,'{selectall}od');

    expect(global.alert).toBeCalled()
    expect(global.alert).toBeCalledWith('Your search must have only 1 (one) character')
  });
});
