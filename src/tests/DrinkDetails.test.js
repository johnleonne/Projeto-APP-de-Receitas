import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter'
import userEvent from '@testing-library/user-event';
import { drinkResponseById, favDrinks } from './Mocks/Drink';
import createFavoriteRecipeObject from '../utils/createFavoriteRecipeObject';
import { FavoriteRecipes } from '../pages';



describe('Testes para a página de Drink Details', () => {
  it('Verifica o redirecionamento para a página de detalhes da Drinks', async () => {
    const { history } = renderWithRouter('/drinks/17228')
    jest.spyOn(Storage.prototype, 'setItem');
    Storage.prototype.setItem = jest.fn();

    expect(await screen.findByText('Addison')).toBeInTheDocument()
    expect(await screen.findByText('Corba')).toBeInTheDocument()
    const imgFav = screen.getByRole('img', {  name: /favorite icon/i})
    expect(imgFav.src).toBe('http://localhost/whiteHeartIcon.svg')
    userEvent.click(imgFav)
    expect(imgFav.src).toBe('http://localhost/blackHeartIcon.svg')
    expect(localStorage.setItem).toBeCalled()    
    const favoriteRecipeObj = createFavoriteRecipeObject(favDrinks, 'drink');

    expect(localStorage.setItem).toHaveBeenCalledWith('favoriteRecipes', JSON.stringify([favoriteRecipeObj]))   
  });
});
