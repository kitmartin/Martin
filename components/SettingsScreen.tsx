import React, { useState } from 'react';
import { ArrowLeftIcon } from './icons';

interface SettingsScreenProps {
    onBack: () => void;
}

interface SettingsToggleProps {
    label: string;
    description: string;
    initialValue?: boolean;
}

const SettingsToggle: React.FC<SettingsToggleProps> = ({ label, description, initialValue = false }) => {
    const [isEnabled, setIsEnabled] = useState(initialValue);

    return (
        <div className="flex items-center justify-between py-4">
            <div className="flex-grow">
                <p className="text-base font-medium text-gray-800">{label}</p>
                <p className="text-sm text-gray-500">{description}</p>
            </div>
            <button
                type="button"
                onClick={() => setIsEnabled(!isEnabled)}
                className={`${
                    isEnabled ? 'bg-green-600' : 'bg-gray-200'
                } relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500`}
                role="switch"
                aria-checked={isEnabled}
            >
                <span
                    aria-hidden="true"
                    className={`${
                        isEnabled ? 'translate-x-5' : 'translate-x-0'
                    } pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
                />
            </button>
        </div>
    );
};

const SettingsScreen: React.FC<SettingsScreenProps> = ({ onBack }) => {
    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <div className="flex items-center mb-6">
                <button 
                    onClick={onBack} 
                    className="p-2 rounded-full hover:bg-gray-100 mr-4"
                    aria-label="Go back"
                >
                    <ArrowLeftIcon className="h-6 w-6 text-gray-700" />
                </button>
                <h2 className="text-3xl font-bold text-gray-900">Settings</h2>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm">
                <div className="px-6 divide-y divide-gray-200">
                    <h3 className="text-lg font-semibold text-gray-800 pt-4 pb-2">Notifications</h3>
                    <SettingsToggle
                        label="New Comments"
                        description="Notify me when someone comments on my posts."
                        initialValue={true}
                    />
                    <SettingsToggle
                        label="New Likes"
                        description="Notify me when someone likes my posts."
                        initialValue={true}
                    />
                    <SettingsToggle
                        label="Rental Requests"
                        description="Notify me about new requests for my machines."
                        initialValue={true}
                    />
                    <SettingsToggle
                        label="Promotional Updates"
                        description="Receive news and special offers from AgriRent Connect."
                    />
                </div>
            </div>
        </div>
    );
};

export default SettingsScreen;
