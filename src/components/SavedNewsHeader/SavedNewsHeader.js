import React from 'react';
import Navigation from '../Navigation/Navigation';
import './SavedNewsHeader.css';

function SavedNewsHeader() {
  return (
    <>
      <Navigation lightTheme />
      <header class="saved-news-header">
        <h1 className="saved-news-header__heading">Saved articles</h1>
        <p className="saved-news-header__text">
          Elise, you have 5 saved articles
        </p>
        <p className="saved-news-header__keywords">
          By keywords:{' '}
          <span className="saved-news-header__bold-text">
            Nature, Yellowstone, and 2 other
          </span>
        </p>
      </header>
    </>
  );
}

export default SavedNewsHeader;
