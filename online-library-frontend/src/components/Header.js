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
              <span className="user-welcome">Привет, {user.username}!</span>
            </li>
          )}
          {user ? (
            <li className="nav-item" onClick={logout}>
              <Link to='/' className="nav-link">Выйти</Link>
            </li>
          ) : (
            <li className="nav-item">
              <Link to='/auth' className="nav-link">Войти</Link>
            </li>
          )}
          {user && (
            <>
              <li className="nav-item">
                <Link to="/books" className="nav-link">Книги</Link>
              </li>
              <li className="nav-item">
                <Link to="/collection" className="nav-link">Моя коллекция</Link>
              </li>
            </>
          )}
          {user && user.isAdmin && (
            <li className="nav-item">
              <Link to="/admin" className="nav-link">Админ Панель</Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
