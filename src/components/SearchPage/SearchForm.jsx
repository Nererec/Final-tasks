// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import './SearchForm.css';
import {
  validateINN,
  validateDocumentCount,
  validateDateRange,
} from '../../utils/validation';
import CheckboxGroup from './CheckboxGroup';

// eslint-disable-next-line react/prop-types
function SearchForm({ onSearch }) {
  const [formData, setFormData] = useState({
    inn: '',
    tone: 'Любая',
    documentCount: '',
    startDate: '',
    endDate: '',
    maxFullness: true, 
    nBusinessNews: true,
    onlyMainRole: true,
    onlyWithRiskFactors: false,
    isTechNews: false,
    isAnnouncement: true,
    isDigest: false,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setFormData({ ...formData, [name]: newValue });

    if (type !== 'checkbox') {
      let error = '';
      switch (name) {
        case 'inn':
          error = validateINN(value);
          break;
        case 'documentCount':
          error = validateDocumentCount(value);
          break;
        case 'startDate':
        case 'endDate':
          error = validateDateRange(
            name === 'startDate' ? value : formData.startDate,
            name === 'endDate' ? value : formData.endDate
          );
          break;
        default:
          break;
      }
      setErrors({ ...errors, [name]: error });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid()) {
      onSearch(formData);
    }
  };

  const isFormValid = () => {
    return (
      Object.values(errors).every((error) => error === '') &&
      formData.inn &&
      formData.documentCount &&
      formData.startDate &&
      formData.endDate
    );
  };

  return (
    <div className="search-form">
      <form className="search-form__form" onSubmit={handleSubmit}>
        <div className="search-form__left">
          <label className="search-form__label">
            ИНН компании *
            <input
              type="text"
              name="inn"
              className={`search-form__input ${
                errors.inn ? 'search-form__input--error' : ''
              }`}
              value={formData.inn}
              onChange={handleChange}
              placeholder="10 цифр"
            />
            {errors.inn && <span className="search-form__error">{errors.inn}</span>}
          </label>

          <label className="search-form__label">
            Тональность
            <select
              name="tone"
              className="search-form__input"
              value={formData.tone}
              onChange={handleChange}
            >
              <option value="Любая">Любая</option>
              <option value="Позитивная">Позитивная</option>
              <option value="Негативная">Негативная</option>
            </select>
          </label>

          <label className="search-form__label">
            Количество документов в выдаче *
            <input
              type="number"
              name="documentCount"
              className={`search-form__input ${
                errors.documentCount ? 'search-form__input--error' : ''
              }`}
              value={formData.documentCount}
              onChange={handleChange}
              placeholder="От 1 до 1000"
            />
            {errors.documentCount && (
              <span className="search-form__error">{errors.documentCount}</span>
            )}
          </label>

          <label className="search-form__label">
            Диапазон поиска *
            <div className="search-form__date-range">
              <input
                type="date"
                name="startDate"
                className={`search-form__input ${
                  errors.startDate ? 'search-form__input--error' : ''
                }`}
                value={formData.startDate}
                onChange={handleChange}
              />
              <input
                type="date"
                name="endDate"
                className={`search-form__input ${
                  errors.endDate ? 'search-form__input--error' : ''
                }`}
                value={formData.endDate}
                onChange={handleChange}
              />
            </div>
            {errors.startDate && (
              <span className="search-form__error">{errors.startDate}</span>
            )}
            {errors.endDate && (
              <span className="search-form__error">{errors.endDate}</span>
            )}
          </label>
        </div>

        <CheckboxGroup formData={formData} onChange={handleChange} />

        <div className="search-form__button-wrapper">
          <button
            type="submit"
            className={`search-form__button ${
              !isFormValid() ? 'search-form__button--disabled' : ''
            }`}
            disabled={!isFormValid()}
          >
            Поиск
          </button>
          <div className="search-form__obligatory">* Обязательные к заполнению поля</div>
        </div>

      </form>
    </div>
  );
}

export default SearchForm;
