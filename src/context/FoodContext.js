import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const FoodsContext = createContext();

export default function FoodProvider({ children }) {
  const [currentFilter, setCurrentFilter] = useState({
    type: '',
    searchParam: '',
  });

  const [recipes, setRecipes] = useState([]);

  const initialValue = {
    currentFilter,
    recipes,
    handleChangeFilter: (filter) => setCurrentFilter(filter),
    saveRecipes: (data) => setRecipes(data),
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
