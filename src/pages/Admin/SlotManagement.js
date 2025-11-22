import React, { useState, useEffect } from 'react';

const SlotManagement = () => {
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newSlot, setNewSlot] = useState({
    slotNumber: '',
    slotType: 'REGULAR',
    floor: 1,
    hourlyRate: 5.0,
    location: ''
  });

  useEffect(() => {
    fetchSlots();
  }, []);

  const fetchSlots = () => {
    fetch('http://localhost:8080/api/slots')
      .then(res => res.json())
      .then(data => {
        setSlots(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching slots:', err);
        setLoading(false);
      });
  };

  const handleAddSlot = async () => {
    if (!newSlot.slotNumber || !newSlot.location) {
      alert('Please fill all required fields');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/api/slots', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'User-Role': 'ADMIN',
          'User-Id': '1'
        },
        body: JSON.stringify({
          ...newSlot,
          isAvailable: true
        })
      });

      if (response.ok) {
        fetchSlots(); // Refresh slots
        setShowAddModal(false);
        setNewSlot({
          slotNumber: '',
          slotType: 'REGULAR',
          floor: 1,
          hourlyRate: 5.0,
          location: ''
        });
        alert('Slot added successfully');
      } else {
        alert('Failed to add slot');
      }
    } catch (error) {
      console.error('Error adding slot:', error);
      alert('Error adding slot');
    }
  };

  const handleDeleteSlot = async (slotId) => {
    if (window.confirm('Are you sure you want to delete this slot?')) {
      try {
        const response = await fetch(`http://localhost:8080/api/slots/${slotId}`, {
          method: 'DELETE',
          headers: {
            'User-Role': 'ADMIN',
            'User-Id': '1'
          }
        });
        
        if (response.ok) {
          fetchSlots(); // Refresh slots
          alert('Slot deleted successfully');
        } else {
          alert('Failed to delete slot');
        }
      } catch (error) {
        console.error('Error deleting slot:', error);
        alert('Error deleting slot');
      }
    }
  };

  const toggleSlotAvailability = async (slot) => {
    try {
      const response = await fetch(`http://localhost:8080/api/slots/${slot.slotId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'User-Role': 'ADMIN',
          'User-Id': '1'
        },
        body: JSON.stringify({
          ...slot,
          isAvailable: !slot.isAvailable
        })
      });

      if (response.ok) {
        fetchSlots(); // Refresh slots
      } else {
        alert('Failed to update slot');
      }
    } catch (error) {
      console.error('Error updating slot:', error);
      alert('Error updating slot');
    }
  };

  const getSlotTypeIcon = (type) => {
    switch (type) {
      case 'VIP': return '👑';
      case 'HANDICAPPED': return '♿';
      case 'ELECTRIC_VEHICLE': return '🔌';
      default: return '🚗';
    }
  };

  const getStatusColor = (isAvailable) => {
    return isAvailable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Slot Management</h1>
          <p className="text-gray-600 mt-1">Manage parking slots and availability</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={fetchSlots}
            className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
          >
            Refresh
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Add New Slot
          </button>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-blue-600">🏢</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Slots</p>
              <p className="text-2xl font-semibold text-gray-900">{slots.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <span className="text-green-600">✅</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Available</p>
              <p className="text-2xl font-semibold text-gray-900">
                {slots.filter(slot => slot.isAvailable).length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
              <span className="text-red-600">❌</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Occupied</p>
              <p className="text-2xl font-semibold text-gray-900">
                {slots.filter(slot => !slot.isAvailable).length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
              <span className="text-purple-600">👑</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">VIP Slots</p>
              <p className="text-2xl font-semibold text-gray-900">
                {slots.filter(slot => slot.slotType === 'VIP').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Slots Table */}
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">All Slots ({slots.length})</h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Slot</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rate</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {slots.map((slot) => (
                  <tr key={slot.slotId} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="text-lg mr-2">{getSlotTypeIcon(slot.slotType)}</span>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{slot.slotNumber}</div>
                          <div className="text-sm text-gray-500">Floor {slot.floor}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{slot.slotType}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{slot.location}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">${slot.hourlyRate}/hr</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(slot.isAvailable)}`}>
                        {slot.isAvailable ? 'Available' : 'Occupied'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <button
                        onClick={() => toggleSlotAvailability(slot)}
                        className={`${slot.isAvailable ? 'text-red-600 hover:text-red-900' : 'text-green-600 hover:text-green-900'}`}
                      >
                        {slot.isAvailable ? 'Mark Occupied' : 'Mark Available'}
                      </button>
                      <button
                        onClick={() => handleDeleteSlot(slot.slotId)}
                        className="text-red-600 hover:text-red-900 ml-4"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add Slot Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Add New Slot</h2>
              <button onClick={() => setShowAddModal(false)} className="text-gray-500 hover:text-gray-700">✕</button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Slot Number *</label>
                <input
                  type="text"
                  value={newSlot.slotNumber}
                  onChange={(e) => setNewSlot({...newSlot, slotNumber: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., A-01"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Slot Type</label>
                <select
                  value={newSlot.slotType}
                  onChange={(e) => setNewSlot({...newSlot, slotType: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="REGULAR">Regular</option>
                  <option value="VIP">VIP</option>
                  <option value="HANDICAPPED">Handicapped</option>
                  <option value="ELECTRIC_VEHICLE">Electric Vehicle</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Floor</label>
                <input
                  type="number"
                  value={newSlot.floor}
                  onChange={(e) => setNewSlot({...newSlot, floor: parseInt(e.target.value)})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  min="1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Hourly Rate ($)</label>
                <input
                  type="number"
                  step="0.5"
                  value={newSlot.hourlyRate}
                  onChange={(e) => setNewSlot({...newSlot, hourlyRate: parseFloat(e.target.value)})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location *</label>
                <input
                  type="text"
                  value={newSlot.location}
                  onChange={(e) => setNewSlot({...newSlot, location: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Floor 1, Section A"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleAddSlot}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Add Slot
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SlotManagement;