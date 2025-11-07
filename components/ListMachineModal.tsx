import React, { useState, useRef } from 'react';
import { CloseIcon } from './icons';
import { Machine } from '../types';

interface ListMachineModalProps {
  onClose: () => void;
  onAddMachine: (machineData: Omit<Machine, 'id' | 'owner'>) => void;
}

const ListMachineModal: React.FC<ListMachineModalProps> = ({ onClose, onAddMachine }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [location, setLocation] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && price.trim() && location.trim() && imageFile && imagePreview) {
      onAddMachine({
        name,
        pricePerDay: parseFloat(price),
        location,
        imageUrl: imagePreview,
      });
    }
  };
  
  const isFormValid = name.trim() && price.trim() && location.trim() && imageFile;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md transform transition-all" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold">List your machine</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <CloseIcon className="h-6 w-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="p-4 space-y-4">
            {imagePreview ? (
              <div className="text-center">
                <img src={imagePreview} alt="Preview" className="w-full max-h-48 object-contain rounded-lg inline-block" />
                 <button type="button" onClick={() => fileInputRef.current?.click()} className="text-sm text-green-600 hover:underline mt-2">Change image</button>
              </div>
            ) : (
              <div 
                className="w-full h-32 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50"
                onClick={() => fileInputRef.current?.click()}
              >
                <p className="text-gray-500">Click to upload an image</p>
              </div>
            )}
            <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageChange} className="hidden" />
            
            <div>
              <label htmlFor="machine-name" className="block text-sm font-medium text-gray-700">Machine Name</label>
              <input type="text" id="machine-name" value={name} onChange={(e) => setName(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-green-500 focus:border-green-500" required />
            </div>
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price per day ($)</label>
              <input type="number" id="price" value={price} onChange={(e) => setPrice(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-green-500 focus:border-green-500" required />
            </div>
             <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location (e.g. Fresno, CA)</label>
              <input type="text" id="location" value={location} onChange={(e) => setLocation(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-green-500 focus:border-green-500" required />
            </div>
          </div>
          <div className="p-4 border-t">
            <button
              type="submit"
              disabled={!isFormValid}
              className="w-full bg-green-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              Add to Listings
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ListMachineModal;
