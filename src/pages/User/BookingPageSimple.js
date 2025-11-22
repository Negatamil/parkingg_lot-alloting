import React from 'react';
import { Link } from 'react-router-dom';

const BookingPageSimple = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Book a Parking Slot</h1>
        <p className="text-gray-600 mt-1">Simple booking page - navigation test</p>
      </div>

      <div className="card p-6">
        <h2 className="text-lg font-semibold mb-4">Available Slots</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="border rounded-lg p-4">
              <h3 className="font-medium">Slot A-{i.toString().padStart(2, '0')}</h3>
              <p className="text-sm text-gray-600">$5.00/hour</p>
              <button className="mt-2 px-3 py-1 bg-blue-600 text-white rounded text-sm">
                Book Now
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex space-x-4">
        <Link to="/dashboard" className="text-blue-600 hover:underline">← Back to Dashboard</Link>
        <Link to="/booking-history" className="text-blue-600 hover:underline">View Booking History →</Link>
      </div>
    </div>
  );
};

export default BookingPageSimple;