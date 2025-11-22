import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const Payment = () => {
  const { user } = useSelector((state) => state.auth);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = () => {
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
    const currentUser = user || storedUser;
    
    // Mock payment data for now
    const mockPayments = [
      {
        paymentId: 1,
        bookingId: 1,
        amount: 25.00,
        paymentMethod: 'Credit Card',
        paymentStatus: 'COMPLETED',
        paymentDate: new Date().toISOString(),
        transactionId: 'TXN001'
      },
      {
        paymentId: 2,
        bookingId: 2,
        amount: 15.00,
        paymentMethod: 'Digital Wallet',
        paymentStatus: 'PENDING',
        paymentDate: new Date().toISOString(),
        transactionId: 'TXN002'
      }
    ];
    
    setPayments(mockPayments);
    setLoading(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'COMPLETED':
        return 'bg-green-100 text-green-800';
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800';
      case 'FAILED':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getMethodIcon = (method) => {
    switch (method) {
      case 'Credit Card':
        return '💳';
      case 'Digital Wallet':
        return '📱';
      case 'Cash':
        return '💵';
      default:
        return '💰';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Payment History</h1>
          <p className="text-gray-600 mt-1">View your payment transactions and receipts</p>
        </div>
        <button
          onClick={fetchPayments}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Refresh
        </button>
      </div>

      {/* Payment Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <span className="text-green-600">💰</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Spent</p>
              <p className="text-2xl font-semibold text-gray-900">
                ${payments.reduce((sum, payment) => sum + payment.amount, 0).toFixed(2)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-blue-600">📊</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Payments</p>
              <p className="text-2xl font-semibold text-gray-900">{payments.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
              <span className="text-yellow-600">⏳</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-2xl font-semibold text-gray-900">
                {payments.filter(p => p.paymentStatus === 'PENDING').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Payment History Table */}
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Payment History ({payments.length})</h3>
          </div>
          
          {payments.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-900 mb-2">No payments found</h3>
              <p className="text-gray-500">You haven't made any payments yet.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Payment ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Booking
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Method
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Transaction ID
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {payments.map((payment) => (
                    <tr key={payment.paymentId} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        #{payment.paymentId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        Booking #{payment.bookingId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                        ${payment.amount.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div className="flex items-center">
                          <span className="mr-2">{getMethodIcon(payment.paymentMethod)}</span>
                          {payment.paymentMethod}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(payment.paymentStatus)}`}>
                          {payment.paymentStatus}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(payment.paymentDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {payment.transactionId}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Payment Methods */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Available Payment Methods</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center p-4 border border-gray-200 rounded-lg">
            <span className="text-2xl mr-3">💳</span>
            <div>
              <p className="font-medium text-gray-900">Credit Card</p>
              <p className="text-sm text-gray-500">Visa, MasterCard, Amex</p>
            </div>
          </div>
          <div className="flex items-center p-4 border border-gray-200 rounded-lg">
            <span className="text-2xl mr-3">📱</span>
            <div>
              <p className="font-medium text-gray-900">Digital Wallet</p>
              <p className="text-sm text-gray-500">PayPal, Apple Pay, Google Pay</p>
            </div>
          </div>
          <div className="flex items-center p-4 border border-gray-200 rounded-lg">
            <span className="text-2xl mr-3">💵</span>
            <div>
              <p className="font-medium text-gray-900">Cash</p>
              <p className="text-sm text-gray-500">Pay at the facility</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;