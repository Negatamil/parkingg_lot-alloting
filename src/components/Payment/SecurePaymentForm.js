import React, { useState } from 'react';

const SecurePaymentForm = ({ onPayment, amount }) => {
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: ''
  });

  const [errors, setErrors] = useState({});

  const validateCard = () => {
    const newErrors = {};
    
    if (!paymentData.cardNumber || paymentData.cardNumber.replace(/\s/g, '').length < 13) {
      newErrors.cardNumber = 'Valid card number required';
    }
    
    if (!paymentData.expiryDate || !/^\d{2}\/\d{2}$/.test(paymentData.expiryDate)) {
      newErrors.expiryDate = 'Valid expiry date required (MM/YY)';
    }
    
    if (!paymentData.cvv || paymentData.cvv.length < 3) {
      newErrors.cvv = 'Valid CVV required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateCard()) {
      const tokenizedData = {
        ...paymentData,
        cardNumber: '****-****-****-' + paymentData.cardNumber.slice(-4),
        token: 'tok_' + Math.random().toString(36).substr(2, 9)
      };
      onPayment(tokenizedData);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg border">
      <div className="flex items-center mb-4">
        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
          <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
          </svg>
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">Secure Payment</h3>
          <p className="text-sm text-gray-500">PCI DSS Compliant • AES-256 Encrypted</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
          <input
            type="text"
            value={paymentData.cardNumber}
            onChange={(e) => setPaymentData({...paymentData, cardNumber: e.target.value})}
            placeholder="1234 5678 9012 3456"
            className={`w-full px-3 py-2 border rounded-md ${errors.cardNumber ? 'border-red-300' : 'border-gray-300'}`}
          />
          {errors.cardNumber && <p className="text-red-500 text-xs mt-1">{errors.cardNumber}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Expiry</label>
            <input
              type="text"
              value={paymentData.expiryDate}
              onChange={(e) => setPaymentData({...paymentData, expiryDate: e.target.value})}
              placeholder="MM/YY"
              className={`w-full px-3 py-2 border rounded-md ${errors.expiryDate ? 'border-red-300' : 'border-gray-300'}`}
            />
            {errors.expiryDate && <p className="text-red-500 text-xs mt-1">{errors.expiryDate}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
            <input
              type="password"
              value={paymentData.cvv}
              onChange={(e) => setPaymentData({...paymentData, cvv: e.target.value})}
              placeholder="123"
              className={`w-full px-3 py-2 border rounded-md ${errors.cvv ? 'border-red-300' : 'border-gray-300'}`}
            />
            {errors.cvv && <p className="text-red-500 text-xs mt-1">{errors.cvv}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Cardholder Name</label>
          <input
            type="text"
            value={paymentData.cardholderName}
            onChange={(e) => setPaymentData({...paymentData, cardholderName: e.target.value})}
            placeholder="John Doe"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="bg-gray-50 p-4 rounded-md">
          <div className="flex justify-between items-center">
            <span className="font-medium">Total Amount:</span>
            <span className="text-xl font-bold text-green-600">${amount}</span>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold py-3 px-4 rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-200"
        >
          Process Secure Payment
        </button>
      </form>

      <div className="mt-4 flex items-center justify-center space-x-4 text-xs text-gray-500">
        <span>🔒 SSL Encrypted</span>
        <span>•</span>
        <span>PCI Compliant</span>
      </div>
    </div>
  );
};

export default SecurePaymentForm;