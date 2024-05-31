import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../../components/AuthContext';
import './Register.css';

function Register() {
  const [username, setUsername] = useState(''); // Состояние для имени пользователя
  const [password, setPassword] = useState(''); // Состояние для пароля
  const [email, setEmail] = useState(''); // Состояние для электронной почты
  const navigate = useNavigate(); // Навигация для перенаправления
  const { login } = useContext(AuthContext); // Получаем функцию логина из контекста авторизации

  // Обработчик отправки формы регистрации
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/auth/register', { username, password, email });
      localStorage.setItem('token', response.data.access_token); // Сохраняем токен в локальном хранилище
      await login(username, password); // Выполняем вход
      navigate('/books'); // Перенаправляем на страницу списка книг
    } catch (error) {
      console.error(error); // Обработка ошибок
    }
  };

  return (
    <div className="register-container">
      <h2>Регистрация</h2>
      <form onSubmit={handleSubmit}>
        <input className="register-input" type="text" placeholder="Имя пользователя" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input className="register-input" type="email" placeholder="Электронная почта" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className="register-input" type="password" placeholder="Пароль" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className="register-button" type="submit">Зарегистрироваться</button>
      </form>
    </div>
  );
}

export default Register;