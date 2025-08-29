/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import './DocumentList.css';
import PublicationCard from './PublicationCard';

function DocumentList({ documents, onLoadMore, hasMoreDocuments }) {
  if (!Array.isArray(documents) || documents.length === 0) {
    return <div className="document-list__empty">Документы не найдены.</div>;
  }

  return (
    <div className="document-list">
      <h2 className="document-list__title">Список документов</h2>
      <div className="document-list__container">
        {documents.map((doc, index) => (
          <PublicationCard
            key={doc.id || index}
            date={doc.issueDate || 'Дата не указана'}
            source={doc.source?.name || 'Источник неизвестен'}
            title={doc.title?.text || 'Без заголовка'}
            contentMarkup={doc.content?.markup || ''}
            image={
              doc.content?.markup?.includes('img src="')
                ? doc.content.markup.match(/img src="([^"]+)"/)?.[1]
                : null
            }
            wordCount={doc.attributes?.wordCount || 0}
            url={doc.url || '#'}
            isTechNews={doc.attributes?.isTechNews || false}
            isAnnouncement={doc.attributes?.isAnnouncement || false}
            isDigest={doc.attributes?.isDigest || false}
          />
        ))}
      </div>

      {onLoadMore && (
        <button
          className="document-list__load-more"
          onClick={onLoadMore}
          disabled={!hasMoreDocuments} 
        >
          {hasMoreDocuments ? 'Показать больше' : 'Больше документов нет'}
        </button>
      )}
    </div>
  );
}

export default DocumentList;

