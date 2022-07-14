import React from 'react';
import PropTypes from 'prop-types';
import './Header.css';
import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';

export default function Header({ title }) {
  return (
    <header>
      <img src={ profileIcon } alt="profile icon" data-testid="profile-top-btn" />
      <h1 data-testid="page-title">{ title }</h1>
      <img src={ searchIcon } alt="profile icon" data-testid="search-top-btn" />
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};
