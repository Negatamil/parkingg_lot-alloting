import React from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      
      <div className="space-y-4">
        <div className="flex space-x-4">
          <button 
            onClick={() => navigate('/booking')}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Book Slot
          </button>
          
          <Link to="/booking" className="px-4 py-2 bg-green-500 text-white rounded">
            Book Slot (Link)
          </Link>
          
          <button 
            onClick={() => navigate('/payment')}
            className="px-4 py-2 bg-purple-500 text-white rounded"
          >
            Payment
          </button>
        </div>
      </div>
    </div>
  );
};

const Booking = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold mb-4">Booking Page</h1>
    <Link to="/" className="text-blue-600 underline">Back to Dashboard</Link>
  </div>
);

const Payment = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold mb-4">Payment Page</h1>
    <Link to="/" className="text-blue-600 underline">Back to Dashboard</Link>
  </div>
);

const SimpleApp = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/payment" element={<Payment />} />
      </Routes>
    </div>
  );
};

export default SimpleApp;