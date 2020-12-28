import React, { useState } from 'react';
import NewsCardList from '../NewsCardList/NewsCardList';
import About from '../About/About';
import Button from '../Button/Button';
import Preloader from '../Preloader/Preloader';
import './Main.css';

function Main({ cards, isUserLoggedIn }) {
  const [isLoading] = useState(false);
  const [displayedCards] = useState(cards.slice(0, 3));

  return (
    <main>
      <section className="search-results">
        {isLoading ? (
          <>
            <div className="search-results__preloader">
              <Preloader />
            </div>
            <p className="search-results__preloader-text">
              Searching for news...
            </p>
          </>
        ) : cards.length === 0 ? (
          <>
            <div className="search-results__not-found-icon"></div>
            <h2 className="search-results__not-found-title">Nothing found</h2>
            <p className="search-results__not-found-text">
              Sorry, but nothing matched your search terms.
            </p>
          </>
        ) : (
          <>
            <h2 className="search-results__title">Search Results</h2>
            <NewsCardList
              areCardsInMain
              cards={displayedCards}
              isUserLoggedIn={isUserLoggedIn}
            />
            {displayedCards.length !== cards.length ? (
              <Button
                lightTheme
                additionalClasses="search-results__show-more-btn"
              >
                Show More
              </Button>
            ) : (
              ''
            )}
          </>
        )}
      </section>
      <About />
    </main>
  );
}

export default Main;
