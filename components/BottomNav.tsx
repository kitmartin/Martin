import React from 'react';
import { HomeIcon, CommunityIcon, SearchIcon, UserIcon } from './icons';
import { Tab } from '../types';

interface BottomNavProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange }) => {
  const navItems = [
    { id: Tab.Home, label: 'Home', icon: HomeIcon },
    { id: Tab.Community, label: 'Community', icon: CommunityIcon },
    { id: Tab.Search, label: 'Search', icon: SearchIcon },
    { id: Tab.Profile, label: 'Profile', icon: UserIcon },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-30">
      <div className="max-w-3xl mx-auto flex justify-around h-16">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`relative flex flex-col items-center justify-center w-full text-sm font-medium transition-colors duration-200 ${
                isActive ? 'text-green-600' : 'text-gray-500 hover:text-green-500'
              }`}
            >
              <item.icon className="h-6 w-6 mb-1" />
              <span>{item.label}</span>
              {isActive && (
                <div className="absolute bottom-0 h-1 w-16 bg-green-600 rounded-t-full"></div>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
