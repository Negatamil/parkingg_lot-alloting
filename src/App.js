import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuthStatus } from './store/slices/authSlice';

// Auth Pages
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';

// Dashboards
import UserDashboard from './pages/User/Dashboard';
import AdminDashboard from './pages/Admin/AdminDashboard';
import ManagerDashboard from './pages/Manager/ManagerDashboard';

// User Pages
import BookingPage from './pages/User/BookingPage';
import BookingHistory from './pages/User/BookingHistory';
import Profile from './pages/User/Profile';
import Payment from './pages/User/Payment';

// Admin Pages
import UserManagement from './pages/Admin/UserManagement';
import SlotManagement from './pages/Admin/SlotManagement';

// Manager Pages
import FacilityAnalytics from './pages/Manager/FacilityAnalytics';

// Layout
import Layout from './components/Layout/Layout';

// Protected Route
const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const token = localStorage.getItem('token');
  const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
  const currentUser = user || storedUser;
  
  if (!isAuthenticated && !token) {
    return <Navigate to="/login" replace />;
  }
  
  if (allowedRoles.length > 0 && currentUser && !allowedRoles.includes(currentUser.role)) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return <Layout>{children}</Layout>;
};

// Role-based Dashboard
const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
  const currentUser = user || storedUser;
  
  if (!currentUser || !currentUser.role) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Welcome to Parking Pro!</h1>
        <p>Loading your dashboard...</p>
      </div>
    );
  }
  
  switch (currentUser.role) {
    case 'ADMIN':
      return <AdminDashboard />;
    case 'MANAGER':
      return <ManagerDashboard />;
    default:
      return <UserDashboard />;
  }
};

function App() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(checkAuthStatus());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      {/* Protected Routes */}
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      } />
      
      <Route path="/booking" element={
        <ProtectedRoute allowedRoles={['USER']}>
          <BookingPage />
        </ProtectedRoute>
      } />
      
      <Route path="/booking-history" element={
        <ProtectedRoute allowedRoles={['USER']}>
          <BookingHistory />
        </ProtectedRoute>
      } />
      
      <Route path="/payment" element={
        <ProtectedRoute allowedRoles={['USER']}>
          <Payment />
        </ProtectedRoute>
      } />
      
      <Route path="/profile" element={
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
      } />
      
      <Route path="/admin/users" element={
        <ProtectedRoute allowedRoles={['ADMIN']}>
          <UserManagement />
        </ProtectedRoute>
      } />
      
      <Route path="/admin/slots" element={
        <ProtectedRoute allowedRoles={['ADMIN']}>
          <SlotManagement />
        </ProtectedRoute>
      } />
      
      <Route path="/admin/monitoring" element={
        <ProtectedRoute allowedRoles={['ADMIN']}>
          <div className="p-6"><h1 className="text-2xl font-bold">System Monitor</h1><p>System monitoring dashboard</p></div>
        </ProtectedRoute>
      } />
      
      <Route path="/admin/smart-features" element={
        <ProtectedRoute allowedRoles={['ADMIN']}>
          <div className="p-6"><h1 className="text-2xl font-bold">Smart Features</h1><p>Smart parking features</p></div>
        </ProtectedRoute>
      } />
      
      <Route path="/manager/analytics" element={
        <ProtectedRoute allowedRoles={['MANAGER']}>
          <FacilityAnalytics />
        </ProtectedRoute>
      } />
      
      {/* Default Route */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

export default App;