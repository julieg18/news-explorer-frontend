import React from 'react';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
import NewsCardList from '../NewsCardList/NewsCardList';
import './SavedNews.css';

function SavedNews({
  isUserLoggedIn,
  articles,
  onLogoutUser,
  onDeleteArticle,
}) {
  return (
    <>
      <SavedNewsHeader
        isUserLoggedIn={isUserLoggedIn}
        onLogoutUser={onLogoutUser}
        articles={articles}
      />
      {articles.length > 0 ? (
        <section className="saved-news">
          <NewsCardList
            onDeleteArticle={onDeleteArticle}
            isUserLoggedIn={isUserLoggedIn}
            articles={articles}
          />
        </section>
      ) : (
        ''
      )}
    </>
  );
}

export default SavedNews;
