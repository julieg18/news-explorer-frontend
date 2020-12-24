import React from 'react';
import Navigation from '../Navigation/Navigation';
import SearchForm from '../SearchForm/SearchForm';
import './Header.css';

function Header({ isPopupOpen }) {
  return (
    <header className="header">
      <Navigation isPopupOpen={isPopupOpen} />
      <h2 className="header__title">What's going on in the world?</h2>
      <p className="header__text">
        Find the latest news on any topic and save them in your personal
        account.
      </p>
      <SearchForm />
    </header>
  );
}

export default Header;
