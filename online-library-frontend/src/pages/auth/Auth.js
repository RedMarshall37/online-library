import React, { useState, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import Login from '../../pages/auth/Login';
import Register from '../../pages/auth/Register';
import AuthContext from '../../components/AuthContext';
import './Auth.css';

function Auth() {
  const { user } = useContext(AuthContext); // Получаем информацию о пользователе из контекста авторизации
  const [isLogin, setIsLogin] = useState(true); // Состояние для переключения между формой входа и регистрации

  if (user) {
    return <Navigate to="/books" />; // Перенаправляем на страницу списка книг, если пользователь авторизован
  }

  return (
    <div className="auth-container">
      <button className="auth-button" onClick={() => setIsLogin(true)}>Вход</button>
      <button className="auth-button" onClick={() => setIsLogin(false)}>Регистрация</button>
      {isLogin ? <Login /> : <Register />}
    </div>
  );
}

export default Auth;