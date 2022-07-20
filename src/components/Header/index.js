import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { FaRegUser } from 'react-icons/fa';
import { BiSearchAlt2 } from 'react-icons/bi';
import SearchBar from '../SearchBar/SearchBar';
import { HeaderContainer, HeaderIconsContainer } from './styles';

export default function Header({ title, haveSearch }) {
  const history = useHistory();
  const [isSearchInputVisible, setIsSearchInputVisible] = useState(true);

  function handleProfileClick() {
    history.push('/profile');
  }

  return (
    <HeaderContainer data-testid="header" isSearchInputVisible={ isSearchInputVisible }>
      <HeaderIconsContainer>
        <FaRegUser
          color="#fff"
          role="button"
          size={ 30 }
          className="header-icon"
          alt="profile icon"
          data-testid="profile-top-btn"
          onClick={ () => handleProfileClick() }
        />
        <h1 data-testid="page-title">{ title }</h1>
        { haveSearch && (
          <BiSearchAlt2
            color="#fff"
            role="button"
            className="header-icon"
            size={ 35 }
            onClick={ () => setIsSearchInputVisible((prevState) => !prevState) }
            alt="profile icon"
            data-testid="search-top-btn"
          />
        )}
      </HeaderIconsContainer>
      { haveSearch && (
        <div className="header-input-container">
          <SearchBar visible={ isSearchInputVisible } />
        </div>
      )}
    </HeaderContainer>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  haveSearch: PropTypes.bool,
};

Header.defaultProps = {
  haveSearch: false,
};
