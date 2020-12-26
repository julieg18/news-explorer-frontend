import React, { useState } from 'react';
import NewsCardList from '../NewsCardList/NewsCardList';
import About from '../About/About';
import Button from '../Button/Button';
import Preloader from '../Preloader/Preloader';
import './Main.css';

function Main({ cards, isUserLoggedIn }) {
  const [isLoading] = useState(false);

  return (
    <main>
      <section className="search-results">
        <h2 className="search-results__title">Search Results</h2>
        {!isLoading && cards.length === 0 ? (
          <p className="search-results__no-results-text">No results found</p>
        ) : (
          <>
            <NewsCardList
              areCardsInMain
              cards={cards}
              isUserLoggedIn={isUserLoggedIn}
            />
            {isLoading ? (
              <div className="search-results__preloader">
                <Preloader />
              </div>
            ) : (
              <Button
                lightTheme
                additionalClasses="search-results__show-more-btn"
              >
                Show More
              </Button>
            )}
          </>
        )}
      </section>
      <About />
    </main>
  );
}

export default Main;
