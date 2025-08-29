// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import './LoginForm.css';
import googleIcon from '../../assets/login/Social_google.svg';
import fbIcon from '../../assets/login/Social_fb.svg';
import yaIcon from '../../assets/login/Social_ya.svg';
import lockIcon from '../../assets/login/icon_lock.svg';
import { login } from '../../services/authService';
import { validateForm } from '../../utils/validation';
import { useNavigate } from 'react-router-dom';
import { login as loginAction } from '../../store/slices/authSlice';
import { Loader } from '../common';

function LoginForm() {
  const dispatch = useDispatch();
  const [loginValue, setLoginValue] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ login: '', password: '' });
  const [apiError, setApiError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { isValid, errors } = validateForm({ login: loginValue, password });
    if (!isValid) {
      setErrors(errors);
      return;
    }

    setIsLoading(true);
    setErrors({});
    setApiError('');

    try {
      const data = await login(loginValue, password);
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('tokenExpire', data.expire);
      localStorage.setItem('user', JSON.stringify({ name: 'Алексей А.' }));
      dispatch(loginAction({ user: { login: loginValue } }));
      navigate('/search');
    } catch (error) {
      if (error.message === 'Неправильное имя или пароль') {
        setErrors({ login: 'Ошибка', password: 'Ошибка' });
        setApiError('Неправильное имя или пароль');
      } else {
        setApiError(error.message || 'Произошла ошибка');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-form">
      <img src={lockIcon} alt="Lock Icon" className="login-form__icon" />
      <div className="login-form__tabs">
        <button className="login-form__tab login-form__tab--active">Войти</button>
        <button className="login-form__tab">Зарегистрироваться</button>
      </div>
      <form className="login-form__form" onSubmit={handleSubmit}>
        <label className="login-form__label">
          Логин или номер телефона:
          <input
            type="text"
            className={`login-form__input ${errors.login ? 'login-form__input--error' : ''}`}
            value={loginValue}
            onChange={(e) => setLoginValue(e.target.value)}
          />
        </label>
        <label className="login-form__label">
          Пароль:
          <input
            type="password"
            className={`login-form__input ${errors.password ? 'login-form__input--error' : ''}`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {apiError && <span className="login-form__error">{apiError}</span>}
        </label>
        <button
          type="submit"
          className={`login-form__button ${isLoading || !loginValue || !password ? 'login-form__button--disabled' : ''}`}
          disabled={isLoading || !loginValue || !password}
        >
          {isLoading ? <Loader /> : 'Войти'}
        </button>
        <a href="/forgot-password" className="login-form__link">
          Восстановить пароль
        </a>
      </form>
      <div className="login-form-header">Войти через:</div>
      <div className="login-form__socials">
        <button className="login-form__social">
          <img src={googleIcon} alt="Google" />
        </button>
        <button className="login-form__social">
          <img src={fbIcon} alt="Facebook" />
        </button>
        <button className="login-form__social">
          <img src={yaIcon} alt="Yandex" />
        </button>
      </div>
    </div>
  );
}

export default LoginForm;
