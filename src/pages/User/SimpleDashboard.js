import React from 'react';

const SimpleDashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Welcome to Parking Pro!</h2>
        <p className="text-gray-600">You have successfully logged in.</p>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-800">Book Parking</h3>
            <p className="text-blue-600 text-sm">Find and book available slots</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="font-semibold text-green-800">My Bookings</h3>
            <p className="text-green-600 text-sm">View your booking history</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <h3 className="font-semibold text-purple-800">Profile</h3>
            <p className="text-purple-600 text-sm">Manage your account</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleDashboard;