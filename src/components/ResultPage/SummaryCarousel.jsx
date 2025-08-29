/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import './SummaryCarousel.css';
import { Loader } from '../common';
import { formatDate } from '../../utils/formatDate ';
import MobileSummaryCarousel from './MobileSummaryCarousel';
import arrowIcon from '../../assets/icon_arrow.svg';

function SummaryCarousel({ histograms, loading, error }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 420);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(calculateItemsPerPage());

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 420);
      setItemsPerPage(calculateItemsPerPage());
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  function calculateItemsPerPage() {
    const containerWidth = window.innerWidth-274;
    console.log ('containerWidth', containerWidth);
    const itemWidth = 142; 
    return Math.max(Math.floor(containerWidth / itemWidth), 1); 
  }

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div className="summary-carousel__error">{error}</div>;
  }

  if (isMobile) {
    return <MobileSummaryCarousel histograms={histograms} />;
  }

  const totalDocuments = histograms.find((item) => item.histogramType === 'totalDocuments')?.data || [];
  console.log('total documents', totalDocuments);
  const riskFactors = histograms.find((item) => item.histogramType === 'riskFactors')?.data || [];
  const totalPages = Math.ceil(totalDocuments.length / itemsPerPage);
  console.log('totalDocuments.length ', totalDocuments.length );
  console.log('totalPages', totalPages);
  const handlePrev = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, totalPages - 1));
  };

  const currentItems = totalDocuments.slice(
    currentIndex * itemsPerPage,
    currentIndex * itemsPerPage + itemsPerPage
  );

  const currentRiskItems = riskFactors.slice(
    currentIndex * itemsPerPage,
    currentIndex * itemsPerPage + itemsPerPage
  );

  return (
    <div className="summary-carousel">
      <h2 className="summary-carousel__title">Общая сводка</h2>
      <p className="summary-carousel__subtitle">
        Найдено {totalDocuments.reduce((sum, item) => sum + item.value, 0)} вариантов
      </p>

      <div className="summary-carousel__content">
        <button
          className="carousel__arrow carousel__arrow--left"
          onClick={handlePrev}
          disabled={currentIndex === 0}
        >
          <img src={arrowIcon} alt="Previous" style={{ transform: 'rotate(180deg)' }} />
        </button>

        <div className="summary-carousel__header">
          <div className="summary-carousel__header-item">Период</div>
          <div className="summary-carousel__header-item">Всего</div>
          <div className="summary-carousel__header-item">Риски</div>
        </div>

        <div className="summary-carousel__slider">
          {currentItems.map((item, index) => (
            <div key={index} className="summary-carousel__item">
              <div className="summary-carousel__date">{formatDate(item.date)}</div>
              <div className="summary-carousel__value">{item.value}</div>
              <div className="summary-carousel__value">
                {currentRiskItems[index] ? currentRiskItems[index].value : 0}
              </div>
            </div>
          ))}
        </div>

        <button
          className="carousel__arrow carousel__arrow--right"
          onClick={handleNext}
          disabled={currentIndex === totalPages - 1}
        >
          <img src={arrowIcon} alt="Next" />
        </button>
      </div>
    </div>
  );
}

export default SummaryCarousel;
