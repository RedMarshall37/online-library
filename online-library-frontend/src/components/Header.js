import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from './AuthContext';

function Header() {
  const { user, logout } = useContext(AuthContext);

  return (
    <header>
      <nav>
        <ul>
          {user && (
            <li>
              <span>Ваш ник: {user.username}</span>
            </li>
          )}
          {user ? (
            <li onClick={logout}>
              <Link to='/'>Выйти</Link>
            </li>
          ) : (
            <li>
              <Link to='/auth'>Войти</Link>
            </li>
          )}
          {user && (
            <li>
              <Link to="/books">Books</Link>
            </li>
          )}
          {user && (
            <li>
              <Link to="/collection">Моя коллекция</Link>
            </li>
          )}
          {user && user.isAdmin && (
            <li>
              <Link to="/admin">Admin Panel</Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
