import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children, requiredRole = null }) => {
  const { isAuthenticated, role } = useSelector((state) => state.auth);
  const location = useLocation();

  console.log('ProtectedRoute - isAuthenticated:', isAuthenticated, 'role:', role);

  // Check localStorage as fallback
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');
  const hasValidSession = token && user;

  // Always allow access if token exists in localStorage
  if (!hasValidSession) {
    console.log('Not authenticated, redirecting to login');
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requiredRole && role !== requiredRole) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute;
