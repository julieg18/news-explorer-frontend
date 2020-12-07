import React from 'react';
import Navigation from '../Navigation/Navigation';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <Navigation />
      <h2 class="header__title">What's going on in the world?</h2>
      <p class="header__text">
        Find the latest news on any topic and save them in your personal
        account.
      </p>
    </header>
  );
}

export default Header;
