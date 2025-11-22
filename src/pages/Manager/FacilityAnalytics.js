import React, { useState, useEffect } from 'react';

const FacilityAnalytics = () => {
  const [analytics, setAnalytics] = useState({
    totalSlots: 18,
    occupiedSlots: 7,
    availableSlots: 11,
    totalBookings: 45,
    todayBookings: 12,
    revenue: 1250.50,
    avgOccupancy: 65
  });

  const [loading, setLoading] = useState(false);

  const refreshAnalytics = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setAnalytics({
        ...analytics,
        todayBookings: Math.floor(Math.random() * 20) + 5,
        occupiedSlots: Math.floor(Math.random() * 10) + 5,
        availableSlots: 18 - (Math.floor(Math.random() * 10) + 5)
      });
      setLoading(false);
    }, 1000);
  };

  const occupancyRate = ((analytics.occupiedSlots / analytics.totalSlots) * 100).toFixed(1);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Facility Analytics</h1>
          <p className="text-gray-600 mt-1">Monitor facility performance and usage statistics</p>
        </div>
        <button
          onClick={refreshAnalytics}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Refreshing...' : 'Refresh Data'}
        </button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-blue-600">🏢</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Slots</p>
              <p className="text-2xl font-semibold text-gray-900">{analytics.totalSlots}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
              <span className="text-red-600">🚗</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Occupied</p>
              <p className="text-2xl font-semibold text-gray-900">{analytics.occupiedSlots}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <span className="text-green-600">✅</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Available</p>
              <p className="text-2xl font-semibold text-gray-900">{analytics.availableSlots}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
              <span className="text-purple-600">📊</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Occupancy Rate</p>
              <p className="text-2xl font-semibold text-gray-900">{occupancyRate}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Revenue & Bookings */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <span className="text-green-600">💰</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-semibold text-gray-900">${analytics.revenue}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-blue-600">📅</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Today's Bookings</p>
              <p className="text-2xl font-semibold text-gray-900">{analytics.todayBookings}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
              <span className="text-yellow-600">📈</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Bookings</p>
              <p className="text-2xl font-semibold text-gray-900">{analytics.totalBookings}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Occupancy Chart */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Occupancy Overview</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-600">Occupied Slots</span>
            <span className="text-sm font-medium text-gray-900">{analytics.occupiedSlots}/{analytics.totalSlots}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-blue-600 h-3 rounded-full transition-all duration-300" 
              style={{ width: `${occupancyRate}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-xs text-gray-500">
            <span>0%</span>
            <span>50%</span>
            <span>100%</span>
          </div>
        </div>
      </div>

      {/* Slot Type Breakdown */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Slot Type Distribution</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl mb-2">👑</div>
            <div className="text-lg font-semibold text-gray-900">3</div>
            <div className="text-sm text-gray-600">VIP Slots</div>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl mb-2">🚗</div>
            <div className="text-lg font-semibold text-gray-900">12</div>
            <div className="text-sm text-gray-600">Regular Slots</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl mb-2">♿</div>
            <div className="text-lg font-semibold text-gray-900">3</div>
            <div className="text-sm text-gray-600">Handicapped Slots</div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between py-2 border-b border-gray-100">
            <div className="flex items-center">
              <span className="text-green-600 mr-3">✅</span>
              <span className="text-sm text-gray-900">Slot A-05 booked</span>
            </div>
            <span className="text-xs text-gray-500">2 minutes ago</span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-gray-100">
            <div className="flex items-center">
              <span className="text-red-600 mr-3">❌</span>
              <span className="text-sm text-gray-900">Slot A-12 booking cancelled</span>
            </div>
            <span className="text-xs text-gray-500">15 minutes ago</span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-gray-100">
            <div className="flex items-center">
              <span className="text-blue-600 mr-3">🚗</span>
              <span className="text-sm text-gray-900">Slot A-08 occupied</span>
            </div>
            <span className="text-xs text-gray-500">1 hour ago</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacilityAnalytics;