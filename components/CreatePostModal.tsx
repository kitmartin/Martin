
import React, { useState, useCallback, useRef } from 'react';
import { CloseIcon, SparklesIcon } from './icons';
import { generateCaption } from '../services/geminiService';

interface CreatePostModalProps {
  onClose: () => void;
  onCreatePost: (caption: string, image: File) => void;
}

const CreatePostModal: React.FC<CreatePostModalProps> = ({ onClose, onCreatePost }) => {
  const [caption, setCaption] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };
  
  const handleGenerateCaption = async () => {
    if (!caption.trim()) {
        alert("Please provide a topic in the caption box to generate an AI caption.");
        return;
    }
    setIsGenerating(true);
    try {
        const aiCaption = await generateCaption(caption);
        setCaption(aiCaption);
    } catch(error) {
        console.error(error);
        alert("Failed to generate caption.");
    } finally {
        setIsGenerating(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (caption.trim() && imageFile) {
      onCreatePost(caption, imageFile);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md transform transition-all" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold">Create a new post</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <CloseIcon className="h-6 w-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="p-4">
            {imagePreview ? (
              <div className="mb-4">
                <img src={imagePreview} alt="Preview" className="w-full max-h-64 object-contain rounded-lg" />
              </div>
            ) : (
              <div 
                className="w-full h-48 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center mb-4 cursor-pointer hover:bg-gray-50"
                onClick={() => fileInputRef.current?.click()}
              >
                <p className="text-gray-500">Click to upload an image</p>
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>
            )}
            <div className="relative">
              <textarea
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="Write a caption or a topic for AI..."
                className="w-full h-28 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                rows={4}
              />
              <button 
                type="button" 
                onClick={handleGenerateCaption}
                disabled={isGenerating}
                className="absolute bottom-3 right-3 bg-yellow-400 hover:bg-yellow-500 text-yellow-900 font-bold p-2 rounded-full transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center"
              >
                <SparklesIcon className="h-5 w-5" />
                {isGenerating && <span className="ml-2 text-sm">Generating...</span>}
              </button>
            </div>
          </div>
          <div className="p-4 border-t">
            <button
              type="submit"
              disabled={!caption.trim() || !imageFile}
              className="w-full bg-green-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              Share Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePostModal;
