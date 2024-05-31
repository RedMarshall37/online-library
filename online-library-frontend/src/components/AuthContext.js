import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        try {
          const response = await axios.get('http://localhost:3000/users/me', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUser(response.data);
        } catch (error) {
          console.error(error);
          setUser(null);
        }
      } else {
        setUser(null);
      }
    };

    fetchUser();
  }, [token]);

  const login = async (usernameOrToken, password) => {
    if (password) {
      try {
        const response = await axios.post('http://localhost:3000/auth/login', { username: usernameOrToken, password });
        localStorage.setItem('token', response.data.access_token);
        setToken(response.data.access_token);
      } catch (error) {
        console.error(error);
      }
    } else {
      setToken(usernameOrToken);
      const response = await axios.get('http://localhost:3000/users/me', {
        headers: {
          Authorization: `Bearer ${usernameOrToken}`,
        },
      });
      setUser(response.data);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
