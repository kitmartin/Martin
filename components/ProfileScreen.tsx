import React, { useState } from 'react';
import { User, Machine, Post } from '../types';
import { SettingsIcon } from './icons';
import MachineCard from './MachineCard';
import PostCard from './PostCard';
import SettingsScreen from './SettingsScreen';

// Mock Data (in a real app, this would come from an API or global state)
const currentUser: User = { id: 'currentUser', name: 'Current User', avatarUrl: 'https://i.pravatar.cc/150?u=currentUser' };
const mockUsers: { [key: string]: User } = {
  'jane': { id: 'jane', name: 'Jane Doe', avatarUrl: 'https://i.pravatar.cc/150?u=jane' },
  'john': { id: 'john', name: 'John Smith', avatarUrl: 'https://i.pravatar.cc/150?u=john' },
  'sam': { id: 'sam', name: 'Sam Wilson', avatarUrl: 'https://i.pravatar.cc/150?u=sam' },
};
const allMachines: Machine[] = [
    { id: '1', name: 'John Deere 8R 370 Tractor', pricePerDay: 450, imageUrl: 'https://picsum.photos/seed/tractor1/600/400', location: 'Fresno, CA', owner: mockUsers['jane'] },
    { id: '2', name: 'Case IH Axial-Flow Combine', pricePerDay: 800, imageUrl: 'https://picsum.photos/seed/combine1/600/400', location: 'Boise, ID', owner: mockUsers['john'] },
    { id: 'm-user', name: 'My Listed Seeder', pricePerDay: 150, imageUrl: 'https://picsum.photos/seed/myseeder/600/400', location: 'My Town, USA', owner: currentUser },
];
const allPosts: Post[] = [
    { id: 'p-user', user: currentUser, imageUrl: 'https://picsum.photos/seed/mypost/800/600', caption: 'Just listed my seeder for rent! Hope it helps a neighbor out. #community #farming', likes: 12, isLiked: false, comments: [] },
    { id: 'post1', user: mockUsers['jane'], imageUrl: 'https://picsum.photos/seed/harvest1/800/600', caption: 'Beautiful harvest day!', likes: 124, isLiked: false, comments: [] },
];

const ProfileScreen: React.FC = () => {
    const [showSettings, setShowSettings] = useState(false);
    
    // Dummy handlers for PostCard interactivity
    const handleLike = (postId: string) => console.log(`Liked post ${postId}`);
    const handleAddComment = (postId: string, text: string) => console.log(`Comment on post ${postId}: ${text}`);

    const myMachines = allMachines.filter(m => m.owner.id === currentUser.id);
    const myPosts = allPosts.filter(p => p.user.id === currentUser.id);

    if (showSettings) {
        return <SettingsScreen onBack={() => setShowSettings(false)} />;
    }

    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-4">
                    <img src={currentUser.avatarUrl} alt={currentUser.name} className="h-20 w-20 rounded-full object-cover ring-4 ring-green-200" />
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900">{currentUser.name}</h2>
                        <p className="text-gray-500">@{currentUser.id}</p>
                    </div>
                </div>
                <button 
                    onClick={() => setShowSettings(true)}
                    className="text-gray-500 hover:text-green-600 p-2 rounded-full hover:bg-gray-100 transition-colors"
                    aria-label="Settings"
                >
                    <SettingsIcon className="h-7 w-7" />
                </button>
            </div>

            <div className="space-y-8">
                <section>
                    <h3 className="text-2xl font-semibold text-gray-800 mb-4 border-b-2 border-green-200 pb-2">My Listings</h3>
                    {myMachines.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {myMachines.map(machine => <MachineCard key={machine.id} machine={machine} />)}
                        </div>
                    ) : (
                        <p className="text-gray-500">You haven't listed any machines yet.</p>
                    )}
                </section>

                <section>
                    <h3 className="text-2xl font-semibold text-gray-800 mb-4 border-b-2 border-green-200 pb-2">My Posts</h3>
                     {myPosts.length > 0 ? (
                        <div className="space-y-6">
                            {myPosts.map(post => (
                                <PostCard key={post.id} post={post} onLike={handleLike} onAddComment={handleAddComment} />
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500">You haven't made any posts yet.</p>
                    )}
                </section>
            </div>
        </div>
    );
};

export default ProfileScreen;
