import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import RentalScreen from './components/RentalScreen';
import CommunityScreen from './components/CommunityScreen';
import ProfileScreen from './components/ProfileScreen';
import NotificationsScreen from './components/NotificationsScreen';
import SearchScreen from './components/SearchScreen';
import CreateFab from './components/CreateFab';
import ListMachineModal from './components/ListMachineModal';
import CreatePostModal from './components/CreatePostModal';
import { Tab, Machine, User, Post, Comment } from './types';

const mockUsers: { [key: string]: User } = {
  'jane': { id: 'jane', name: 'Jane Doe', avatarUrl: 'https://i.pravatar.cc/150?u=jane' },
  'john': { id: 'john', name: 'John Smith', avatarUrl: 'https://i.pravatar.cc/150?u=john' },
  'sam': { id: 'sam', name: 'Sam Wilson', avatarUrl: 'https://i.pravatar.cc/150?u=sam' },
};
const currentUser: User = { id: 'currentUser', name: 'Current User', avatarUrl: 'https://i.pravatar.cc/150?u=currentUser' };

const initialMachines: Machine[] = [
  { id: '1', name: 'John Deere 8R 370 Tractor', pricePerDay: 450, imageUrl: 'https://picsum.photos/seed/tractor1/600/400', location: 'Fresno, CA', owner: mockUsers['jane'] },
  { id: '2', name: 'Case IH Axial-Flow Combine', pricePerDay: 800, imageUrl: 'https://picsum.photos/seed/combine1/600/400', location: 'Boise, ID', owner: mockUsers['john'] },
  { id: '3', name: 'Kubota M7 Series Tractor', pricePerDay: 350, imageUrl: 'https://picsum.photos/seed/tractor2/600/400', location: 'Fresno, CA', owner: mockUsers['sam'] },
  { id: '4', name: 'New Holland T9 Plow', pricePerDay: 200, imageUrl: 'https://picsum.photos/seed/plow1/600/400', location: 'Lincoln, NE', owner: mockUsers['jane'] },
  { id: '5', name: 'Fendt 1000 Vario Tractor', pricePerDay: 550, imageUrl: 'https://picsum.photos/seed/tractor3/600/400', location: 'Boise, ID', owner: mockUsers['sam'] },
  { id: '6', name: 'Great Plains Seeder', pricePerDay: 250, imageUrl: 'https://picsum.photos/seed/seeder1/600/400', location: 'Lincoln, NE', owner: mockUsers['john'] },
];

const initialPosts: Post[] = [
  {
    id: 'post1',
    user: mockUsers['jane'],
    imageUrl: 'https://picsum.photos/seed/harvest1/800/600',
    caption: 'What a beautiful day for harvesting! The new combine is working like a charm. 🌾 #harvest2024 #farminglife',
    likes: 124,
    isLiked: false,
    comments: [
      { id: 'c1', user: mockUsers['john'], text: 'Looks amazing, Jane!' },
      { id: 'c2', user: mockUsers['sam'], text: 'Incredible yield this year!' },
    ],
  },
  {
    id: 'post2',
    user: mockUsers['john'],
    imageUrl: 'https://picsum.photos/seed/sunrisefarm/800/600',
    caption: 'Early morning start. Nothing beats a farm sunrise. 🌅 #farmlife #agriculture',
    likes: 256,
    isLiked: true,
    comments: [],
  },
];


const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.Home);
  const [machines, setMachines] = useState<Machine[]>(initialMachines);
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [isListModalOpen, setIsListModalOpen] = useState(false);
  const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState(false);

  const handleTabChange = useCallback((tab: Tab) => {
    setActiveTab(tab);
  }, []);

  const handleNotificationsClick = useCallback(() => {
    setActiveTab(Tab.Notifications);
  }, []);

  const handleLike = useCallback((postId: string) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? { ...post, isLiked: !post.isLiked, likes: post.isLiked ? post.likes - 1 : post.likes + 1 }
          : post
      )
    );
  }, []);

  const handleAddComment = useCallback((postId: string, commentText: string) => {
    if (!commentText.trim()) return;

    const newComment: Comment = {
      id: `c${Date.now()}`,
      user: currentUser,
      text: commentText,
    };

    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, comments: [...post.comments, newComment] } : post
      )
    );
  }, []);
  
  const handleAddMachine = useCallback((newMachineData: Omit<Machine, 'id' | 'owner'>) => {
    const newMachine: Machine = {
      ...newMachineData,
      id: `machine${Date.now()}`,
      owner: currentUser,
    };
    setMachines(prev => [newMachine, ...prev]);
    setIsListModalOpen(false);
  }, []);

  const handleCreatePost = useCallback((caption: string, image: File) => {
    const newPost: Post = {
        id: `post${Date.now()}`,
        user: currentUser,
        imageUrl: URL.createObjectURL(image),
        caption: caption,
        likes: 0,
        isLiked: false,
        comments: [],
    };
    setPosts(prevPosts => [newPost, ...prevPosts]);
    setIsCreatePostModalOpen(false);
  }, []);
  
  const showFab = activeTab === Tab.Home || activeTab === Tab.Community;

  return (
    <div className="min-h-screen font-sans antialiased text-gray-800 bg-green-50/50">
      <Header onNotificationsClick={handleNotificationsClick} />
      <main className="pb-24">
        <div className="max-w-3xl mx-auto">
          {activeTab === Tab.Home && <RentalScreen machines={machines} />}
          {activeTab === Tab.Community && <CommunityScreen posts={posts} onLike={handleLike} onAddComment={handleAddComment} />}
          {activeTab === Tab.Notifications && <NotificationsScreen />}
          {activeTab === Tab.Profile && <ProfileScreen />}
          {activeTab === Tab.Search && <SearchScreen />}
        </div>
      </main>
      
      {showFab && (
        <CreateFab 
          onListMachineClick={() => setIsListModalOpen(true)}
          onCreatePostClick={() => setIsCreatePostModalOpen(true)}
        />
      )}

      {isListModalOpen && (
        <ListMachineModal 
          onClose={() => setIsListModalOpen(false)}
          onAddMachine={handleAddMachine}
        />
      )}

      {isCreatePostModalOpen && (
        <CreatePostModal 
            onClose={() => setIsCreatePostModalOpen(false)} 
            onCreatePost={handleCreatePost}
        />
      )}

      <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
    </div>
  );
};

export default App;
