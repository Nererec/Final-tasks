// eslint-disable-next-line no-unused-vars
import React from 'react';
import image from '../../assets/login/login_characters.png';
import './LoginImage.css';

function LoginImage() {
  return (
    <div className="login-image">
      <img src={image} alt="Авторизация" className="login-image__img" />
    </div>
  );
}

export default LoginImage;
