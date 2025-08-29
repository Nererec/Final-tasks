// eslint-disable-next-line no-unused-vars
import React from 'react';
import './SearchHeader.css';

function SearchHeader() {
  return (
    <div className="search-header">
      <h1 className="search-header__title">Найдите необходимые данные в пару кликов.</h1>
      <p className="search-header__subtitle">
      Задайте параметры поиска. Чем больше заполните, тем точнее поиск.
      </p>
    </div>
  );
}

export default SearchHeader;

