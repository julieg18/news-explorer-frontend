import React, { useEffect, useState } from 'react';
import NewsCardList from '../NewsCardList/NewsCardList';
import About from '../About/About';
import Button from '../Button/Button';
import Preloader from '../Preloader/Preloader';
import './Main.css';

function Main({
  articles,
  isUserLoggedIn,
  showSearchResults,
  areCardsLoading,
  showSearchResultsError,
}) {
  const [displayedArticles, setDisplayedArticles] = useState(
    articles.slice(0, 3),
  );

  useEffect(() => {
    setDisplayedArticles(articles.slice(0, 3));
  }, [articles]);

  function increaseDisplayedArticles() {
    setDisplayedArticles(articles.slice(0, displayedArticles.length + 3));
  }

  return (
    <main>
      {showSearchResults ? (
        <section className="search-results">
          {showSearchResultsError ? (
            <>
              <p className="search-results__text">
                Sorry, something went wrong during the request. There may be a
                connection issue or the server may be down. Please try again
                later.
              </p>
            </>
          ) : areCardsLoading ? (
            <>
              <div className="search-results__preloader">
                <Preloader />
              </div>
              <p className="search-results__text search-results__preloader-text">
                Searching for news...
              </p>
            </>
          ) : articles.length === 0 ? (
            <>
              <div className="search-results__not-found-icon"></div>
              <h2 className="search-results__not-found-title">Nothing found</h2>
              <p className="search-results__text search-results__not-found-text">
                Sorry, but nothing matched your search terms.
              </p>
            </>
          ) : (
            <>
              <h2 className="search-results__title">Search Results</h2>
              <NewsCardList
                areCardsInMain
                articles={displayedArticles}
                isUserLoggedIn={isUserLoggedIn}
              />
              {displayedArticles.length < articles.length ? (
                <Button
                  lightTheme
                  additionalClasses="search-results__show-more-btn"
                  onClick={increaseDisplayedArticles}
                >
                  Show More
                </Button>
              ) : (
                ''
              )}
            </>
          )}
        </section>
      ) : (
        ''
      )}
      <About />
    </main>
  );
}

export default Main;
