// eslint-disable-next-line no-unused-vars
import React from 'react';
import './TariffCards.css';
import { useSelector } from 'react-redux';
import { tariffs } from "../../assets/home/tariff";

function TariffCards() {
  const user = useSelector((state) => state.auth.user);

  return (
    <section className="tariffs">
      <h2 className="tariffs__title">НАШИ ТАРИФЫ</h2>
      <div className="tariffs__cards">
        {tariffs.map((tariff, index) => {
        
          const isCurrent = user && index === 0;

          return (
            <div
              key={tariff.id}
              className={`tariffs__card ${isCurrent ? 'tariffs__card--current' : ''}`}
              style={{
                borderColor: isCurrent ? tariff.color : 'transparent',
              }}
            >
              <div
                className="tariffs__card-header"
                style={{ backgroundColor: tariff.color }}
              >
                <div className="tariffs__card-text">
                  <p className={`tariffs__card-title ${tariff.id === 3 ? 'tariffs__card-title--white' : ''}`}>
                    {tariff.title}
                  </p>
                  <span className={`tariffs__card-description ${tariff.id === 3 ? 'tariffs__card-description--white' : ''}`}>
                    {tariff.description}
                  </span>
                </div>
                <img src={tariff.icon} alt="icon" className="tariffs__card-icon" />
              </div>
              <div className="tafiff__card-content">
                {isCurrent && <div className="tariffs__badge">Текущий тариф</div>}
                <div className="tariff__card-tariff">
                  <p className="tariffs__card-price">
                    {tariff.price}{' '}
                    <span className="tariffs__card-old-price">{tariff.oldPrice}</span>
                  </p>
                  <p className="tariffs__card-monthly">{tariff.monthly}</p>
                </div>
                <p className="tariffs__card-include">В тариф входит</p>
                <ul className="tariffs__card-benefits">
                  {tariff.benefits.map((benefit, index) => (
                    <li key={index} className="tariffs__card-benefit">
                      ✔ {benefit}
                    </li>
                  ))}
                </ul>
                <button className="tariffs__card-button">
                  {isCurrent ? 'Перейти в личный кабинет' : 'Подробнее'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default TariffCards;
