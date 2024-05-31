import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from './AuthContext';

const PrivateRoute = ({ children, adminOnly }) => {
  const { user } = useContext(AuthContext); // Получаем информацию о пользователе из контекста авторизации

  if (!user) {
    return <Navigate to="/auth" />; // Перенаправляем на страницу авторизации, если пользователь не авторизован
  }

  if (adminOnly && !user.isAdmin) {
    return <Navigate to="/books" />; // Перенаправляем на страницу списка книг, если пользователь не администратор
  }

  return children; // Возвращаем дочерние компоненты, если все проверки пройдены
};

export default PrivateRoute;
