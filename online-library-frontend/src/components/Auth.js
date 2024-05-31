import React, { useState, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import AuthContext from './AuthContext';

function Auth() {
  const { user } = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(true);
  
if (user) {
  return <Navigate to="/books" />;
}
  return (
    <div>
      <button onClick={() => setIsLogin(true)}>Login</button>
      <button onClick={() => setIsLogin(false)}>Register</button>
      {isLogin ? <Login /> : <Register />}
    </div>
  );
}

export default Auth;
