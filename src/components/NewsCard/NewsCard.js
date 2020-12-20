import React from 'react';
import './NewsCard.css';

function NewsCard({
  isCardInMain,
  isUserLoggedIn,
  card: { title, text, date, source, link, image, keyword, saved },
}) {
  function handleBtnClick(e) {
    e.preventDefault();
  }

  return (
    <a href={link} target="_blank" rel="noreferrer" className="news-card">
      <img className="news-card__img" src={image} alt={title} />
      {isCardInMain ? (
        <>
          <button
            onClick={handleBtnClick}
            className={`news-card__btn news-card__btn_icon_${
              saved ? 'blue-' : ''
            }bookmark`}
          ></button>
          <span
            className={`news-card__btn-tooltip ${
              isUserLoggedIn && 'news-card__btn-tooltip_hidden'
            }`}
          >
            Sign in to save articles
          </span>
        </>
      ) : (
        <>
          <span className="news-card__keyword">{keyword}</span>
          <button
            onClick={handleBtnClick}
            className="news-card__btn news-card__btn_icon_trash"
          ></button>
          <span className="news-card__btn-tooltip">Remove from saved</span>
        </>
      )}
      <p className="news-card__date">{date}</p>
      <h3 className="news-card__title">{title}</h3>
      <p className="news-card__text">{text}</p>
      <p className="news-card__source">{source}</p>
    </a>
  );
}

export default NewsCard;
