// eslint-disable-next-line no-unused-vars
import React from 'react';
import image_mobile from '../../assets/login/login_characters.png';
import './MobileLoginImage.css';

function MobileLoginImage() {
  return (
    <div className="mobile-login-image">
      <img src={image_mobile} alt="Картинка для авторизации" />
    </div>
  );
}

export default MobileLoginImage;
