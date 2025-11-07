export interface User {
  id: string;
  name: string;
  avatarUrl: string;
}

export interface Machine {
  id: string;
  name: string;
  pricePerDay: number;
  imageUrl: string;
  location: string;
  owner: User;
}

export interface Comment {
  id: string;
  user: User;
  text: string;
}

export interface Post {
  id: string;
  user: User;
  imageUrl: string;
  caption: string;
  likes: number;
  isLiked: boolean;
  comments: Comment[];
}

export enum NotificationType {
  Like = 'LIKE',
  Comment = 'COMMENT',
  RentalRequest = 'RENTAL_REQUEST',
  NewListing = 'NEW_LISTING',
}

export interface Notification {
  id: string;
  type: NotificationType;
  user: User;
  text: string;
  timestamp: string;
  read: boolean;
  relatedPost?: Pick<Post, 'id' | 'imageUrl'>;
  relatedMachine?: Pick<Machine, 'id' | 'imageUrl'>;
}

export enum Tab {
  Home = 'HOME',
  Community = 'COMMUNITY',
  Search = 'SEARCH',
  Notifications = 'NOTIFICATIONS',
  Profile = 'PROFILE',
}
