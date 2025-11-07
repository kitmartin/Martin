
import React, { useState } from 'react';
import { Post } from '../types';
import { HeartIcon, CommentIcon } from './icons';

interface PostCardProps {
  post: Post;
  onLike: (postId: string) => void;
  onAddComment: (postId: string, commentText: string) => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, onLike, onAddComment }) => {
  const [commentText, setCommentText] = useState('');

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddComment(post.id, commentText);
    setCommentText('');
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-4 flex items-center space-x-3">
        <img className="h-10 w-10 rounded-full object-cover" src={post.user.avatarUrl} alt={post.user.name} />
        <span className="font-semibold text-gray-800">{post.user.name}</span>
      </div>
      <img className="w-full h-auto object-cover" src={post.imageUrl} alt="Post content" />
      <div className="p-4">
        <div className="flex items-center space-x-4 mb-2">
          <button onClick={() => onLike(post.id)} className="flex items-center space-x-1 text-gray-500 hover:text-red-500 transition-colors">
            <HeartIcon className={`h-6 w-6 ${post.isLiked ? 'text-red-500 fill-current' : ''}`} />
            <span className="font-semibold">{post.likes}</span>
          </button>
          <div className="flex items-center space-x-1 text-gray-500">
            <CommentIcon className="h-6 w-6" />
            <span className="font-semibold">{post.comments.length}</span>
          </div>
        </div>
        <p className="text-gray-700">
          <span className="font-semibold text-gray-800 mr-2">{post.user.name}</span>
          {post.caption}
        </p>
      </div>
      <div className="px-4 pb-2">
        {post.comments.map((comment) => (
          <div key={comment.id} className="text-sm mb-1">
            <span className="font-semibold mr-2">{comment.user.name}</span>
            <span>{comment.text}</span>
          </div>
        ))}
      </div>
      <div className="border-t border-gray-200 px-4 py-2">
        <form onSubmit={handleCommentSubmit} className="flex items-center">
          <input
            type="text"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Add a comment..."
            className="w-full bg-transparent border-none focus:ring-0 text-sm"
          />
          <button type="submit" className="text-green-600 font-semibold text-sm hover:text-green-800 disabled:text-gray-300" disabled={!commentText.trim()}>
            Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostCard;
