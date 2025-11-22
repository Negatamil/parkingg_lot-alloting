import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Button from '../UI/Button';

const NavigationTest = () => {
  const navigate = useNavigate();
  const { role } = useSelector((state) => state.auth);

  const userRoutes = [
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/booking', label: 'Book Slot' },
    { path: '/booking-history', label: 'Booking History' },
    { path: '/payment', label: 'Payment' },
    { path: '/profile', label: 'Profile' }
  ];

  const adminRoutes = [
    { path: '/admin', label: 'Admin Dashboard' },
    { path: '/admin/users', label: 'User Management' },
    { path: '/admin/slots', label: 'Slot Management' },
    { path: '/admin/facilities', label: 'Facility Management' },
    { path: '/admin/analytics', label: 'Analytics' }
  ];

  const managerRoutes = [
    { path: '/manager', label: 'Manager Dashboard' },
    { path: '/manager/analytics', label: 'Facility Analytics' }
  ];

  const getRoutesForRole = () => {
    switch (role) {
      case 'ADMIN':
        return [...userRoutes, ...adminRoutes];
      case 'MANAGER':
        return [...userRoutes, ...managerRoutes];
      default:
        return userRoutes;
    }
  };

  const routes = getRoutesForRole();

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Navigation Test - {role} Role</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {routes.map((route) => (
          <div key={route.path}>
            <Button
              variant="outline"
              size="sm"
              className="w-full"
              onClick={() => navigate(route.path)}
            >
              {route.label}
            </Button>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded">
        <h3 className="font-medium mb-2">Direct Links (for testing):</h3>
        <div className="space-y-1 text-sm">
          {routes.map((route) => (
            <div key={route.path}>
              <Link 
                to={route.path} 
                className="text-blue-600 hover:underline"
              >
                {route.path} - {route.label}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NavigationTest;