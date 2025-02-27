import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const UserRoute = () => {
  const { user } = useContext(AuthContext);
  if (user && user.role === 'admin') {
    return <Navigate to="/admin" replace />;
  }
  return <Outlet />;
};

export default UserRoute;
