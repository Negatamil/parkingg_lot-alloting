import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../store/slices/authSlice';

const LoginTest = () => {
  const dispatch = useDispatch();
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(credentials));
  };

  const testUsers = [
    { email: 'admin@test.com', password: 'Admin123!', role: 'ADMIN' },
    { email: 'manager@test.com', password: 'Manager123!', role: 'MANAGER' },
    { email: 'user@test.com', password: 'User123!', role: 'USER' }
  ];

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Login Test</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            value={credentials.email}
            onChange={(e) => setCredentials({...credentials, email: e.target.value})}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            value={credentials.password}
            onChange={(e) => setCredentials({...credentials, password: e.target.value})}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
        >
          Login
        </button>
      </form>

      <div className="mt-6">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Test Users:</h3>
        {testUsers.map((user, index) => (
          <button
            key={index}
            onClick={() => setCredentials({ email: user.email, password: user.password })}
            className="block w-full text-left p-2 mb-1 bg-gray-100 rounded text-sm hover:bg-gray-200"
          >
            {user.role}: {user.email}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LoginTest;