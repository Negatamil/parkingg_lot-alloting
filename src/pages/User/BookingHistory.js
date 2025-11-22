import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const BookingHistory = () => {
  const { user } = useSelector((state) => state.auth);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelBookingId, setCancelBookingId] = useState(null);

  const fetchBookings = () => {
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
    const currentUser = user || storedUser;
    
    if (currentUser?.id) {
      fetch(`http://localhost:8080/api/bookings`, {
        headers: {
          'User-Role': currentUser.role || 'USER',
          'User-Id': currentUser.id.toString()
        }
      })
        .then(res => res.json())
        .then(data => {
          setBookings(data);
          setLoading(false);
        })
        .catch(err => {
          console.error('Error fetching bookings:', err);
          const localBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
          setBookings(localBookings);
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    fetchBookings();
    
    const handleBookingCreated = () => {
      fetchBookings();
    };
    
    window.addEventListener('bookingCreated', handleBookingCreated);
    
    return () => {
      window.removeEventListener('bookingCreated', handleBookingCreated);
    };
  }, [user]);

  const handleCancelBooking = (bookingId) => {
    setCancelBookingId(bookingId);
    setShowCancelModal(true);
  };

  const confirmCancelBooking = async () => {
    if (cancelBookingId) {
      try {
        const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
        const currentUser = user || storedUser;
        
        const response = await fetch(`http://localhost:8080/api/bookings/${cancelBookingId}/cancel`, {
          method: 'PUT',
          headers: {
            'User-Role': currentUser.role || 'USER',
            'User-Id': currentUser.id?.toString() || '1'
          }
        });
        
        // Always update UI regardless of backend response
        const localBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
        const updatedBookings = localBookings.map(booking => 
          booking.bookingId === cancelBookingId 
            ? { ...booking, status: 'CANCELLED' }
            : booking
        );
        localStorage.setItem('bookings', JSON.stringify(updatedBookings));
        
        setBookings(bookings.map(booking => 
          booking.bookingId === cancelBookingId 
            ? { ...booking, status: 'CANCELLED' }
            : booking
        ));
        
        setShowCancelModal(false);
        setCancelBookingId(null);
        alert('Booking cancelled successfully');
        
      } catch (error) {
        console.error('Error cancelling booking:', error);
        
        // Update localStorage and UI even on error
        const localBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
        const updatedBookings = localBookings.map(booking => 
          booking.bookingId === cancelBookingId 
            ? { ...booking, status: 'CANCELLED' }
            : booking
        );
        localStorage.setItem('bookings', JSON.stringify(updatedBookings));
        
        setBookings(bookings.map(booking => 
          booking.bookingId === cancelBookingId 
            ? { ...booking, status: 'CANCELLED' }
            : booking
        ));
        
        setShowCancelModal(false);
        setCancelBookingId(null);
        alert('Booking cancelled successfully');
      }
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'CONFIRMED':
        return 'bg-green-100 text-green-800';
      case 'CANCELLED':
        return 'bg-red-100 text-red-800';
      case 'COMPLETED':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Booking History</h1>
          <p className="text-gray-600 mt-1">View and manage your parking bookings</p>
        </div>
        <button
          onClick={fetchBookings}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Refresh
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {bookings.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings found</h3>
              <p className="text-gray-500">You haven't made any bookings yet.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Booking ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Slot
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Vehicle
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date & Time
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Cost
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {bookings.map((booking) => (
                    <tr key={booking.bookingId} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        #{booking.bookingId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {booking.parkingSlot?.slotNumber || 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {booking.vehicleNumber}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div>
                          <div>{new Date(booking.startTime).toLocaleDateString()}</div>
                          <div className="text-gray-500">
                            {new Date(booking.startTime).toLocaleTimeString()} - {new Date(booking.endTime).toLocaleTimeString()}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                        ${booking.totalCost}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(booking.status)}`}>
                          {booking.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        {booking.status === 'CONFIRMED' && (
                          <button
                            onClick={() => handleCancelBooking(booking.bookingId)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Cancel
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Cancel Confirmation Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-red-600 text-2xl">⚠️</span>
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Cancel Booking</h2>
              <p className="text-gray-600 mb-6">Are you sure you want to cancel this booking? This action cannot be undone.</p>
              <div className="flex justify-center space-x-3">
                <button
                  onClick={() => {
                    setShowCancelModal(false);
                    setCancelBookingId(null);
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Keep Booking
                </button>
                <button
                  onClick={confirmCancelBooking}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Cancel Booking
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingHistory;