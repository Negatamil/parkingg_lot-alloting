import React from 'react';
import Button from '../UI/Button';

const SlotCard = ({ slot, onSelect, onViewDetails }) => {
  const getSlotTypeIcon = (type) => {
    switch (type) {
      case 'VIP':
        return '👑';
      case 'HANDICAPPED':
        return '♿';
      case 'ELECTRIC_VEHICLE':
        return '🔌';
      default:
        return '🚗';
    }
  };

  const getSlotTypeColor = (type) => {
    switch (type) {
      case 'VIP':
        return 'bg-purple-100 text-purple-800';
      case 'HANDICAPPED':
        return 'bg-blue-100 text-blue-800';
      case 'ELECTRIC_VEHICLE':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="card p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-2">
          <span className="text-2xl">{getSlotTypeIcon(slot.slotType)}</span>
          <div>
            <h3 className="font-semibold text-lg">{slot.slotNumber}</h3>
            <p className="text-sm text-gray-600">{slot.location}</p>
          </div>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSlotTypeColor(slot.slotType)}`}>
          {slot.slotType.replace('_', ' ')}
        </span>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Rate:</span>
          <span className="font-medium">${slot.hourlyRate}/hour</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Floor:</span>
          <span className="font-medium">{slot.floor}</span>
        </div>
        {slot.features && (
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Features:</span>
            <span className="font-medium text-right">{slot.features}</span>
          </div>
        )}
      </div>

      <div className="flex space-x-2">
        <Button
          variant="primary"
          size="sm"
          className="flex-1"
          onClick={() => onSelect(slot)}
        >
          Book Now
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onViewDetails && onViewDetails(slot)}
        >
          Details
        </Button>
      </div>
    </div>
  );
};

export default SlotCard;