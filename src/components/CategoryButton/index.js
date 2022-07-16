import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { FoodsContext } from '../../context/FoodContext';

export default function CategoryButton({ name }) {
  const { saveCategory, category } = useContext(FoodsContext);

  return (
    <button
      type="button"
      data-testid={ `${name}-category-filter` }
      onClick={ () => (category !== name ? saveCategory(name) : saveCategory('All')) }
    >
      { name }
    </button>
  );
}

CategoryButton.propTypes = {
  name: PropTypes.string.isRequired,
};
