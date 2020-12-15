import React from 'react';
import NewsCardList from '../NewsCardList/NewsCardList';
import About from '../About/About';
import Button from '../Button/Button';
import './Main.css';

function Main() {
  return (
    <main>
      <section className="search-results">
        <h2 className="search-results__title">Search Results</h2>
        <NewsCardList />
        <Button lightTheme additionalClasses="search-results__show-more-btn">
          Show More
        </Button>
      </section>
      <About />
    </main>
  );
}

export default Main;
