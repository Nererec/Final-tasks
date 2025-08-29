/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, {useState} from 'react';
import './MobileSummaryCarousel.css';
import { formatDate } from '../../utils/formatDate ';
import arrowIcon from '../../assets/icon_arrow.svg';


function MobileSummaryCarousel({ histograms }) {
  const totalDocuments = histograms.find((item) => item.histogramType === 'totalDocuments')?.data || [];
  const riskFactors = histograms.find((item) => item.histogramType === 'riskFactors')?.data || [];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < totalDocuments.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <div className="mobile-summary-carousel">
      <div className="mobile-summary-carousel__header">
        <div className="mobile-summary-carousel__cell">Период</div>
        <div className="mobile-summary-carousel__cell">Всего</div>
        <div className="mobile-summary-carousel__cell">Риски</div>
      </div>

      <div className="mobile-summary-carousel__container">
        <button
          className="carousel__arrow carousel__arrow--left"
          onClick={handlePrev}
          disabled={currentIndex === 0}
        >
          <img src={arrowIcon} alt="Previous" style={{ transform: 'rotate(180deg)' }} />
        </button>

        <div className="mobile-summary-carousel__row">
          <div className="mobile-summary-carousel__cell">{formatDate(totalDocuments[currentIndex]?.date)}</div>
          <div className="mobile-summary-carousel__cell">{totalDocuments[currentIndex]?.value}</div>
          <div className="mobile-summary-carousel__cell">{riskFactors[currentIndex]?.value || 0}</div>
        </div>

        <button
          className="carousel__arrow carousel__arrow--right"
          onClick={handleNext}
          disabled={currentIndex === totalDocuments.length - 1}
        >
          <img src={arrowIcon} alt="Next" />
        </button>
      </div>
    </div>
  );
}

export default MobileSummaryCarousel;
