import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

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
    <main className="profile-page-container">
      <Header title="Profile" />
      <h1>Profile page</h1>
      <h3 data-testid="profile-email">{email}</h3>
      <div>
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
      </div>
      <Footer />
    </main>
  );
}
