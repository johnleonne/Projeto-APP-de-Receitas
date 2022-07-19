import React from 'react';
import { cleanup, fireEvent, screen } from '@testing-library/react';
import renderWithRouter from './helpers/renderWithRouter'
import userEvent from '@testing-library/user-event';


describe('Testes para a página de DrinkProgessDetail', () => {
  it('Verifica se a pagina renderiza os itens de forma correta', async () => {
    const { history } = renderWithRouter('/drinks/17228/in-progress')
    expect(screen.queryByTestId('header')).toBeFalsy();
    expect(screen.queryByTestId('profile-top-btn')).toBeFalsy();
    expect(screen.queryByTestId('search-top-btn')).toBeFalsy();
    const title = await screen.findByRole('heading', {  name: /addison/i})
    expect(title).toBeInTheDocument()
    const ingredient1 = screen.getByRole('checkbox', {  name: /gin/i})
    const ingredient2 = screen.getByRole('checkbox', {  name: /vermouth/i})
    const finishButton = screen.getByRole('button', {  name: /finish recipe/i})
    expect(finishButton.disabled).toBeTruthy()
    expect(ingredient1.checked).toBe(false)
    expect(ingredient1.parentNode.className).toBe('')
    userEvent.click(ingredient1)
    expect(ingredient1.checked).toBe(true)
    expect(ingredient1.parentNode.className).toBe('checked')
    userEvent.click(ingredient1)
    expect(ingredient1.parentNode.className).toBe('')
    userEvent.click(ingredient1)
    userEvent.click(ingredient2)
    expect(ingredient2.checked).toBe(true)
    // expect(finishButton.disabled).toBeFalse()
    userEvent.click(finishButton)
    expect(history.location.pathname).toBe('/done-recipes')
    expect(await screen.findByText(/addison/i)).toBeInTheDocument()
    expect(screen.getByRole('img', {  name: /share/i})).toBeInTheDocument()
    Object.assign(window.navigator, {
      clipboard: {
        writeText: jest.fn().mockImplementation(() => Promise.resolve()),
      },
    });
    userEvent.click(screen.getByRole('img', {  name: /share/i}))
    expect(screen.getByText(/link copied!/i)).toBeInTheDocument()
    userEvent.click(screen.getByRole('button', {  name: /foods/i}))
    jest.fn(cleanup)
  });
});
