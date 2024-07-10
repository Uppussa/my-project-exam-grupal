import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import {AuthContext} from '../context/UserContext'; 

const PrivateRoute = () => {
  const { loading, isAuthenticated } = useContext(AuthContext);
  console.log('loading', loading);
  console.log('isAuthenticated', isAuthenticated);

  if (loading) {
    return <div>Loading...</div>;
  } else {
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
  }
};

export default PrivateRoute;