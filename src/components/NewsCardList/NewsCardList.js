import React from 'react';
import NewsCard from '../NewsCard/NewsCard';
import './NewsCardList.css';

function NewsCardList({ articles, areCardsInMain, isUserLoggedIn }) {
  console.log(articles);
  return articles.length > 0 ? (
    <ul className="news-card-list">
      {articles.map(
        ({
          title,
          url,
          description: text,
          publishedAt: date,
          source,
          url: link,
          urlToImage: image,
        }) => (
          <li key={url} className="news-card-list__card">
            <NewsCard
              isCardInMain={areCardsInMain}
              article={{ title, text, date, source: source.name, link, image }}
              isUserLoggedIn={isUserLoggedIn}
            />
          </li>
        ),
      )}
    </ul>
  ) : (
    ''
  );
}

export default NewsCardList;
