import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchSlots } from '../../store/slices/slotSlice';
import { fetchBookings } from '../../store/slices/bookingSlice';
import SlotCard from '../../components/Booking/SlotCard';
import Button from '../../components/UI/Button';



const Dashboard = () => {
  const dispatch = useDispatch();
  const { user, role } = useSelector((state) => state.auth);
  const { slots, availableSlots, loading: slotsLoading } = useSelector((state) => state.slots);
  const { bookings, loading: bookingsLoading } = useSelector((state) => state.bookings);

  useEffect(() => {
    dispatch(fetchSlots());
    dispatch(fetchBookings());
  }, [dispatch]);

  const getUpcomingBookings = () => {
    const now = new Date();
    return bookings.filter(booking => {
      const startTime = new Date(booking.startTime);
      return startTime > now && booking.status === 'CONFIRMED';
    }).slice(0, 3);
  };

  const getActiveBookings = () => {
    return bookings.filter(booking => booking.status === 'ACTIVE').slice(0, 3);
  };

  const getRecentBookings = () => {
    return bookings.slice(0, 5);
  };

  const upcomingBookings = getUpcomingBookings();
  const activeBookings = getActiveBookings();
  const recentBookings = getRecentBookings();

  const getBookingStatusColor = (status) => {
    switch (status) {
      case 'CONFIRMED':
        return 'bg-blue-100 text-blue-800';
      case 'ACTIVE':
        return 'bg-green-100 text-green-800';
      case 'COMPLETED':
        return 'bg-gray-100 text-gray-800';
      case 'CANCELLED':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDateTime = (dateTime) => {
    return new Date(dateTime).toLocaleString();
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="space-y-6">

      <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold">
          {getGreeting()}, {user?.email?.split('@')[0]}!
        </h1>
        <p className="text-primary-100 mt-1">
          Welcome to your parking dashboard. Here's what's happening today.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Available Slots</p>
              <p className="text-2xl font-semibold text-gray-900">
                {slotsLoading ? '...' : availableSlots.length}
              </p>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 0V6a2 2 0 012-2h4a2 2 0 012 2v1M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V9a2 2 0 00-2-2h-2" />
                </svg>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Bookings</p>
              <p className="text-2xl font-semibold text-gray-900">
                {bookingsLoading ? '...' : activeBookings.length}
              </p>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Upcoming</p>
              <p className="text-2xl font-semibold text-gray-900">
                {bookingsLoading ? '...' : upcomingBookings.length}
              </p>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Bookings</p>
              <p className="text-2xl font-semibold text-gray-900">
                {bookingsLoading ? '...' : bookings.length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link to="/booking">
            <Button variant="primary" className="w-full">
              Book a Slot
            </Button>
          </Link>
          <Link to="/booking-history">
            <Button variant="outline" className="w-full">
              View Bookings
            </Button>
          </Link>
          <Link to="/payment">
            <Button variant="outline" className="w-full">
              Make Payment
            </Button>
          </Link>
          <Link to="/profile">
            <Button variant="outline" className="w-full">
              Update Profile
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Available Slots */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Available Slots</h2>
            <Link to="/booking">
              <Button variant="outline" size="sm">View All</Button>
            </Link>
          </div>
          
          {slotsLoading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
            </div>
          ) : (
            <div className="space-y-3">
              {availableSlots.slice(0, 3).map((slot) => (
                <div key={slot.slotId} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">🚗</span>
                    <div>
                      <p className="font-medium text-gray-900">{slot.slotNumber}</p>
                      <p className="text-sm text-gray-600">{slot.slotType}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">${slot.hourlyRate}/hr</p>
                    <p className="text-sm text-green-600">Available</p>
                  </div>
                </div>
              ))}
              
              {availableSlots.length === 0 && (
                <p className="text-center text-gray-500 py-4">No available slots at the moment</p>
              )}
            </div>
          )}
        </div>

        {/* Recent Bookings */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Bookings</h2>
            <Link to="/booking-history">
              <Button variant="outline" size="sm">View All</Button>
            </Link>
          </div>
          
          {bookingsLoading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
            </div>
          ) : (
            <div className="space-y-3">
              {recentBookings.map((booking) => (
                <div key={booking.bookingId} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">🚗</span>
                    <div>
                      <p className="font-medium text-gray-900">Slot {booking.parkingSlot?.slotNumber}</p>
                      <p className="text-sm text-gray-600">{booking.vehicleNumber}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getBookingStatusColor(booking.status)}`}>
                      {booking.status}
                    </span>
                    <p className="text-sm text-gray-600 mt-1">
                      {formatDateTime(booking.startTime)}
                    </p>
                  </div>
                </div>
              ))}
              
              {bookings.length === 0 && (
                <p className="text-center text-gray-500 py-4">No bookings yet</p>
              )}
            </div>
          )}
        </div>
      </div>


      {upcomingBookings.length > 0 && (
        <div className="card p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Bookings</h2>
          <div className="space-y-4">
            {upcomingBookings.map((booking) => (
              <div key={booking.bookingId} className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 0V6a2 2 0 012-2h4a2 2 0 012 2v1M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V9a2 2 0 00-2-2h-2" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Slot {booking.parkingSlot?.slotNumber}</p>
                    <p className="text-sm text-gray-600">{booking.vehicleNumber}</p>
                    <p className="text-sm text-blue-600">Starts: {formatDateTime(booking.startTime)}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">${booking.totalCost}</p>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getBookingStatusColor(booking.status)}`}>
                    {booking.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
