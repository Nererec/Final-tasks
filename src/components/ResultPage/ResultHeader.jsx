// eslint-disable-next-line no-unused-vars
import React from 'react';
import './ResultHeader.css';
import result from '../../assets/result/result_1.png'

function ResultHeader() {
  return (
    <div className="result-header">
      <div>

      <h1 className="result-header__title">Ищем. Скоро будут результаты</h1>
      <p className="result-header__subtitle">
        Поиск может занять некоторое время, просим сохранить терпение.
      </p>
      </div>
      <div className="result-header__img"><img src={result} alt="поиск" /></div>
    </div>
  );
}

export default ResultHeader;
