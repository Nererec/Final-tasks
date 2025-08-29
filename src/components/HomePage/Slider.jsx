// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import './Slider.css';
import iconTime from '../../assets/home/icon_time.svg';
import iconProtect from '../../assets/home/icon_protect.svg';
import iconFind from '../../assets/home/icon_find.svg';
import arrowIcon from '../../assets/icon_arrow.svg';

const cardData = [
  {
    id: 1,
    icon: iconTime,
    title: 'Высокая и оперативная скорость обработки заявки',
  },
  {
    id: 2,
    icon: iconFind,
    title: 'Огромная комплексная база данных, обеспечивающая объективный ответ на запрос',
  },
  {
    id: 3,
    icon: iconProtect,
    title: 'Защита конфиденциальных сведений, не подлежащих разглашению по федеральному законодательству',
  },
  {
    id: 4,
    icon: iconTime,
    title: 'Удобный интерфейс для поиска и анализа данных',
  },
  {
    id: 5,
    icon: iconFind,
    title: 'Обновляемая база данных, доступная в любое время',
  },
  {
    id: 6,
    icon: iconProtect,
    title: 'Широкие возможности для интеграции с другими сервисами',
  },
];

function Slider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 1 < cardData.length ? prevIndex + 1 : 0
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - 1 >= 0 ? prevIndex - 1 : cardData.length - 1
    );
  };

  const visibleCards = window.innerWidth <= 910 ? 1 : window.innerWidth <= 1340 ? 2 : 3;

  const displayedCards = cardData.slice(
    currentIndex,
    currentIndex + visibleCards
  );

  if (displayedCards.length < visibleCards) {
    displayedCards.push(...cardData.slice(0, visibleCards - displayedCards.length));
  }

  return (
    <section className="slider">
      <h2 className="slider__title">ПОЧЕМУ ИМЕННО МЫ</h2>
      <div className="slider__container">
        <button className="slider__arrow slider__arrow--left" onClick={handlePrev}>
          <img src={arrowIcon} alt="Previous" style={{ transform: 'rotate(180deg)' }} />
        </button>
        <div className="slider__cards">
          {displayedCards.map((card) => (
            <div key={card.id} className="slider__card">
              <img src={card.icon} alt="icon" className="slider__card-icon" />
              <p className="slider__card-title">{card.title}</p>
            </div>
          ))}
        </div>
        <button className="slider__arrow slider__arrow--right" onClick={handleNext}>
          <img src={arrowIcon} alt="Next" />
        </button>
      </div>
    </section>
  );
}

export default Slider;
