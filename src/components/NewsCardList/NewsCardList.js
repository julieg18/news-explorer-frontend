import React from 'react';
import NewsCard from '../NewsCard/NewsCard';
import './NewsCardList.css';

function NewsCardList({
  articles,
  areCardsInMain,
  isUserLoggedIn,
  onSaveArticle,
  onDeleteArticle,
  onOpenSignupPopup,
}) {
  return articles.length > 0 ? (
    <ul className="news-card-list">
      {articles.map((article) => (
        <li key={article.link} className="news-card-list__card">
          <NewsCard
            onOpenSignupPopup={onOpenSignupPopup}
            onSaveArticle={onSaveArticle}
            isCardInMain={areCardsInMain}
            article={article}
            isUserLoggedIn={isUserLoggedIn}
            onDeleteArticle={onDeleteArticle}
          />
        </li>
      ))}
    </ul>
  ) : (
    ''
  );
}

export default NewsCardList;
