import React, { useState, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import Login from '../../pages/auth/Login';
import Register from '../../pages/auth/Register';
import AuthContext from '../../components/AuthContext';

function Auth() {
  const { user } = useContext(AuthContext); // Получаем информацию о пользователе из контекста авторизации
  const [isLogin, setIsLogin] = useState(true); // Состояние для переключения между формой входа и регистрации

  if (user) {
    return <Navigate to="/books" />; // Перенаправляем на страницу списка книг, если пользователь авторизован
  }

  return (
    <div>
      <button onClick={() => setIsLogin(true)}>Вход</button>
      <button onClick={() => setIsLogin(false)}>Регистрация</button>
      {isLogin ? <Login /> : <Register />} {/* Отображаем форму входа или регистрации */}
    </div>
  );
}

export default Auth;
