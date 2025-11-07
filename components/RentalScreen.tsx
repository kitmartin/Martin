import React, { useState, useEffect } from 'react';
import { Machine } from '../types';
import MachineCard from './MachineCard';
import { LocationMarkerIcon } from './icons';

interface RentalScreenProps {
  machines: Machine[];
}

const RentalScreen: React.FC<RentalScreenProps> = ({ machines }) => {
  const [filteredMachines, setFilteredMachines] = useState<Machine[]>(machines);
  const [selectedLocation, setSelectedLocation] = useState('All Locations');
  
  const locations = ['All Locations', ...new Set(machines.map(m => m.location))];

  useEffect(() => {
    if (selectedLocation === 'All Locations') {
      setFilteredMachines(machines);
    } else {
      setFilteredMachines(machines.filter(m => m.location === selectedLocation));
    }
  }, [selectedLocation, machines]);


  const handleUseLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // In a real app, you'd use a reverse geocoding service here.
        alert(`Your location: Lat: ${position.coords.latitude}, Lon: ${position.coords.longitude}. Feature to find closest machines coming soon!`);
      },
      () => {
        alert("Could not get your location. Please enable location services in your browser.");
      }
    );
  };

  return (
    <div className="relative">
      <div className="p-4 sm:p-6 lg:p-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Available for Rent</h2>
        
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-grow">
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <select
              id="location"
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md shadow-sm"
            >
              {locations.map(loc => <option key={loc}>{loc}</option>)}
            </select>
          </div>
          <button
            onClick={handleUseLocation}
            className="flex-shrink-0 inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:self-end"
          >
            <LocationMarkerIcon className="h-5 w-5 mr-2" />
            Use My Location
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredMachines.map((machine) => (
            <MachineCard key={machine.id} machine={machine} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RentalScreen;
