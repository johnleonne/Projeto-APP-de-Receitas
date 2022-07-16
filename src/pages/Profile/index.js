import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer/Footer';

export default function Profile() {
  return (
    <main className="profile-page-container">
      <Header title="Profile" />
      <h1>Profile page</h1>
      <Footer />
    </main>
  );
}
