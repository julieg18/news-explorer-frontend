import React from 'react';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
import NewsCardList from '../NewsCardList/NewsCardList';
import './SavedNews.css';

function SavedNews({ isUserLoggedIn, cards }) {
  return (
    <>
      <SavedNewsHeader />
      <section className="saved-news">
        <NewsCardList isUserLoggedIn={isUserLoggedIn} cards={cards} />
      </section>
    </>
  );
}

export default SavedNews;
