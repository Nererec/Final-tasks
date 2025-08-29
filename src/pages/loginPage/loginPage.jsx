// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Header, Footer } from '../../components/common';
import { AuthHeader, LoginForm, LoginImage, MobileLoginImage } from '../../components/LoginPage';
import './LoginPage.css';


function LoginPage() {
  return (
    <div className="login-page">
      <Header />
      <div className="login-page__content">
        <div className="login-page__left">
          <AuthHeader />
          <LoginImage />
        </div>
        <LoginForm />
        <MobileLoginImage /> 
      </div>
      <Footer />
    </div>
  );
}

export default LoginPage;