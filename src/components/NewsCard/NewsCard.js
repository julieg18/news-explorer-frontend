import React from 'react';
import './NewsCard.css';

function NewsCard({ card: { title, text, date, source, link, image } }) {
  return (
    <a href={link} target="_blank" rel="noreferrer" className="news-card">
      <img className="news-card__img" src={image} alt={title} />
      <button className="news-card__save-btn"></button>
      <p className="news-card__date">{date}</p>
      <h3 className="news-card__title">{title}</h3>
      <p className="news-card__text">{text}</p>
      <p className="news-card__source">{source}</p>
    </a>
  );
}

export default NewsCard;
