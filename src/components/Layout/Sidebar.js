import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Sidebar = ({ isOpen, onClose }) => {
  const { role } = useSelector((state) => state.auth);
  const location = useLocation();

  const userMenuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/profile', label: 'Profile', icon: '👤' },
  ];

  const customerMenuItems = [
    { path: '/booking', label: 'Book Slot', icon: '🚗' },
    { path: '/booking-history', label: 'My Bookings', icon: '📋' },
    { path: '/payment', label: 'Payments', icon: '💳' },
  ];

  const adminMenuItems = [
    { path: '/admin/users', label: 'User Management', icon: '👥' },
    { path: '/admin/slots', label: 'Slot Management', icon: '🅿️' },
  ];

  const managerMenuItems = [
    { path: '/manager/analytics', label: 'Facility Analytics', icon: '📈' },
  ];

  const getMenuItems = () => {
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
    const currentRole = role || storedUser.role || 'USER';
    
    switch (currentRole) {
      case 'ADMIN':
        return [...userMenuItems, ...adminMenuItems];
      case 'MANAGER':
        return [...userMenuItems, ...managerMenuItems];
      default:
        return [...userMenuItems, ...customerMenuItems];
    }
  };

  const menuItems = getMenuItems();

  const isActiveRoute = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-gray-600 bg-opacity-75 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:inset-0
      `}>
        <div className="flex flex-col h-full pt-16 lg:pt-0">
          {/* Logo */}
          <div className="flex items-center px-6 py-4 border-b border-gray-200">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">P</span>
            </div>
            <span className="ml-2 text-xl font-semibold text-gray-900">Parking Pro</span>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {menuItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => window.innerWidth < 1024 && onClose()}
                className={`
                  flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200
                  ${isActiveRoute(item.path)
                    ? 'bg-primary-100 text-primary-700 border-r-2 border-primary-600'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }
                `}
              >
                <span className="text-lg mr-3">{item.icon}</span>
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* User Info */}
          <div className="px-4 py-4 border-t border-gray-200">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-gray-700">
                  {role?.charAt(0) || 'U'}
                </span>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">{role || JSON.parse(localStorage.getItem('user') || '{}').role || 'USER'}</p>
                <p className="text-xs text-gray-500">User Role</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
