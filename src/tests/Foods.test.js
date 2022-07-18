import React from 'react';
import { render, screen, cleanup, act, waitFor } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';
import {
  foodResponseByIngredientOnion,
  foodResponseByName,
  foodResponseByFirstLetter,
  foodResponseNotFound,
  mealCategories
} from './Mocks/Meals';
import renderWithRouter from './helpers/renderWithRouter'
import { wait } from '@testing-library/user-event/dist/utils';



  // jest.spyOn(global, 'fetch' );
global.alert = jest.fn();


describe('Testes para a página de Foods', () => {

  it('Verifica se a página contem 12 itens renderizados', async () => {
    renderWithRouter('/foods')
    
    expect(await screen.findAllByRole('heading', { level:3 })).toHaveLength(12)
  })
  
  it('Verifica se ao pesquisar pelo nome Xablau um alerta é emitido',async  () =>{
    renderWithRouter('/foods')
    
    const searchBtn = screen.getByTestId('search-top-btn');
    userEvent.click(searchBtn);

    const filterSearchBtn = screen.getByTestId('exec-search-btn');    
    const searchInput = screen.getByTestId('search-input');
    const nameRadio = screen.getByLabelText(/name/i);

    userEvent.click(nameRadio);
    userEvent.type(searchInput,'xablau');
    userEvent.click(filterSearchBtn);

    expect(global.fetch).toBeCalledWith('www.themealdb.com/api/json/v1/1/filter.php?i=chicken_breast')

     await waitFor(() => {
       expect(global.alert).toHaveBeenCalledWith('Sorry, we haven\'t found any recipes for these filters.')
     })
  })

  it('Verifica se ao pesquisar pelo nome Chicken Handi é direcionado para a pagina de detalhe', async ()=> {
    const{history} = renderWithRouter('/foods')

    const searchBtn = screen.getByTestId('search-top-btn');
    userEvent.click(searchBtn);

    const filterSearchBtn = screen.getByTestId('exec-search-btn');    
    const searchInput = screen.getByTestId('search-input');
    const nameRadio = screen.getByLabelText(/name/i);

    userEvent.click(nameRadio);
    userEvent.type(searchInput,'chicken handi');
    userEvent.click(filterSearchBtn);

    await waitFor(()=>{
      expect(history.location.pathname).toBe('/foods/52795')
    })

    expect(await screen.findByTestId('0-ingredient-name-and-measure')).toBeInTheDocument()

  })

  it.only('Testando pesquisa por first letter', async ()=>{
    const{history} = renderWithRouter('/foods')
    const searchBtn = screen.getByTestId('search-top-btn');
    userEvent.click(searchBtn);

    const firstLetterRadio = screen.getByLabelText(/first letter/i);
    const searchInput = screen.getByTestId('search-input');
    const filterSearchBtn = screen.getByTestId('exec-search-btn');    


    userEvent.click(firstLetterRadio);
    userEvent.type(searchInput,'a');
    global.fetch = jest.fn()
    userEvent.click(filterSearchBtn);
    
    expect(global.fetch).toBeCalledWith('www.themealdb.com/api/json/v1/1/search.php?f=a')


  } )

  it.only('Testando se ao inserir mais de uma letra um alerta é emitido', async () => {
    const{history} = renderWithRouter('/foods')

    const searchBtn = screen.getByTestId('search-top-btn');
    userEvent.click(searchBtn);

    const firstLetterRadio = screen.getByLabelText(/first letter/i);
    const searchInput = screen.getByTestId('search-input');

    userEvent.click(firstLetterRadio);
    userEvent.type(searchInput,'aa');

    await waitFor(()=>{
      expect(global.alert).toBeCalled()
    })

  })
  
  it('Testando categorias exibidas',async () => {
    const{history} = renderWithRouter('/foods')

    expect(history.location.pathname).toBe('/foods')
    expect(screen.getByText('Foods page')).toBeInTheDocument()
    expect(await screen.findByRole('button', {  name: /all/i}))

    await waitFor(()=>{
      expect(screen.getByRole('button', {name: /beef/i})).toBeInTheDocument()
    })
  })
  

});
