import React from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';

const TestDashboard = () => {
  const navigate = useNavigate();
  
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Test Dashboard</h1>
      
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <button 
            onClick={() => navigate('/test-booking')}
            className="p-4 bg-blue-500 text-white rounded"
          >
            Go to Booking (navigate)
          </button>
          
          <Link to="/test-booking" className="p-4 bg-green-500 text-white rounded text-center">
            Go to Booking (Link)
          </Link>
          
          <button 
            onClick={() => navigate('/test-payment')}
            className="p-4 bg-purple-500 text-white rounded"
          >
            Go to Payment (navigate)
          </button>
          
          <Link to="/test-payment" className="p-4 bg-red-500 text-white rounded text-center">
            Go to Payment (Link)
          </Link>
        </div>
        
        <div className="mt-4">
          <a href="/test-booking" className="text-blue-600 underline">Direct href link</a>
        </div>
      </div>
    </div>
  );
};

const TestBooking = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold mb-4">Test Booking Page</h1>
    <Link to="/test-dashboard" className="text-blue-600 underline">Back to Dashboard</Link>
  </div>
);

const TestPayment = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold mb-4">Test Payment Page</h1>
    <Link to="/test-dashboard" className="text-blue-600 underline">Back to Dashboard</Link>
  </div>
);

const TestApp = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        <Route path="/test-dashboard" element={<TestDashboard />} />
        <Route path="/test-booking" element={<TestBooking />} />
        <Route path="/test-payment" element={<TestPayment />} />
        <Route path="*" element={<TestDashboard />} />
      </Routes>
    </div>
  );
};

export default TestApp;