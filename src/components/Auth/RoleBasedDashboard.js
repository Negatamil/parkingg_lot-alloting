import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

// Import role-specific dashboards
import Dashboard from '../../pages/User/Dashboard';
import AdminDashboard from '../../pages/Admin/AdminDashboard';
import ManagerDashboard from '../../pages/Manager/ManagerDashboard';

const RoleBasedDashboard = () => {
  const { role } = useSelector((state) => state.auth);
  
  console.log('Current role:', role);

  switch (role) {
    case 'ADMIN':
      return <AdminDashboard />;
    case 'MANAGER':
      return <ManagerDashboard />;
    case 'USER':
    default:
      return <Dashboard />;
  }
};

export default RoleBasedDashboard;