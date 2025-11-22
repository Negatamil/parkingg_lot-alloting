import React, { useState, useEffect } from 'react';

const SmartParkingFeatures = () => {
  const [smartMetrics, setSmartMetrics] = useState({
    autoAssignments: 89,
    pricingOptimization: 15.3,
    predictiveAccuracy: 94.2,
    iotSensors: 156,
    mlOptimizations: 23
  });

  const [automationSettings, setAutomationSettings] = useState({
    autoSlotAssignment: true,
    smartPricing: true,
    predictiveBooking: true,
    smartNotifications: true,
    iotIntegration: true
  });

  const [realtimeData, setRealtimeData] = useState({
    occupancyRate: 67,
    avgBookingTime: 2.1,
    peakHours: '2:00 PM - 4:00 PM',
    optimalPrice: 8.50
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setRealtimeData(prev => ({
        ...prev,
        occupancyRate: Math.max(20, Math.min(95, prev.occupancyRate + (Math.random() - 0.5) * 10)),
        avgBookingTime: Math.max(1.0, Math.min(5.0, prev.avgBookingTime + (Math.random() - 0.5) * 0.5)),
        optimalPrice: Math.max(5.0, Math.min(15.0, prev.optimalPrice + (Math.random() - 0.5) * 1.0))
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleToggle = (setting) => {
    setAutomationSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Smart Parking Features</h1>
          <p className="text-gray-600">Advanced automation and AI-powered parking management</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-gray-600">AI Systems Active</span>
        </div>
      </div>

      {/* Smart Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-600">Auto Assignments</p>
              <p className="text-xl font-bold text-blue-600">{smartMetrics.autoAssignments}%</p>
            </div>
            <div className="text-2xl">🎯</div>
          </div>
        </div>

        <div className="card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-600">Price Optimization</p>
              <p className="text-xl font-bold text-green-600">+{smartMetrics.pricingOptimization}%</p>
            </div>
            <div className="text-2xl">💰</div>
          </div>
        </div>

        <div className="card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-600">Prediction Accuracy</p>
              <p className="text-xl font-bold text-purple-600">{smartMetrics.predictiveAccuracy}%</p>
            </div>
            <div className="text-2xl">🔮</div>
          </div>
        </div>

        <div className="card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-600">IoT Sensors</p>
              <p className="text-xl font-bold text-orange-600">{smartMetrics.iotSensors}</p>
            </div>
            <div className="text-2xl">📡</div>
          </div>
        </div>

        <div className="card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-600">ML Optimizations</p>
              <p className="text-xl font-bold text-red-600">{smartMetrics.mlOptimizations}</p>
            </div>
            <div className="text-2xl">🤖</div>
          </div>
        </div>
      </div>

      {/* Real-time Intelligence */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Real-time Intelligence</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">Current Occupancy</p>
                <p className="text-sm text-gray-600">Live facility utilization</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-blue-600">{realtimeData.occupancyRate}%</p>
                <div className="w-20 bg-gray-200 rounded-full h-2 mt-1">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-1000" 
                    style={{ width: `${realtimeData.occupancyRate}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">Avg Booking Time</p>
                <p className="text-sm text-gray-600">AI-optimized processing</p>
              </div>
              <p className="text-2xl font-bold text-green-600">{realtimeData.avgBookingTime.toFixed(1)}s</p>
            </div>

            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">Peak Hours</p>
                <p className="text-sm text-gray-600">Predicted demand</p>
              </div>
              <p className="text-sm font-bold text-purple-600">{realtimeData.peakHours}</p>
            </div>

            <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">Optimal Price</p>
                <p className="text-sm text-gray-600">Dynamic pricing</p>
              </div>
              <p className="text-2xl font-bold text-orange-600">${realtimeData.optimalPrice.toFixed(2)}</p>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Automation Controls</h3>
          <div className="space-y-4">
            {Object.entries(automationSettings).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">
                    {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                  </p>
                  <p className="text-sm text-gray-600">
                    {key === 'autoSlotAssignment' && 'Intelligent slot matching'}
                    {key === 'smartPricing' && 'Dynamic price optimization'}
                    {key === 'predictiveBooking' && 'Availability forecasting'}
                    {key === 'smartNotifications' && 'Contextual user alerts'}
                    {key === 'iotIntegration' && 'Sensor data processing'}
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={value}
                    onChange={() => handleToggle(key)}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Insights */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">AI-Generated Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border border-blue-200">
            <div className="flex items-center mb-2">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                <span className="text-white text-sm">💡</span>
              </div>
              <h4 className="font-semibold text-blue-900">Optimization Opportunity</h4>
            </div>
            <p className="text-sm text-blue-800">
              Increase pricing by 12% during 2-4 PM to optimize revenue based on demand patterns.
            </p>
          </div>

          <div className="p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg border border-green-200">
            <div className="flex items-center mb-2">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
                <span className="text-white text-sm">📈</span>
              </div>
              <h4 className="font-semibold text-green-900">Performance Insight</h4>
            </div>
            <p className="text-sm text-green-800">
              Auto-assignment feature improved user satisfaction by 23% this week.
            </p>
          </div>

          <div className="p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg border border-purple-200">
            <div className="flex items-center mb-2">
              <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center mr-3">
                <span className="text-white text-sm">🔮</span>
              </div>
              <h4 className="font-semibold text-purple-900">Prediction Alert</h4>
            </div>
            <p className="text-sm text-purple-800">
              High demand expected tomorrow 3-5 PM. Consider enabling surge pricing.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartParkingFeatures;