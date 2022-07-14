import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Header.css';
import { useHistory } from 'react-router-dom';
import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';
import SearchBar from '../SearchBar/SearchBar';

export default function Header({ title, haveSearch }) {
  const history = useHistory();
  const [isSearchInputVisible, setIsSearchInputVisible] = useState(false);

  function handleProfileClick() {
    history.push('/profile');
  }

  return (
    <header data-testid="header">
      <div className="header-icons-container">
        <button type="button" onClick={ handleProfileClick }>
          <img
            src={ profileIcon }
            alt="profile icon"
            data-testid="profile-top-btn"
          />
        </button>

        <h1 data-testid="page-title">{ title }</h1>
        { haveSearch && (
          <button
            type="button"
            onClick={ () => setIsSearchInputVisible((prevState) => !prevState) }
          >
            <img
              src={ searchIcon }
              alt="profile icon"
              data-testid="search-top-btn"
            />
          </button>
        )}
      </div>
      <div className="header-input-container">
        { isSearchInputVisible && <SearchBar />}
      </div>
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  haveSearch: PropTypes.bool,
};

Header.defaultProps = {
  haveSearch: false,
};
