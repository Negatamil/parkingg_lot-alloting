import React from 'react';
import { useDispatch } from 'react-redux';

const QuickLogin = () => {
  const dispatch = useDispatch();

  const loginAs = (role) => {
    const mockUser = {
      id: 1,
      email: `${role.toLowerCase()}@test.com`,
      role: role
    };
    
    dispatch({
      type: 'auth/loginUser/fulfilled',
      payload: {
        token: 'mock-token',
        user: mockUser
      }
    });
  };

  return (
    <div className="fixed top-4 left-4 z-50 bg-white p-4 rounded shadow-lg border">
      <h3 className="font-bold mb-2">Quick Login (Testing)</h3>
      <div className="space-x-2">
        <button 
          onClick={() => loginAs('USER')}
          className="px-3 py-1 bg-blue-500 text-white rounded text-sm"
        >
          Login as USER
        </button>
        <button 
          onClick={() => loginAs('MANAGER')}
          className="px-3 py-1 bg-green-500 text-white rounded text-sm"
        >
          Login as MANAGER
        </button>
        <button 
          onClick={() => loginAs('ADMIN')}
          className="px-3 py-1 bg-red-500 text-white rounded text-sm"
        >
          Login as ADMIN
        </button>
      </div>
    </div>
  );
};

export default QuickLogin;