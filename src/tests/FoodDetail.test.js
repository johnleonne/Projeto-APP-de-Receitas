import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';

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

  it('Testa a funcionalidade do botão "Iniciar Receita"',async () => {
    const { history } = renderWithRouter('/foods/52795');

    jest.spyOn(Storage.prototype, 'setItem');
    Storage.prototype.setItem = jest.fn();

    userEvent.click(await screen.findByTestId('start-recipe-btn'));

    expect(await screen.findByRole('heading',{ name: /Food in progress details page/i})).toBeInTheDocument();
  
    const favoriteRecipeObj = createFavoriteRecipeObj(favMeal, 'meal');
    expect(localStorage.setItem).toHaveBeenNthCalledWith('favoriteRecipes', JSON.stringify([favoriteRecipeObj]));

  })
});
