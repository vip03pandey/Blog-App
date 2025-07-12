import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const userToken = localStorage.getItem('userToken');
  const userInfo = localStorage.getItem('userInfo');
  
  // Debug logs to help identify the issue
  console.log('ProtectedRoute Debug:', {
    userToken: !!userToken,
    userInfo: !!userInfo,
    currentPath: location.pathname,
    tokenValue: userToken ? 'exists' : 'missing'
  });
  
  // Check if user is authenticated
  if (!userToken || !userInfo) {
    console.log('Redirecting to login - no token or userInfo');
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  return children;
};

export default ProtectedRoute;