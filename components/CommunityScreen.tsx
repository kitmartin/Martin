import React from 'react';
import { Post } from '../types';
import PostCard from './PostCard';

interface CommunityScreenProps {
    posts: Post[];
    onLike: (postId: string) => void;
    onAddComment: (postId: string, commentText: string) => void;
}

const CommunityScreen: React.FC<CommunityScreenProps> = ({ posts, onLike, onAddComment }) => {
  return (
    <div className="relative">
        <div className="p-4 sm:p-6 lg:p-8 space-y-6">
        {posts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            onLike={onLike}
            onAddComment={onAddComment}
          />
        ))}
      </div>
    </div>
  );
};

export default CommunityScreen;
