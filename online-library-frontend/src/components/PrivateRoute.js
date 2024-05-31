import React, { useContext } from 'react'; // Импортируем React и хук useContext из библиотеки React
import { Navigate } from 'react-router-dom'; // Импортируем компонент Navigate из библиотеки react-router-dom
import AuthContext from './AuthContext'; // Импортируем контекст авторизации

// Компонент для приватных маршрутов
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
