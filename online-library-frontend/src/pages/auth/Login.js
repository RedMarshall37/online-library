import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../components/AuthContext';

function Login() {
  const [username, setUsername] = useState(''); // Состояние для имени пользователя
  const [password, setPassword] = useState(''); // Состояние для пароля
  const navigate = useNavigate(); // Навигация для перенаправления
  const { login } = useContext(AuthContext); // Получаем функцию логина из контекста авторизации

  // Обработчик отправки формы входа
  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(username, password); // Выполняем вход
    navigate('/books'); // Перенаправляем на страницу списка книг
  };

  return (
    <div>
      <h2>Вход</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Имя пользователя" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input type="password" placeholder="Пароль" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Войти</button>
      </form>
    </div>
  );
}

export default Login;
