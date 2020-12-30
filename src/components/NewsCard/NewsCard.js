import React from 'react';
import './NewsCard.css';

function NewsCard({
  isCardInMain,
  isUserLoggedIn,
  article: { _id, title, text, date, source, link, image, keyword, saved },
  onSaveArticle,
  onDeleteArticle,
}) {
  function handleSaveBtnClick(e) {
    e.preventDefault();
    if (!saved && isUserLoggedIn) {
      onSaveArticle({
        title,
        text,
        date: new Date(date),
        source,
        link,
        image,
      });
    }
  }

  function handleDeleteBtnClick(e) {
    e.preventDefault();
    onDeleteArticle(_id);
  }

  return (
    <a href={link} target="_blank" rel="noreferrer" className="news-card">
      <img className="news-card__img" src={image} alt={title} />
      {isCardInMain ? (
        <>
          <button
            onClick={handleSaveBtnClick}
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
            onClick={handleDeleteBtnClick}
            className="news-card__btn news-card__btn_icon_trash"
          ></button>
          <span className="news-card__btn-tooltip">Remove from saved</span>
        </>
      )}
      <p className="news-card__date">
        {new Date(date).toLocaleDateString('en-US', { dateStyle: 'long' })}
      </p>
      <h3 className="news-card__title">{title}</h3>
      <p className="news-card__text">{text}</p>
      <p className="news-card__source">{source}</p>
    </a>
  );
}

export default NewsCard;
