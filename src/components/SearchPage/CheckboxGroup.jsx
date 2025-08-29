/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from 'react';
import './CheckboxGroup.css';

function CheckboxGroup({ formData, onChange }) {
  return (
    <div className="checkbox-group">
      <label className="checkbox-group__item">
        <input
          type="checkbox"
          name="maxFullness"
          checked={formData.maxFullness}
          onChange={onChange}
        />
        Признак максимальной полноты
      </label>
      <label className="checkbox-group__item">
        <input
          type="checkbox"
          name="nBusinessNews"
          checked={formData.nBusinessNews}
          onChange={onChange}
        />
        Упоминания в бизнес-контексте
      </label>
      <label className="checkbox-group__item">
        <input
          type="checkbox"
          name="onlyMainRole"
          checked={formData.onlyMainRole}
          onChange={onChange}
        />
        Главная роль в публикации
      </label>
      <label className="checkbox-group__item">
        <input
          type="checkbox"
          name="onlyWithRiskFactors"
          checked={formData.onlyWithRiskFactors}
          onChange={onChange}
        />
        Публикации только с риск-факторами
      </label>
      <label className="checkbox-group__item">
        <input
          type="checkbox"
          name="isTechNews"
          checked={formData.isTechNews}
          onChange={onChange}
        />
        Включать технические новости рынков
      </label>
      <label className="checkbox-group__item">
        <input
          type="checkbox"
          name="isAnnouncement"
          checked={formData.isAnnouncement}
          onChange={onChange}
        />
        Включать анонсы и календари
      </label>
      <label className="checkbox-group__item">
        <input
          type="checkbox"
          name="isDigest"
          checked={formData.isDigest}
          onChange={onChange}
        />
        Включать сводки новостей
      </label>
    </div>
  );
}

export default CheckboxGroup;
