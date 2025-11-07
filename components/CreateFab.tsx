import React, { useState } from 'react';
import { PlusIcon, PencilIcon, TractorPlusIcon } from './icons';

interface CreateFabProps {
    onListMachineClick: () => void;
    onCreatePostClick: () => void;
}

const CreateFab: React.FC<CreateFabProps> = ({ onListMachineClick, onCreatePostClick }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => setIsOpen(!isOpen);

    return (
        <div className="fixed bottom-20 right-5 sm:right-10 z-40">
            <div className="relative flex flex-col items-center gap-4">
                {isOpen && (
                    <>
                        <div className="flex items-center gap-3">
                            <span className="bg-white text-sm font-semibold px-3 py-1 rounded-md shadow-md">Create Post</span>
                            <button
                                onClick={() => {
                                    onCreatePostClick();
                                    setIsOpen(false);
                                }}
                                className="bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                aria-label="Create new post"
                            >
                                <PencilIcon className="h-6 w-6" />
                            </button>
                        </div>
                         <div className="flex items-center gap-3">
                            <span className="bg-white text-sm font-semibold px-3 py-1 rounded-md shadow-md">List Machine</span>
                             <button
                                onClick={() => {
                                    onListMachineClick();
                                    setIsOpen(false);
                                }}
                                className="bg-orange-500 text-white p-3 rounded-full shadow-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400"
                                aria-label="List a machine"
                            >
                                <TractorPlusIcon className="h-6 w-6" />
                            </button>
                        </div>
                    </>
                )}
                <button
                    onClick={handleToggle}
                    className="bg-green-600 text-white p-4 rounded-full shadow-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-transform transform hover:scale-110"
                    aria-label="Create new content"
                >
                    <PlusIcon className={`h-8 w-8 transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`} />
                </button>
            </div>
        </div>
    );
};

export default CreateFab;
