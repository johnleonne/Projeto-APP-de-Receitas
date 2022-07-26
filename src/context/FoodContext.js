import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const FoodsContext = createContext();

export default function FoodProvider({ children }) {
  const [currentFilter, setCurrentFilter] = useState({
    type: '',
    searchParam: '',
  });
  const [recipes, setRecipes] = useState([]);
  const [category, setCategory] = useState('All');

  const initialValue = {
    currentFilter,
    recipes,
    category,
    handleChangeFilter: (filter) => setCurrentFilter(filter),
    saveRecipes: (data) => setRecipes(data),
    saveCategory: (categoryName) => setCategory(categoryName),
  };

  return (
    <FoodsContext.Provider value={ initialValue }>
      { children }
    </FoodsContext.Provider>
  );
}

FoodProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
