import React, { useState, useEffect } from 'react';

const SystemMonitoring = () => {
  const [metrics, setMetrics] = useState({
    cpuUsage: 45,
    memoryUsage: 62,
    diskUsage: 38,
    responseTime: 120,
    uptime: '99.9%',
    activeUsers: 156
  });

  const [alerts] = useState([
    { id: 1, type: 'WARNING', message: 'High memory usage detected', time: '2 min ago' },
    { id: 2, type: 'INFO', message: 'System backup completed', time: '1 hour ago' },
    { id: 3, type: 'ERROR', message: 'Payment gateway timeout', time: '3 hours ago' }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        cpuUsage: Math.max(20, Math.min(80, prev.cpuUsage + (Math.random() - 0.5) * 10)),
        memoryUsage: Math.max(30, Math.min(90, prev.memoryUsage + (Math.random() - 0.5) * 8)),
        responseTime: Math.max(50, Math.min(300, prev.responseTime + (Math.random() - 0.5) * 20))
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getAlertColor = (type) => {
    switch (type) {
      case 'ERROR': return 'bg-red-100 text-red-800 border-red-200';
      case 'WARNING': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  const getMetricColor = (value, thresholds = [50, 80]) => {
    if (value > thresholds[1]) return 'text-red-600';
    if (value > thresholds[0]) return 'text-yellow-600';
    return 'text-green-600';
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">System Monitoring</h1>

      {/* Real-time Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">CPU Usage</p>
              <p className={`text-2xl font-semibold ${getMetricColor(metrics.cpuUsage)}`}>
                {metrics.cpuUsage.toFixed(1)}%
              </p>
            </div>
            <div className="w-16 h-16">
              <svg className="w-16 h-16 transform -rotate-90">
                <circle cx="32" cy="32" r="28" stroke="#e5e7eb" strokeWidth="4" fill="none" />
                <circle 
                  cx="32" cy="32" r="28" 
                  stroke={metrics.cpuUsage > 80 ? "#dc2626" : metrics.cpuUsage > 50 ? "#d97706" : "#059669"}
                  strokeWidth="4" fill="none"
                  strokeDasharray={`${(metrics.cpuUsage / 100) * 175.9} 175.9`}
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Memory Usage</p>
              <p className={`text-2xl font-semibold ${getMetricColor(metrics.memoryUsage)}`}>
                {metrics.memoryUsage.toFixed(1)}%
              </p>
            </div>
            <div className="w-16 h-16">
              <svg className="w-16 h-16 transform -rotate-90">
                <circle cx="32" cy="32" r="28" stroke="#e5e7eb" strokeWidth="4" fill="none" />
                <circle 
                  cx="32" cy="32" r="28" 
                  stroke={metrics.memoryUsage > 80 ? "#dc2626" : metrics.memoryUsage > 50 ? "#d97706" : "#059669"}
                  strokeWidth="4" fill="none"
                  strokeDasharray={`${(metrics.memoryUsage / 100) * 175.9} 175.9`}
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Response Time</p>
              <p className={`text-2xl font-semibold ${getMetricColor(metrics.responseTime, [100, 200])}`}>
                {metrics.responseTime.toFixed(0)}ms
              </p>
            </div>
            <div className="text-3xl">⚡</div>
          </div>
        </div>
      </div>

      {/* System Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">System Status</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">System Uptime</span>
              <span className="font-semibold text-green-600">{metrics.uptime}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Active Users</span>
              <span className="font-semibold">{metrics.activeUsers}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Disk Usage</span>
              <span className="font-semibold text-green-600">{metrics.diskUsage}%</span>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Alerts</h3>
          <div className="space-y-3">
            {alerts.map((alert) => (
              <div key={alert.id} className={`p-3 rounded-lg border ${getAlertColor(alert.type)}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-medium">{alert.type}</span>
                    <p className="text-sm mt-1">{alert.message}</p>
                  </div>
                  <span className="text-xs">{alert.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemMonitoring;