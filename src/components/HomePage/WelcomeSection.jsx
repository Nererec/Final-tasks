// eslint-disable-next-line no-unused-vars
import React from 'react';
import { useSelector } from 'react-redux'; 
import { useNavigate } from 'react-router-dom'; 
import welcomeImage from '../../assets/home/home_1.png'; 
import './WelcomeSection.css'; 

function WelcomeSection() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated); 
  const navigate = useNavigate(); 

  return (
    <section className="welcome-section">
      {/* Текстовая часть */}
      <div className="welcome-section__content">
        <h1 className="welcome-section__title">
          СЕРВИС ПО ПОИСКУ ПУБЛИКАЦИЙ О КОМПАНИИ ПО ЕГО ИНН
        </h1>
        <p className="welcome-section__description">
          Комплексный анализ публикаций, получение данных в формате PDF на электронную почту.
        </p>
        {isAuthenticated && (
          <button
            className="welcome-section__button"
            onClick={() => navigate('/search')} 
          >
            Запросить данные
          </button>
        )}
      </div>
      <div className="welcome-section__image">
        <img src={welcomeImage} alt="Сервис по поиску публикаций" />
      </div>
    </section>
  );
}

export default WelcomeSection;
