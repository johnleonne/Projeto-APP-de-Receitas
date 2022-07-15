import React from 'react';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RecipeCard from '../components/RecipeCard';
import { drinkResponseById } from './Mocks/Drink';

describe('RecipeCard Test', () => {
    it('teste', () => {
        render(<RecipeCard recipe={ drinkResponseById.drinks[0] } index={ 0 } />);

        expect(screen.getByRole('heading', { level: 3, name: 'Addison' }))
        
    })
})