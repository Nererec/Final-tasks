/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from 'react';
import './PublicationCard.css';
import { parseAPIResponse } from '../../utils/parseAPIResponse';
import { formatDate } from '../../utils/formatDate ';

function PublicationCard({
  date,
  source,
  title,
  contentMarkup,
  wordCount,
  url,
  isTechNews,
  isAnnouncement,
  isDigest,
}) {
  const { textContent, imageUrl } = parseAPIResponse(contentMarkup);

  const getTag = () => {
    if (isTechNews) return 'Технические новости';
    if (isAnnouncement) return 'Анонсы и события';
    if (isDigest) return 'Сводки новостей';
    return null;
  };

  return (
    <div className="publication-card">
      <div className="publication-card__header">
        <span className="publication-card__date">{formatDate(date)}</span>
        <span className="publication-card__source">{source}</span>
      </div>
      <h3 className="publication-card__title">{title}</h3>
      {getTag() && <span className="publication-card__tag">{getTag()}</span>}
      {imageUrl && (
        <img
          src={imageUrl}
          alt={title}
          className="publication-card__image"
        />
      )}
      <p className="publication-card__content">{textContent}</p>
      <div className="publication-card__footer">
        <a
          href={url || '#'}
          target="_blank"
          rel="noopener noreferrer"
          className={`publication-card__button ${!url ? 'publication-card__button--disabled' : ''}`}
        >
          Читать в источнике
        </a>
        <span className="publication-card__word-count">{wordCount} слова</span>
      </div>
    </div>
  );
}

export default PublicationCard;
