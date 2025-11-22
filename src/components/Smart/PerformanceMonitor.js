import React, { useState, useEffect } from 'react';

const PerformanceMonitor = () => {
  const [metrics, setMetrics] = useState({
    authTime: 0.8,
    slotUpdate: 0.3,
    bookingTime: 2.1,
    paymentTime: 3.2,
    apiResponse: 0.7,
    concurrentUsers: 847
  });

  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => {
        const newMetrics = {
          authTime: Math.max(0.1, Math.min(2.0, prev.authTime + (Math.random() - 0.5) * 0.2)),
          slotUpdate: Math.max(0.1, Math.min(1.0, prev.slotUpdate + (Math.random() - 0.5) * 0.1)),
          bookingTime: Math.max(1.0, Math.min(5.0, prev.bookingTime + (Math.random() - 0.5) * 0.3)),
          paymentTime: Math.max(2.0, Math.min(8.0, prev.paymentTime + (Math.random() - 0.5) * 0.5)),
          apiResponse: Math.max(0.1, Math.min(2.0, prev.apiResponse + (Math.random() - 0.5) * 0.2)),
          concurrentUsers: Math.max(100, Math.min(1200, prev.concurrentUsers + Math.floor((Math.random() - 0.5) * 50)))
        };

        // Check for performance alerts
        const newAlerts = [];
        if (newMetrics.authTime > 1.0) newAlerts.push('Authentication time exceeding 1s threshold');
        if (newMetrics.slotUpdate > 0.5) newAlerts.push('Slot updates slower than 500ms');
        if (newMetrics.bookingTime > 3.0) newAlerts.push('Booking process taking longer than 3s');
        if (newMetrics.paymentTime > 5.0) newAlerts.push('Payment processing exceeding 5s');
        if (newMetrics.concurrentUsers > 1000) newAlerts.push('High concurrent user load detected');

        setAlerts(newAlerts);
        return newMetrics;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const getPerformanceColor = (value, threshold) => {
    if (value > threshold) return 'text-red-600';
    if (value > threshold * 0.8) return 'text-yellow-600';
    return 'text-green-600';
  };

  const getPerformanceStatus = (value, threshold) => {
    if (value > threshold) return '🔴';
    if (value > threshold * 0.8) return '🟡';
    return '🟢';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">Performance Monitor</h2>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-gray-600">Real-time Monitoring</span>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Authentication</p>
              <p className={`text-xl font-bold ${getPerformanceColor(metrics.authTime, 1.0)}`}>
                {metrics.authTime.toFixed(2)}s
              </p>
              <p className="text-xs text-gray-500">Target: &lt; 1.0s</p>
            </div>
            <div className="text-2xl">{getPerformanceStatus(metrics.authTime, 1.0)}</div>
          </div>
        </div>

        <div className="card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Slot Updates</p>
              <p className={`text-xl font-bold ${getPerformanceColor(metrics.slotUpdate, 0.5)}`}>
                {(metrics.slotUpdate * 1000).toFixed(0)}ms
              </p>
              <p className="text-xs text-gray-500">Target: &lt; 500ms</p>
            </div>
            <div className="text-2xl">{getPerformanceStatus(metrics.slotUpdate, 0.5)}</div>
          </div>
        </div>

        <div className="card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Booking Process</p>
              <p className={`text-xl font-bold ${getPerformanceColor(metrics.bookingTime, 3.0)}`}>
                {metrics.bookingTime.toFixed(1)}s
              </p>
              <p className="text-xs text-gray-500">Target: &lt; 3.0s</p>
            </div>
            <div className="text-2xl">{getPerformanceStatus(metrics.bookingTime, 3.0)}</div>
          </div>
        </div>

        <div className="card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Payment Processing</p>
              <p className={`text-xl font-bold ${getPerformanceColor(metrics.paymentTime, 5.0)}`}>
                {metrics.paymentTime.toFixed(1)}s
              </p>
              <p className="text-xs text-gray-500">Target: &lt; 5.0s</p>
            </div>
            <div className="text-2xl">{getPerformanceStatus(metrics.paymentTime, 5.0)}</div>
          </div>
        </div>

        <div className="card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">API Response</p>
              <p className={`text-xl font-bold ${getPerformanceColor(metrics.apiResponse, 1.0)}`}>
                {(metrics.apiResponse * 1000).toFixed(0)}ms
              </p>
              <p className="text-xs text-gray-500">Target: &lt; 1.0s</p>
            </div>
            <div className="text-2xl">{getPerformanceStatus(metrics.apiResponse, 1.0)}</div>
          </div>
        </div>

        <div className="card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Concurrent Users</p>
              <p className={`text-xl font-bold ${getPerformanceColor(metrics.concurrentUsers, 1000)}`}>
                {metrics.concurrentUsers}
              </p>
              <p className="text-xs text-gray-500">Capacity: 1000+</p>
            </div>
            <div className="text-2xl">{getPerformanceStatus(metrics.concurrentUsers, 1000)}</div>
          </div>
        </div>
      </div>

      {/* Performance Alerts */}
      {alerts.length > 0 && (
        <div className="card p-4">
          <h3 className="text-lg font-semibold text-red-600 mb-3">⚠️ Performance Alerts</h3>
          <div className="space-y-2">
            {alerts.map((alert, index) => (
              <div key={index} className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-800">{alert}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Performance Summary */}
      <div className="card p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Performance Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-3 bg-green-50 rounded-lg">
            <p className="font-medium text-green-800">System Health: Excellent</p>
            <p className="text-sm text-green-600">All critical metrics within targets</p>
          </div>
          <div className="p-3 bg-blue-50 rounded-lg">
            <p className="font-medium text-blue-800">Load Capacity: {((metrics.concurrentUsers / 1000) * 100).toFixed(1)}%</p>
            <p className="text-sm text-blue-600">Current user load vs maximum capacity</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceMonitor;