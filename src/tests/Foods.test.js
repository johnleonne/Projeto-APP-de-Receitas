import React from 'react';
import { cleanup, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  foodResponseByIngredientOnion,
  foodResponseByName,
  foodResponseByFirstLetter,
  foodResponseNotFound,
  mealCategories
} from './Mocks/Meals';
import renderWithRouter from './helpers/renderWithRouter'

global.alert = jest.fn();
afterEach(cleanup)

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

    expect(await screen.findByText('Chicken Handi')).toBeInTheDocument()
    await waitFor(()=>{
      expect(history.location.pathname).toBe('/foods/52795')
    })
    expect(screen.getByText(/Food detail page/i)).toBeInTheDocument()
  })

  it('Testando pesquisa por first letter', async () => {
    const { history } = renderWithRouter('/foods')
    console.log(history.location.pathname);
    const searchBtn = screen.getByTestId('search-top-btn');
    userEvent.click(searchBtn);

    const firstLetterRadio = screen.getByLabelText(/first letter/i);
    const searchInput = screen.getByTestId('search-input');
    const filterSearchBtn = screen.getByTestId('exec-search-btn');

    userEvent.type(searchInput,'c');
    userEvent.click(firstLetterRadio);
    userEvent.click(filterSearchBtn);

    // expect(await screen.findByText(/Apple/i)).toBeInTheDocument()
    // jest.fn().mockImplementationOnce(() => foodResponseNotFound)
    // global.fetch = jest.fn(() => {
    //   Promise.resolve({
    //     json: () => Promise.resolve(foodResponseNotFound)
    //   })
    // })
    
    expect(await screen.findByText(/chocolate/i)).toBeInTheDocument()
    
  } )

  it('Testando se ao inserir mais de uma letra um alerta é emitido', async () => {
    const { history } = renderWithRouter('/foods')

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
