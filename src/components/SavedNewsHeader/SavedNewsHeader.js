import React, { useContext } from 'react';
import Navigation from '../Navigation/Navigation';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import './SavedNewsHeader.css';

function SavedNewsHeader({ isUserLoggedIn, onLogoutUser, articles }) {
  const { name } = useContext(CurrentUserContext);

  return (
    <>
      <Navigation
        onSigninLinkClick={() => {}}
        isUserLoggedIn={isUserLoggedIn}
        lightTheme
        onLogoutUser={onLogoutUser}
      />
      <header className="saved-news-header">
        <h1 className="saved-news-header__heading">Saved articles</h1>
        <p className="saved-news-header__text">
          {name}, you have {articles.length} saved articles
        </p>
        {articles.length > 0 ? (
          <p className="saved-news-header__keywords">
            By keywords:{' '}
            <span className="saved-news-header__bold-text">
              Nature, Yellowstone, and 2 other
            </span>
          </p>
        ) : (
          ''
        )}
      </header>
    </>
  );
}

export default SavedNewsHeader;
