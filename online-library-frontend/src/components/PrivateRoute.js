import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from './AuthContext';

const PrivateRoute = ({ children, adminOnly }) => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/auth" />;
  }

  if (adminOnly && !user.isAdmin) {
    return <Navigate to="/books" />;
  }

  return children;
};

export default PrivateRoute;
