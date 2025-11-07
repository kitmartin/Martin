import React from 'react';
import { Machine } from '../types';
import { LocationMarkerIcon } from './icons';

interface MachineCardProps {
  machine: Machine;
}

const MachineCard: React.FC<MachineCardProps> = ({ machine }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 ease-in-out">
      <img className="h-48 w-full object-cover" src={machine.imageUrl} alt={machine.name} />
      <div className="p-6">
        <div className="flex justify-between items-start">
            <h3 className="text-xl font-semibold text-gray-800 mb-2 flex-1">{machine.name}</h3>
            <div className="flex items-center text-sm text-gray-500 ml-2 flex-shrink-0">
                <LocationMarkerIcon className="h-4 w-4 mr-1"/>
                <span>{machine.location}</span>
            </div>
        </div>
        <p className="text-gray-600 mb-4">
          <span className="text-2xl font-bold text-green-600">${machine.pricePerDay}</span> / day
        </p>
        <button
          onClick={() => alert(`Renting ${machine.name}`)}
          className="w-full bg-green-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-colors duration-200"
        >
          Rent Now
        </button>
      </div>
    </div>
  );
};

export default MachineCard;
