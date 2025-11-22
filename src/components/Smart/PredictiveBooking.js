import React, { useState, useEffect } from 'react';

const PredictiveBooking = ({ onRecommendation }) => {
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setPredictions([
        {
          time: '2:00 PM - 3:00 PM',
          availability: 85,
          price: 6.50,
          confidence: 94,
          recommendation: 'Optimal'
        },
        {
          time: '3:00 PM - 4:00 PM',
          availability: 45,
          price: 8.50,
          confidence: 89,
          recommendation: 'High Demand'
        },
        {
          time: '4:00 PM - 5:00 PM',
          availability: 25,
          price: 12.00,
          confidence: 92,
          recommendation: 'Peak Hours'
        }
      ]);
      setLoading(false);
    }, 1500);
  }, []);

  const getRecommendationColor = (rec) => {
    switch (rec) {
      case 'Optimal': return 'bg-green-100 text-green-800';
      case 'High Demand': return 'bg-yellow-100 text-yellow-800';
      case 'Peak Hours': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="card p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
          <h3 className="text-lg font-semibold text-gray-900">AI Analyzing...</h3>
        </div>
      </div>
    );
  }

  return (
    <div className="card p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">🤖 AI Recommendations</h3>
      <div className="space-y-3">
        {predictions.map((pred, index) => (
          <div key={index} className="p-4 border rounded-lg">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-semibold">{pred.time}</p>
                <p className="text-sm text-gray-600">Confidence: {pred.confidence}%</p>
              </div>
              <span className={`px-2 py-1 rounded text-xs ${getRecommendationColor(pred.recommendation)}`}>
                {pred.recommendation}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-3">
              <div className="text-center">
                <p className="text-sm text-gray-600">Availability</p>
                <p className="font-bold text-green-600">{pred.availability}%</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600">Price</p>
                <p className="font-bold text-blue-600">${pred.price}</p>
              </div>
              <div className="text-center">
                <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm">
                  Book
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PredictiveBooking;