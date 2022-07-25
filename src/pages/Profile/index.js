import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import * as Styles from './styles';

export default function Profile() {
  const [email, setEmail] = useState('');
  const history = useHistory();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setEmail(user.email);
    }
  }, []);

  function goHome() {
    localStorage.clear();
    history.push('/');
  }

  return (
    <Styles.ProfilePageContainer
      initial={{ opacity: 0, width: 0 }}
      animate={{ opacity: 1, width: '100%', transition: { duration: 0.3 } }}
      exit={{ opacity: 0, x: '100%', transition: { duration: 0.4 } }}
    >
      <Header title="Profile" />

      <Styles.ProfileContentContainer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.1 } }}
      >
        <p data-testid="profile-email" className="user-email">{email}</p>

        <Styles.ProfileButtonsContainer>
          <button
            onClick={ () => history.push('/done-recipes') }
            data-testid="profile-done-btn"
            type="button"
          >
            Done Recipes
          </button>
          <button
            onClick={ () => history.push('/favorite-recipes') }
            data-testid="profile-favorite-btn"
            type="button"
          >
            Favorite Recipes

          </button>
          <button
            onClick={ goHome }
            data-testid="profile-logout-btn"
            type="button"
          >
            Logout
          </button>
        </Styles.ProfileButtonsContainer>
      </Styles.ProfileContentContainer>

      <Footer />
    </Styles.ProfilePageContainer>
  );
}
