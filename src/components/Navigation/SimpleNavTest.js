import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

const SimpleNavTest = () => {
  const navigate = useNavigate();

  const testRoutes = [
    '/dashboard',
    '/booking',
    '/booking-history',
    '/payment',
    '/profile'
  ];

  return (
    <div className="p-4 bg-yellow-100 border border-yellow-300 rounded">
      <h3 className="font-bold mb-2">Navigation Test</h3>
      
      <div className="space-y-2">
        <div>
          <strong>Using navigate():</strong>
          {testRoutes.map(route => (
            <button
              key={route}
              onClick={() => {
                console.log('Navigating to:', route);
                navigate(route);
              }}
              className="ml-2 px-2 py-1 bg-blue-500 text-white text-xs rounded"
            >
              {route}
            </button>
          ))}
        </div>
        
        <div>
          <strong>Using Link:</strong>
          {testRoutes.map(route => (
            <Link
              key={route}
              to={route}
              className="ml-2 px-2 py-1 bg-green-500 text-white text-xs rounded inline-block"
            >
              {route}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SimpleNavTest;