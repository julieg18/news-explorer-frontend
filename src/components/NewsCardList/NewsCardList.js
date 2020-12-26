import React from 'react';
import NewsCard from '../NewsCard/NewsCard';
import './NewsCardList.css';

function NewsCardList({ cards, areCardsInMain, isUserLoggedIn }) {
  return cards.length > 0 ? (
    <ul className="news-card-list">
      {cards.map((card) => (
        <li key={card.id} className="news-card-list__card">
          <NewsCard
            isCardInMain={areCardsInMain}
            card={card}
            isUserLoggedIn={isUserLoggedIn}
          />
        </li>
      ))}
    </ul>
  ) : (
    ''
  );
}

export default NewsCardList;
