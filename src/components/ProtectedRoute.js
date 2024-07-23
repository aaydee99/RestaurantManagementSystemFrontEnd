import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuthStore from '../stores/authStore';

const ProtectedRoute = ({ component: Component }) => {
  const { user } = useAuthStore();

  return user ? <Component /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
