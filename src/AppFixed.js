import React from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Dashboard = () => {
  const navigate = useNavigate();
  
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <button 
          onClick={() => navigate('/booking')}
          className="p-4 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Book Slot
        </button>
        
        <button 
          onClick={() => navigate('/booking-history')}
          className="p-4 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Booking History
        </button>
        
        <button 
          onClick={() => navigate('/payment')}
          className="p-4 bg-purple-500 text-white rounded hover:bg-purple-600"
        >
          Payment
        </button>
        
        <button 
          onClick={() => navigate('/profile')}
          className="p-4 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          Profile
        </button>
      </div>
      
      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-2">Quick Stats</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded shadow">
            <p className="text-2xl font-bold">5</p>
            <p className="text-gray-600">Available Slots</p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <p className="text-2xl font-bold">2</p>
            <p className="text-gray-600">Active Bookings</p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <p className="text-2xl font-bold">$45</p>
            <p className="text-gray-600">Total Spent</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Booking = () => {
  const navigate = useNavigate();
  
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Book a Parking Slot</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {[1, 2, 3, 4, 5].map(i => (
          <div key={i} className="bg-white border rounded-lg p-4">
            <h3 className="font-medium">Slot A-{i.toString().padStart(2, '0')}</h3>
            <p className="text-sm text-gray-600">$5.00/hour</p>
            <p className="text-sm text-green-600">Available</p>
            <button className="mt-2 px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700">
              Book Now
            </button>
          </div>
        ))}
      </div>
      
      <button 
        onClick={() => navigate('/dashboard')}
        className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
      >
        ← Back to Dashboard
      </button>
    </div>
  );
};

const BookingHistory = () => {
  const navigate = useNavigate();
  
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Booking History</h1>
      
      <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Slot</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {[1, 2, 3].map(i => (
              <tr key={i}>
                <td className="px-6 py-4 whitespace-nowrap">A-0{i}</td>
                <td className="px-6 py-4 whitespace-nowrap">2024-01-{10 + i}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                    Completed
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">$15.00</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <button 
        onClick={() => navigate('/dashboard')}
        className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
      >
        ← Back to Dashboard
      </button>
    </div>
  );
};

const Payment = () => {
  const navigate = useNavigate();
  
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Payment</h1>
      
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">Payment Methods</h2>
        <div className="space-y-3">
          <div className="border rounded-lg p-3">
            <p className="font-medium">Credit Card ending in 1234</p>
            <p className="text-sm text-gray-600">Expires 12/25</p>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Add Payment Method
          </button>
        </div>
      </div>
      
      <button 
        onClick={() => navigate('/dashboard')}
        className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
      >
        ← Back to Dashboard
      </button>
    </div>
  );
};

const Profile = () => {
  const navigate = useNavigate();
  
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input 
              type="email" 
              value="user@example.com" 
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Role</label>
            <input 
              type="text" 
              value="USER" 
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              readOnly
            />
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Update Profile
          </button>
        </div>
      </div>
      
      <button 
        onClick={() => navigate('/dashboard')}
        className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
      >
        ← Back to Dashboard
      </button>
    </div>
  );
};

const AppFixed = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/booking-history" element={<BookingHistory />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
};

export default AppFixed;