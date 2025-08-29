/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo_white.svg';

import './MobileMenu.css';

function MobileMenu({ isMenuOpen, setMenuOpen, isAuthenticated, navigate, onLogout }) {
  if (!isMenuOpen) return null;

  return ReactDOM.createPortal(
    <div className="mobile-menu">
      <img className="mobile-menu__logo" src={logo} alt="СКАН" />
      <div className="mobile-menu__close" onClick={() => setMenuOpen(false)}>
        &times;
      </div>
      <nav className="mobile-menu__nav">
        <Link to="/" onClick={() => setMenuOpen(false)}>
          Главная
        </Link>
        <Link to="/tariffs" onClick={() => setMenuOpen(false)}>
          Тарифы
        </Link>
        <Link to="/faq" onClick={() => setMenuOpen(false)}>
          FAQ
        </Link>
        {!isAuthenticated && (
          <>
            <Link to="/register" className="mobile-menu__register" onClick={() => setMenuOpen(false)}>
              Зарегистрироваться
            </Link>
            <button
              className="mobile-menu__login"
              onClick={() => {
                setMenuOpen(false);
                navigate('/login');
              }}
            >
              Войти
            </button>
          </>
        )}
      </nav>
      {isAuthenticated && (
        <button
          className="mobile-menu__logout"
          onClick={() => {
            onLogout(); 
            setMenuOpen(false); 
          }}
        >
          Выйти
        </button>
      )}
    </div>,
    document.body
  );
}

export default MobileMenu;
