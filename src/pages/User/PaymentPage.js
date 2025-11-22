import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../components/UI/Button';
import Input from '../../components/UI/Input';
import Modal from '../../components/UI/Modal';
import SecurePaymentForm from '../../components/Payment/SecurePaymentForm';

const PaymentPage = () => {
  const dispatch = useDispatch();
  const { bookings } = useSelector((state) => state.bookings);
  
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('CREDIT_CARD');
  const [paymentForm, setPaymentForm] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
  });
  const [formErrors, setFormErrors] = useState({});
  const [processingPayment, setProcessingPayment] = useState(false);

  // Get bookings that need payment
  const unpaidBookings = bookings.filter(booking => 
    booking.status === 'CONFIRMED' || booking.status === 'ACTIVE'
  );

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
    setFormErrors({});
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentForm(prev => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validatePaymentForm = () => {
    const errors = {};

    if (paymentMethod === 'CREDIT_CARD' || paymentMethod === 'DEBIT_CARD') {
      if (!paymentForm.cardNumber) {
        errors.cardNumber = 'Card number is required';
      } else if (!/^\d{16}$/.test(paymentForm.cardNumber.replace(/\s/g, ''))) {
        errors.cardNumber = 'Please enter a valid 16-digit card number';
      }

      if (!paymentForm.expiryDate) {
        errors.expiryDate = 'Expiry date is required';
      } else if (!/^\d{2}\/\d{2}$/.test(paymentForm.expiryDate)) {
        errors.expiryDate = 'Please enter expiry date in MM/YY format';
      }

      if (!paymentForm.cvv) {
        errors.cvv = 'CVV is required';
      } else if (!/^\d{3,4}$/.test(paymentForm.cvv)) {
        errors.cvv = 'Please enter a valid CVV';
      }

      if (!paymentForm.cardholderName.trim()) {
        errors.cardholderName = 'Cardholder name is required';
      }
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleProcessPayment = async () => {
    if (!validatePaymentForm()) return;

    setProcessingPayment(true);

    // Simulate payment processing
    setTimeout(() => {
      setProcessingPayment(false);
      setShowPaymentModal(false);
      setPaymentForm({
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        cardholderName: '',
      });
      // Show success message
      alert('Payment processed successfully!');
    }, 2000);
  };

  const formatDateTime = (dateTime) => {
    return new Date(dateTime).toLocaleString();
  };

  const getBookingStatusColor = (status) => {
    switch (status) {
      case 'CONFIRMED':
        return 'bg-blue-100 text-blue-800';
      case 'ACTIVE':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Payments</h1>
          <p className="text-gray-600 mt-1">Manage your parking payments</p>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="card p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Payment Methods</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border border-gray-200 rounded-lg p-4 hover:border-primary-300 cursor-pointer">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-blue-600 font-bold">💳</span>
              </div>
              <div>
                <p className="font-medium text-gray-900">Credit Card</p>
                <p className="text-sm text-gray-600">Visa, Mastercard, Amex</p>
              </div>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg p-4 hover:border-primary-300 cursor-pointer">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-green-600 font-bold">📱</span>
              </div>
              <div>
                <p className="font-medium text-gray-900">Digital Wallet</p>
                <p className="text-sm text-gray-600">Apple Pay, Google Pay</p>
              </div>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg p-4 hover:border-primary-300 cursor-pointer">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                <span className="text-gray-600 font-bold">💰</span>
              </div>
              <div>
                <p className="font-medium text-gray-900">Cash</p>
                <p className="text-sm text-gray-600">Pay at facility</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Outstanding Payments */}
      <div className="card overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Outstanding Payments</h2>
        </div>

        {unpaidBookings.length === 0 ? (
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No outstanding payments</h3>
            <p className="mt-1 text-sm text-gray-500">All your bookings are paid for.</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {unpaidBookings.map((booking) => (
              <div key={booking.bookingId} className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                      <span className="text-primary-600 font-bold">🚗</span>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">
                        Booking #{booking.bookingId}
                      </h3>
                      <p className="text-sm text-gray-600">
                        Slot {booking.parkingSlot?.slotNumber} • {booking.vehicleNumber}
                      </p>
                      <p className="text-sm text-gray-600">
                        {formatDateTime(booking.startTime)} - {formatDateTime(booking.endTime)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="text-lg font-semibold text-gray-900">
                        ${booking.totalCost}
                      </p>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getBookingStatusColor(booking.status)}`}>
                        {booking.status}
                      </span>
                    </div>
                    <Button
                      variant="primary"
                      onClick={() => {
                        setSelectedBooking(booking);
                        setShowPaymentModal(true);
                      }}
                    >
                      Pay Now
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Payment Modal */}
      <Modal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        title="Complete Payment"
        size="lg"
      >
        {selectedBooking && (
          <div className="space-y-6">
            {/* Payment Summary */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">Payment Summary</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Booking:</span>
                  <span className="font-medium">#{selectedBooking.bookingId}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Slot:</span>
                  <span className="font-medium">{selectedBooking.parkingSlot?.slotNumber}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Vehicle:</span>
                  <span className="font-medium">{selectedBooking.vehicleNumber}</span>
                </div>
                <div className="flex justify-between text-lg font-semibold border-t border-gray-200 pt-2">
                  <span>Total Amount:</span>
                  <span>${selectedBooking.totalCost}</span>
                </div>
              </div>
            </div>

            {/* Payment Method Selection */}
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Payment Method</h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: 'CREDIT_CARD', label: 'Credit Card', icon: '💳' },
                  { value: 'DEBIT_CARD', label: 'Debit Card', icon: '💳' },
                  { value: 'DIGITAL_WALLET', label: 'Digital Wallet', icon: '📱' },
                  { value: 'CASH', label: 'Cash', icon: '💰' },
                ].map((method) => (
                  <button
                    key={method.value}
                    onClick={() => handlePaymentMethodChange(method.value)}
                    className={`p-3 border rounded-lg text-left transition-colors ${
                      paymentMethod === method.value
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <span className="text-lg mr-2">{method.icon}</span>
                    <span className="font-medium">{method.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Card Details */}
            {(paymentMethod === 'CREDIT_CARD' || paymentMethod === 'DEBIT_CARD') && (
              <div className="space-y-4">
                <h3 className="font-medium text-gray-900">Card Details</h3>
                
                <Input
                  name="cardNumber"
                  label="Card Number"
                  placeholder="1234 5678 9012 3456"
                  value={paymentForm.cardNumber}
                  onChange={handleInputChange}
                  error={formErrors.cardNumber}
                  required
                />

                <div className="grid grid-cols-2 gap-4">
                  <Input
                    name="expiryDate"
                    label="Expiry Date"
                    placeholder="MM/YY"
                    value={paymentForm.expiryDate}
                    onChange={handleInputChange}
                    error={formErrors.expiryDate}
                    required
                  />

                  <Input
                    name="cvv"
                    label="CVV"
                    placeholder="123"
                    value={paymentForm.cvv}
                    onChange={handleInputChange}
                    error={formErrors.cvv}
                    required
                  />
                </div>

                <Input
                  name="cardholderName"
                  label="Cardholder Name"
                  placeholder="John Doe"
                  value={paymentForm.cardholderName}
                  onChange={handleInputChange}
                  error={formErrors.cardholderName}
                  required
                />
              </div>
            )}

            {/* Digital Wallet */}
            {paymentMethod === 'DIGITAL_WALLET' && (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📱</span>
                </div>
                <p className="text-gray-600">Digital wallet payment will be processed securely</p>
              </div>
            )}

            {/* Cash Payment */}
            {paymentMethod === 'CASH' && (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">💰</span>
                </div>
                <p className="text-gray-600">Please pay at the facility when you arrive</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3">
              <Button
                variant="outline"
                onClick={() => setShowPaymentModal(false)}
                disabled={processingPayment}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={handleProcessPayment}
                loading={processingPayment}
              >
                {paymentMethod === 'CASH' ? 'Confirm Cash Payment' : 'Process Payment'}
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default PaymentPage;
