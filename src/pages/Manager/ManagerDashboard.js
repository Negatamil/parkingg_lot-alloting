import React, { useEffect, useState } from 'react';

const ManagerDashboard = () => {
  const [stats, setStats] = useState({
    totalSlots: 0,
    availableSlots: 0,
    totalBookings: 0,
    totalRevenue: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data from backend
    Promise.all([
      fetch('http://localhost:8080/api/slots').then(res => res.json()),
      fetch('http://localhost:8080/api/bookings', {
        headers: {
          'User-Role': 'MANAGER',
          'User-Id': '1'
        }
      }).then(res => res.json())
    ])
    .then(([slots, bookings]) => {
      setStats({
        totalSlots: slots.length,
        availableSlots: slots.filter(slot => slot.isAvailable).length,
        totalBookings: bookings.length,
        totalRevenue: bookings.reduce((sum, booking) => sum + (booking.totalCost || 0), 0)
      });
      setLoading(false);
    })
    .catch(err => {
      console.error('Error fetching data:', err);
      setLoading(false);
    });
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manager Dashboard</h1>
          <p className="text-gray-600 mt-1">Facility management and analytics</p>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-blue-600">🏢</span>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Slots</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.totalSlots}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-green-600">✅</span>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Available Slots</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.availableSlots}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                <span className="text-yellow-600">📋</span>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Bookings</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.totalBookings}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                <span className="text-purple-600">💰</span>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-semibold text-gray-900">${stats.totalRevenue.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Manager Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-blue-500">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-blue-600 text-xl">🏢</span>
            </div>
            <div className="text-left">
              <p className="font-semibold text-gray-900">Facility Management</p>
              <p className="text-sm text-gray-600">Manage facility settings</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-green-500">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <span className="text-green-600 text-xl">📈</span>
            </div>
            <div className="text-left">
              <p className="font-semibold text-gray-900">Analytics</p>
              <p className="text-sm text-gray-600">View detailed analytics</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-purple-500">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <span className="text-purple-600 text-xl">🔧</span>
            </div>
            <div className="text-left">
              <p className="font-semibold text-gray-900">Maintenance</p>
              <p className="text-sm text-gray-600">Schedule maintenance</p>
            </div>
          </div>
        </div>
      </div>

      {/* Facility Overview */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Facility Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">Operational</div>
            <div className="text-sm text-gray-600">Facility Status</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{((stats.totalSlots - stats.availableSlots) / stats.totalSlots * 100 || 0).toFixed(1)}%</div>
            <div className="text-sm text-gray-600">Occupancy Rate</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">24/7</div>
            <div className="text-sm text-gray-600">Operating Hours</div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <span className="text-blue-600">📋</span>
              <span className="text-gray-900">New booking created</span>
            </div>
            <span className="text-sm text-gray-500">2 minutes ago</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <span className="text-green-600">✅</span>
              <span className="text-gray-900">Slot A-05 became available</span>
            </div>
            <span className="text-sm text-gray-500">5 minutes ago</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <span className="text-yellow-600">🔧</span>
              <span className="text-gray-900">Maintenance scheduled for Floor 2</span>
            </div>
            <span className="text-sm text-gray-500">1 hour ago</span>
          </div>
        </div>
      </div>

      {loading && (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      )}
    </div>
  );
};

export default ManagerDashboard;