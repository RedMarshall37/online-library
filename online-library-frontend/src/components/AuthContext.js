import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Состояние для хранения информации о пользователе
  const [token, setToken] = useState(localStorage.getItem('token')); // Состояние для хранения токена

  // Эффект для получения информации о пользователе при загрузке компонента
  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        try {
          const response = await axios.get('http://localhost:3000/users/me', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUser(response.data); // Устанавливаем информацию о пользователе
        } catch (error) {
          console.error(error);
          setUser(null); // Сбрасываем информацию о пользователе в случае ошибки
        }
      } else {
        setUser(null); // Сбрасываем информацию о пользователе, если токен отсутствует
      }
    };

    fetchUser();
  }, [token]);

  // Функция для выполнения входа
  const login = async (usernameOrToken, password) => {
    if (password) {
      try {
        const response = await axios.post('http://localhost:3000/auth/login', { username: usernameOrToken, password });
        localStorage.setItem('token', response.data.access_token); // Сохраняем токен в локальном хранилище
        setToken(response.data.access_token); // Устанавливаем токен
      } catch (error) {
        console.error(error); // Обработка ошибок
      }
    } else {
      setToken(usernameOrToken); // Устанавливаем токен, если пароль не передан
      const response = await axios.get('http://localhost:3000/users/me', {
        headers: {
          Authorization: `Bearer ${usernameOrToken}`,
        },
      });
      setUser(response.data); // Устанавливаем информацию о пользователе
    }
  };

  // Функция для выполнения выхода
  const logout = () => {
    localStorage.removeItem('token'); // Удаляем токен из локального хранилища
    setToken(null); // Сбрасываем токен
    setUser(null); // Сбрасываем информацию о пользователе
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
