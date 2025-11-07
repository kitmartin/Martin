import React from 'react';
import { TractorIcon, NotificationIcon } from './icons';

interface HeaderProps {
    onNotificationsClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onNotificationsClick }) => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-20">
      <div className="max-w-3xl mx-auto py-3 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <TractorIcon className="h-8 w-8 text-green-600" />
            <h1 className="text-2xl font-bold text-gray-800 tracking-tight">
              AgriRent <span className="text-green-600">Connect</span>
            </h1>
          </div>
          <button 
            onClick={onNotificationsClick}
            className="relative p-2 rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            aria-label="Notifications"
          >
            <NotificationIcon className="h-7 w-7" />
            <span className="absolute top-2 right-2 block h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white"></span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
