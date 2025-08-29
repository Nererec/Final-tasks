// eslint-disable-next-line no-unused-vars
import React from 'react';
import logo from '../../assets/logo_white.svg'; 
import './footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__content">
        <img src={logo} alt="СКАН" />
        <div className="footer__info">
          <p>г. Москва, Цветной б-р, 40</p>
          <p>+7 495 771 21 11</p>
          <p>info@skan.ru</p>
          <p className="footer_copyright">Copyright. 2025</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer; 
