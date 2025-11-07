import React from 'react';
import { Notification, NotificationType, User } from '../types';
import { HeartIcon, CommentIcon, TractorIcon } from './icons';

// Mock Data
const mockUsers: { [key: string]: User } = {
  'jane': { id: 'jane', name: 'Jane Doe', avatarUrl: 'https://i.pravatar.cc/150?u=jane' },
  'john': { id: 'john', name: 'John Smith', avatarUrl: 'https://i.pravatar.cc/150?u=john' },
  'sam': { id: 'sam', name: 'Sam Wilson', avatarUrl: 'https://i.pravatar.cc/150?u=sam' },
};

const mockNotifications: Notification[] = [
    { id: '1', type: NotificationType.Like, user: mockUsers.jane, text: 'liked your post.', timestamp: '5m ago', read: false, relatedPost: { id: 'p-user', imageUrl: 'https://picsum.photos/seed/mypost/800/600' } },
    { id: '2', type: NotificationType.Comment, user: mockUsers.john, text: 'commented: "Looks great! When is it available?"', timestamp: '1h ago', read: false, relatedPost: { id: 'p-user', imageUrl: 'https://picsum.photos/seed/mypost/800/600' } },
    { id: '3', type: NotificationType.RentalRequest, user: mockUsers.sam, text: 'sent a rental request for your My Listed Seeder.', timestamp: '3h ago', read: true, relatedMachine: { id: 'm-user', imageUrl: 'https://picsum.photos/seed/myseeder/600/400' } },
    { id: '4', type: NotificationType.NewListing, user: mockUsers.jane, text: 'listed a new John Deere 8R 370 Tractor near you.', timestamp: '1d ago', read: true, relatedMachine: { id: '1', imageUrl: 'https://picsum.photos/seed/tractor1/600/400' } },
];

const NotificationTypeIcon: React.FC<{type: NotificationType}> = ({ type }) => {
    const baseClasses = "h-6 w-6 text-white";
    switch (type) {
        case NotificationType.Like:
            return <div className="p-2 bg-red-500 rounded-full"><HeartIcon className={baseClasses} /></div>;
        case NotificationType.Comment:
            return <div className="p-2 bg-blue-500 rounded-full"><CommentIcon className={baseClasses} /></div>;
        case NotificationType.RentalRequest:
        case NotificationType.NewListing:
            return <div className="p-2 bg-green-500 rounded-full"><TractorIcon className={baseClasses} /></div>;
        default:
            return null;
    }
}

const NotificationsScreen: React.FC = () => {
    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Notifications</h2>
            <div className="bg-white rounded-lg shadow-sm">
                <ul className="divide-y divide-gray-200">
                    {mockNotifications.map(notification => (
                        <li key={notification.id} className={`p-4 flex items-start space-x-4 transition-colors ${!notification.read ? 'bg-green-50' : 'hover:bg-gray-50'}`}>
                            <div className="relative">
                                <img src={notification.user.avatarUrl} alt={notification.user.name} className="h-12 w-12 rounded-full object-cover" />
                                <div className="absolute -bottom-1 -right-1">
                                    <NotificationTypeIcon type={notification.type} />
                                </div>
                            </div>
                            <div className="flex-1">
                                <p className="text-gray-800">
                                    <span className="font-semibold">{notification.user.name}</span> {notification.text}
                                </p>
                                <p className="text-sm text-gray-500 mt-1">{notification.timestamp}</p>
                            </div>
                            {(notification.relatedPost || notification.relatedMachine) && (
                                <img 
                                    src={notification.relatedPost?.imageUrl || notification.relatedMachine?.imageUrl}
                                    alt="related content"
                                    className="h-14 w-14 rounded-md object-cover flex-shrink-0"
                                />
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default NotificationsScreen;