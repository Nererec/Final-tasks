// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchLimits } from '../../store/slices/limitsSlice';
import { logout } from '../../store/slices/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo_green.svg';
import avatar from '../../assets/avatar.png';
import menuicon from '../../assets/menu_icon.svg';
import { Loader } from '../common';
import MobileMenu from './MobileMenu'; 
import './header.css';

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMenuOpen, setMenuOpen] = useState(false);

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  const { data: companyLimits, loading } = useSelector((state) => state.limits);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchLimits());
    }
  }, [isAuthenticated, dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <header className="header">
      <Link to="/" className="header__logo">
        <img src={logo} alt="СКАН" />
      </Link>

      <nav className="header__nav">
        <Link to="/" className="header__nav-link">Главная</Link>
        <Link to="#" className="header__nav-link">Тарифы</Link>
        <Link to="#" className="header__nav-link">FAQ</Link>
      </nav>

      <div className="header__account">
        {isAuthenticated ? (
          <>
            <div className="header__limits-wrap">
              {loading ? (
                <Loader />
              ) : companyLimits ? (
                <div className="header__limits">
                  <p>
                    Использовано компаний: <span className="header__limits-used">{companyLimits.used}</span>
                  </p>
                  <p>
                    Лимит компаний: <span className="header__limits-company">{companyLimits.limit}</span>
                  </p>
                </div>
              ) : (
                <p>Лимиты недоступны</p>
              )}
            </div>
            <div className="header__user">
              <div className="header__user-text">
                <span>{user?.name || 'Евгиша Л.'}</span>
                <button className="header__logout" onClick={handleLogout}>
                  Выйти
                </button>
              </div>
              <img src={avatar} alt="Аватар" />
            </div>
          </>
        ) : (
          <div className="header__auth">
            <Link to="/register" className="header__register">
              Зарегистрироваться
            </Link>
            <div className="header__divider"></div>
            <button
              onClick={() => navigate('/login')}
              className="header__login"
            >
              Войти
            </button>
          </div>
        )}
      </div>

      <div className="header__menu-icon" onClick={() => setMenuOpen(!isMenuOpen)}>
        {isMenuOpen ? (
          <span className="menu-close">&times;</span> 
        ) : (
          <img
            src={menuicon}
            alt="Открыть меню"
            className="menu-icon"
          />
        )}
      </div>

      <MobileMenu
        isMenuOpen={isMenuOpen}
        setMenuOpen={setMenuOpen}
        isAuthenticated={isAuthenticated}
        navigate={navigate}
        onLogout={() => {
          dispatch(logout());
          navigate('/'); 
        }}
      />

    </header>
  );
}

export default Header;
