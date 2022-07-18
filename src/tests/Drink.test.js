import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import { drinkResponseByFirstLetter, drinkResponseByIngredientVodka, drinkResponseByName } from './Mocks/Drink';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter'


// jest.spyOn(global, 'fetch' );
global.alert = jest.fn();


describe('Testes para a página de Drinks', () => {

  it('Testando Render inicial Drinks', async ()=>{
    const {history} = renderWithRouter('/drinks')

    expect(await screen.findAllByRole('heading', {level:3})).toHaveLength(12)
    
  })
  it('Verifica se o header renderiza com as informações corretas', async () => {
    const {history} = renderWithRouter('/drinks')
    
    const searchBtn = screen.getByTestId('search-top-btn');
    userEvent.click(searchBtn);
    
    const searchInput = screen.getByTestId('search-input');
    const ingredientRadio = screen.getByLabelText(/ingredient/i);
    expect(searchBtn).toBeInTheDocument()
    userEvent.click(ingredientRadio);
    userEvent.type(searchInput, 'vodka')
    
    const filterSearchBtn = screen.getByTestId('exec-search-btn');
    userEvent.click(filterSearchBtn);

    // expect(global.fetch).toBeCalledTimes(1)

    expect(await screen.findAllByRole('heading', { level: 3 })).toHaveLength(12);
    expect(await screen.findByRole('heading', {
      name: /155 belmont/i
    })).toBeInTheDocument()    

  });

  it('Testando drinks pesquisando pelo nome Mimosa', async  ()=>{
    const {history} = renderWithRouter('/drinks')
    
    const searchBtn = screen.getByTestId('search-top-btn');
    userEvent.click(searchBtn);

    const filterSearchBtn = screen.getByTestId('exec-search-btn');    
    const searchInput = screen.getByTestId('search-input');
    const nameRadio = screen.getByLabelText(/name/i);

    userEvent.click(nameRadio);
    userEvent.type(searchInput,'Mimosa');
    userEvent.click(filterSearchBtn);

    // expect(await screen.findAllByRole('heading', {level:3})).toHaveLength(1)
    await waitFor(()=>{
      expect(history.location.pathname).toBe('/drinks/17205')
    })
    console.log(history.location.pathname);
  })

  it('Testando pesquisa por nome inexistente', async () => {
    const {history} = renderWithRouter('/drinks')
    const searchBtn = screen.getByTestId('search-top-btn');
    userEvent.click(searchBtn);
    const filterSearchBtn = screen.getByTestId('exec-search-btn');
    
    const searchInput = screen.getByTestId('search-input');

    const nameRadio = screen.getByLabelText(/name/i);
    userEvent.click(nameRadio);
    userEvent.type(searchInput,'{selectall}Xablau');
    userEvent.click(filterSearchBtn);

    await waitFor(()=>{
      expect(global.alert).toBeCalledWith('Sorry, we haven\'t found any recipes for these filters.')
    })   

  })

  it('Testando pesquisa por First Letter', async () => {
    const { history } = renderWithRouter('/drinks')
    console.log(history.location.pathname);
    const searchBtn = screen.getByTestId('search-top-btn');
    userEvent.click(searchBtn);

    const firstLetterRadio = screen.getByLabelText(/first letter/i);
    const searchInput = screen.getByTestId('search-input');
    const filterSearchBtn = screen.getByTestId('exec-search-btn');

    userEvent.type(searchInput,'c');
    userEvent.click(firstLetterRadio);
    userEvent.click(filterSearchBtn);

    expect(await screen.findByText(/casino/i)).toBeInTheDocument();
  })
});
