import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

function PrivateRoute({ children }) {
  const { user } = useContext(AuthContext);

  // Si el usuario no está autenticado, redirige al login
  return user ? children : <Navigate to="/login" />;
}

export default PrivateRoute;
