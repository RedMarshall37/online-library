import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from './AuthContext';
import './Header.css'; // Импорт стилей

function Header() {
  const { user, logout } = useContext(AuthContext); // Получаем информацию о пользователе и функцию выхода из контекста авторизации

  return (
    <header className="header-container">
      <nav className="nav-container">
        <ul className="nav-list">
          {user && (
            <li className="nav-item">
              <span>Привет, {user.username}!</span>
            </li>
          )}
          {user ? (
            <li className="nav-item" onClick={logout}>
              <Link to='/'>Выйти</Link>
            </li>
          ) : (
            <li className="nav-item">
              <Link to='/auth'>Войти</Link>
            </li>
          )}
          {user && (
            <>
              <li className="nav-item">
                <Link to="/books">Книги</Link>
              </li>
              <li className="nav-item">
                <Link to="/collection">Моя коллекция</Link>
              </li>
            </>
          )}
          {user && user.isAdmin && (
            <li className="nav-item">
              <Link to="/admin">Админ Панель</Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
