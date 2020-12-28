import React from 'react';
import Navigation from '../Navigation/Navigation';
import SearchForm from '../SearchForm/SearchForm';
import './Header.css';

function Header({
  isPopupOpen,
  onSigninLinkClick,
  isUserLoggedIn,
  onNewsSearch,
}) {
  return (
    <header className="header">
      <Navigation
        isUserLoggedIn={isUserLoggedIn}
        isPopupOpen={isPopupOpen}
        onSigninLinkClick={onSigninLinkClick}
      />
      <h2 className="header__title">What's going on in the world?</h2>
      <p className="header__text">
        Find the latest news on any topic and save them in your personal
        account.
      </p>
      <SearchForm onNewsSearch={onNewsSearch} />
    </header>
  );
}

export default Header;
