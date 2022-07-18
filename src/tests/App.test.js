import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';

describe('Testes de Componentes e Funções não específicos', () => {
  test('Testes barra de categorias Foods', async () => {
    renderWithRouter('/foods');

    expect(await screen.findByTestId('Dessert-category-filter')).toBeInTheDocument();

    userEvent.click(await screen.findByTestId('Dessert-category-filter'));

    expect(await screen.findByText(/apam balik/i)).toBeInTheDocument();
  });

  test('Testes barra de categorias Drinks', async () => {
    renderWithRouter('/drinks');

    expect(await screen.findByTestId('Shake-category-filter')).toBeInTheDocument();

    userEvent.click(await screen.findByTestId('Shake-category-filter'));

    expect(await screen.findByText(/151 florida bushwacker/i)).toBeInTheDocument();
  });
})

