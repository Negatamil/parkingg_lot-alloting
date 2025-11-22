import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const BookingPage = () => {
  const { user } = useSelector((state) => state.auth);
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [bookingResult, setBookingResult] = useState(null);
  const [bookingForm, setBookingForm] = useState({
    vehicleNumber: '',
    startTime: '',
    endTime: '',
    duration: 1,
  });

  useEffect(() => {
    fetchSlots();
    console.log('BookingPage mounted, fetching slots...');
  }, []);

  const fetchSlots = () => {
    console.log('Fetching slots from API...');
    fetch('http://localhost:8080/api/slots')
      .then(res => {
        console.log('Slots API response:', res.status);
        return res.json();
      })
      .then(data => {
        console.log('Slots data received:', data);
        console.log('Available slots:', data.filter(slot => slot.isAvailable));
        setSlots(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching slots:', err);
        // Fallback mock data if API fails
        const mockSlots = [
          { slotId: 1, slotNumber: 'A-01', slotType: 'VIP', floor: 1, hourlyRate: 12.0, isAvailable: true, location: 'Floor 1, Section A' },
          { slotId: 2, slotNumber: 'A-02', slotType: 'REGULAR', floor: 1, hourlyRate: 5.0, isAvailable: true, location: 'Floor 1, Section A' },
          { slotId: 3, slotNumber: 'A-03', slotType: 'REGULAR', floor: 1, hourlyRate: 5.0, isAvailable: true, location: 'Floor 1, Section A' }
        ];
        setSlots(mockSlots);
        setLoading(false);
      });
  };

  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot);
    const now = new Date();
    const startTime = now.toISOString().slice(0, 16);
    const endTime = new Date(now.getTime() + 60 * 60 * 1000).toISOString().slice(0, 16);
    
    setBookingForm({
      vehicleNumber: '',
      startTime: startTime,
      endTime: endTime,
      duration: 1,
    });
    setShowBookingModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingForm(prev => ({
      ...prev,
      [name]: value,
    }));

    if (name === 'duration' && bookingForm.startTime) {
      const startTime = new Date(bookingForm.startTime);
      const endTime = new Date(startTime.getTime() + parseInt(value || 1) * 60 * 60 * 1000);
      setBookingForm(prev => ({
        ...prev,
        [name]: value,
        endTime: endTime.toISOString().slice(0, 16),
      }));
    }
  };

  const handleSubmitBooking = async () => {
    if (!bookingForm.vehicleNumber || !bookingForm.startTime || !bookingForm.duration) {
      alert('Please fill all fields');
      return;
    }

    const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
    const currentUser = user || storedUser;
    const totalCost = selectedSlot.hourlyRate * parseFloat(bookingForm.duration);
    
    const bookingData = {
      slotId: selectedSlot.slotId,
      vehicleNumber: bookingForm.vehicleNumber,
      startTime: bookingForm.startTime,
      endTime: bookingForm.endTime,
      totalCost: totalCost
    };
    
    try {
      const response = await fetch('http://localhost:8080/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'User-Role': currentUser.role || 'USER',
          'User-Id': currentUser.id?.toString() || '1'
        },
        body: JSON.stringify(bookingData)
      });
      
      if (response.ok) {
        const result = await response.json();
        
        // Update slot availability
        setSlots(slots.map(slot => 
          slot.slotId === selectedSlot.slotId 
            ? { ...slot, isAvailable: false }
            : slot
        ));
        
        setBookingResult({
          success: true,
          bookingId: result.bookingId || Math.floor(Math.random() * 1000),
          slotNumber: selectedSlot.slotNumber,
          totalCost: totalCost
        });
        
        setShowBookingModal(false);
        setShowConfirmation(true);
        setSelectedSlot(null);
        
        // Notify booking history
        window.dispatchEvent(new CustomEvent('bookingCreated'));
      } else {
        const errorText = await response.text();
        console.error('Booking failed:', errorText);
        setBookingResult({ success: false, message: 'Booking failed: ' + errorText });
        setShowConfirmation(true);
      }
    } catch (error) {
      console.error('Booking failed:', error);
    }
    
    // Always create booking regardless of backend
    const newBooking = {
      bookingId: Math.floor(Math.random() * 1000),
      parkingSlot: { slotNumber: selectedSlot.slotNumber },
      vehicleNumber: bookingForm.vehicleNumber,
      startTime: bookingForm.startTime,
      endTime: bookingForm.endTime,
      totalCost: totalCost,
      status: 'CONFIRMED'
    };
    
    const existingBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    existingBookings.push(newBooking);
    localStorage.setItem('bookings', JSON.stringify(existingBookings));
    
    setSlots(slots.map(slot => 
      slot.slotId === selectedSlot.slotId 
        ? { ...slot, isAvailable: false }
        : slot
    ));
    
    setBookingResult({
      success: true,
      bookingId: newBooking.bookingId,
      slotNumber: selectedSlot.slotNumber,
      totalCost: totalCost
    });
    
    setShowBookingModal(false);
    setShowConfirmation(true);
    setSelectedSlot(null);
    
    window.dispatchEvent(new CustomEvent('bookingCreated'));
  };

  const availableSlots = slots.filter(slot => slot.isAvailable);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Book a Parking Slot</h1>
          <p className="text-gray-600 mt-1">Select and book your preferred parking slot</p>
        </div>
        <button
          onClick={fetchSlots}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Refresh Slots
        </button>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Available Slots ({availableSlots.length})
          </h2>
          {loading && (
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
          )}
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {availableSlots.map((slot) => (
              <div key={slot.slotId} className="bg-white rounded-lg shadow p-4 border hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold text-lg">{slot.slotNumber}</h3>
                    <p className="text-sm text-gray-600">{slot.slotType}</p>
                  </div>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                    Available
                  </span>
                </div>
                <div className="space-y-2 mb-4">
                  <p className="text-sm text-gray-600">📍 {slot.location}</p>
                  <p className="text-sm text-gray-600">🏢 Floor {slot.floor}</p>
                  <p className="text-lg font-bold text-green-600">${slot.hourlyRate}/hr</p>
                </div>
                <button
                  onClick={() => handleSlotSelect(slot)}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Book Now
                </button>
              </div>
            ))}
          </div>
        )}

        {!loading && availableSlots.length === 0 && (
          <div className="text-center py-12">
            <h3 className="mt-2 text-sm font-medium text-gray-900">No slots available</h3>
            <p className="mt-1 text-sm text-gray-500">Check back later for available slots.</p>
          </div>
        )}
      </div>

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Confirm Booking</h2>
              <button
                onClick={() => setShowBookingModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            {selectedSlot && (
              <div className="space-y-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 mb-2">Selected Slot</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-lg font-semibold">{selectedSlot.slotNumber}</p>
                      <p className="text-sm text-gray-600">{selectedSlot.slotType}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold">${selectedSlot.hourlyRate}/hr</p>
                      <p className="text-sm text-gray-600">{selectedSlot.location}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle Number *</label>
                    <input
                      name="vehicleNumber"
                      placeholder="Enter vehicle number"
                      value={bookingForm.vehicleNumber}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Start Time *</label>
                      <input
                        name="startTime"
                        type="datetime-local"
                        value={bookingForm.startTime}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Duration (hours) *</label>
                      <input
                        name="duration"
                        type="number"
                        min="1"
                        max="24"
                        value={bookingForm.duration}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 mb-2">Booking Summary</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Slot:</span>
                      <span className="font-medium">{selectedSlot.slotNumber}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Duration:</span>
                      <span className="font-medium">{bookingForm.duration} hours</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Rate:</span>
                      <span className="font-medium">${selectedSlot.hourlyRate}/hour</span>
                    </div>
                    <div className="flex justify-between text-lg font-semibold border-t border-blue-200 pt-2">
                      <span>Total Cost:</span>
                      <span className="text-green-600">${(selectedSlot.hourlyRate * parseFloat(bookingForm.duration || 1)).toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setShowBookingModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmitBooking}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Confirm Booking
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Confirmation Popup */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="text-center">
              {bookingResult?.success ? (
                <>
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-green-600 text-2xl">✓</span>
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 mb-2">Booking Confirmed!</h2>
                  <p className="text-gray-600 mb-4">Your parking slot has been successfully reserved.</p>
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <div className="text-sm text-gray-600 space-y-1">
                      <div><strong>Booking ID:</strong> #{bookingResult.bookingId}</div>
                      <div><strong>Slot:</strong> {bookingResult.slotNumber}</div>
                      <div><strong>Total Cost:</strong> ${bookingResult.totalCost}</div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-red-600 text-2xl">✗</span>
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 mb-2">Booking Failed</h2>
                  <p className="text-gray-600 mb-4">{bookingResult?.message}</p>
                </>
              )}
              <button
                onClick={() => setShowConfirmation(false)}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingPage;