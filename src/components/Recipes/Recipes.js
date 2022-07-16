import React from 'react';
import PropTypes from 'prop-types';

export default function Recipes({ children }) {
  return (
    <div className="recipes-container">
      { children }
    </div>
  );
}

Recipes.propTypes = {
  children: PropTypes.node,
};

Recipes.defaultProps = {
  children: null,
};
