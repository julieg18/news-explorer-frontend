import React, { useContext } from 'react';
import Navigation from '../Navigation/Navigation';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import './SavedNewsHeader.css';

function SavedNewsHeader({ isUserLoggedIn, onLogoutUser, articles }) {
  const { name } = useContext(CurrentUserContext);

  function getKeywords() {
    const keywordAmounts = {};
    const keywords = [];

    articles.forEach(({ keyword }) => {
      const k = keyword.toLowerCase();
      keywordAmounts[k] =
        typeof keywordAmounts[k] === 'number' ? keywordAmounts[k] + 1 : 0;
      if (!keywords.includes(k)) {
        keywords.push(k);
      }
    });

    keywords.sort(
      (keyword) => keywordAmounts[keyword] - keywordAmounts[keyword],
    );
    return keywords;
  }

  function getKeywordsStatement(keywords) {
    const getSpan = (k) => (
      <span className="saved-news-header__keyword">{k}</span>
    );
    switch (keywords.length) {
      case 1:
        return getSpan(keywords[0]);
      case 2:
        return (
          <>
            {getSpan(keywords[0])} and {getSpan(keywords[1])}
          </>
        );
      case 3:
        return (
          <>
            {getSpan(keywords[0])}, {getSpan(keywords[1])}, and{' '}
            {getSpan(keywords[2])}
          </>
        );
      default:
        return (
          <>
            {getSpan(keywords[0])}, {getSpan(keywords[1])}, and{' '}
            {keywords.length - 2} others
          </>
        );
    }
  }

  return (
    <>
      <Navigation
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
              {getKeywordsStatement(getKeywords())}
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
