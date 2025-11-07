import React from 'react';
import { SearchIcon } from './icons';

const SearchScreen: React.FC = () => {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Search</h2>
      
      <div className="relative mb-8">
        <input
          type="text"
          placeholder="Search machines, posts, users..."
          className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-full shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
        />
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <SearchIcon className="h-6 w-6 text-gray-400" />
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Suggestions</h3>
        <div className="flex flex-wrap gap-3">
            <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full font-medium cursor-pointer hover:bg-green-200">Tractors</span>
            <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full font-medium cursor-pointer hover:bg-green-200">Harvesting</span>
            <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full font-medium cursor-pointer hover:bg-green-200">#community</span>
            <span className="bg-gray-100 text-gray-800 px-4 py-2 rounded-full font-medium cursor-pointer hover:bg-gray-200">John Deere</span>
        </div>
      </div>

      <div className="mt-10 text-center">
        <p className="text-gray-500">
            Enter a keyword to search for equipment, community posts, or people.
        </p>
      </div>
    </div>
  );
};

export default SearchScreen;
