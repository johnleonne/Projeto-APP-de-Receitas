import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import { favMeal } from './Mocks/Meals';
import createFavoriteRecipeObject from '../utils/createFavoriteRecipeObject';

describe('Testes para a página de Foods', () => {
  it('Verifica o redirecionamento para a página de detalhes da Foods', async () => {
    renderWithRouter('/foods/52795')
    Object.assign(window.navigator, {
      clipboard: {
        writeText: jest.fn().mockImplementation(() => Promise.resolve()),
      },
    });
    
    expect(await screen.findByText('Chicken Handi')).toBeInTheDocument()
    expect(await screen.findByTestId('0-recomendation-title')).toBeInTheDocument()
    expect(screen.getByTestId('share-btn')).toBeInTheDocument()
    userEvent.click(screen.getByTestId('share-btn'))
    expect(screen.getByText('Link copied!')).toBeInTheDocument()
  });

  it('Testa a funcionalidade do botão "Favoritar Receita"',async () => {
    const { history } = renderWithRouter('/foods/52795');

    jest.spyOn(Storage.prototype, 'setItem');
    Storage.prototype.setItem = jest.fn();

    expect(await screen.findByText('Chicken Handi')).toBeInTheDocument()
    const imgFav = screen.getByRole('img', {  name: /favorite icon/i})
    expect(imgFav.src).toBe('http://localhost/whiteHeartIcon.svg')
    userEvent.click(imgFav)
    expect(imgFav.src).toBe('http://localhost/blackHeartIcon.svg')
    expect(localStorage.setItem).toBeCalled()    
    const favoriteRecipeObj = createFavoriteRecipeObject(favMeal, 'foods');

    expect(localStorage.setItem).toHaveBeenCalledWith('favoriteRecipes', JSON.stringify([favoriteRecipeObj])) 

  })
});
