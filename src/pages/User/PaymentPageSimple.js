import React from 'react';
import { Link } from 'react-router-dom';

const PaymentPageSimple = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Payment</h1>
        <p className="text-gray-600 mt-1">Manage your payments - navigation test</p>
      </div>

      <div className="card p-6">
        <h2 className="text-lg font-semibold mb-4">Payment Methods</h2>
        <div className="space-y-3">
          <div className="border rounded-lg p-3">
            <p className="font-medium">Credit Card ending in 1234</p>
            <p className="text-sm text-gray-600">Expires 12/25</p>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded">
            Add Payment Method
          </button>
        </div>
      </div>

      <div className="card p-6">
        <h2 className="text-lg font-semibold mb-4">Recent Transactions</h2>
        <div className="space-y-2">
          {[1, 2, 3].map(i => (
            <div key={i} className="flex justify-between py-2 border-b">
              <span>Parking Fee - Slot A-0{i}</span>
              <span className="font-medium">$10.00</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex space-x-4">
        <Link to="/dashboard" className="text-blue-600 hover:underline">← Back to Dashboard</Link>
        <Link to="/booking-history" className="text-blue-600 hover:underline">View Bookings →</Link>
      </div>
    </div>
  );
};

export default PaymentPageSimple;