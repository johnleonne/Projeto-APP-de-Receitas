import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { FoodsContext } from '../../context/FoodContext';
import CategoryButtonStyles from './styles';

export default function CategoryButton({ name }) {
  const { saveCategory, category } = useContext(FoodsContext);

  return (
    <CategoryButtonStyles
      type="button"
      data-testid={ `${name}-category-filter` }
      onClick={ () => (category !== name ? saveCategory(name) : saveCategory('All')) }
      active={ category === name }
      nameLength={ name.length }
    >
      { name }
    </CategoryButtonStyles>
  );
}

CategoryButton.propTypes = {
  name: PropTypes.string.isRequired,
};
