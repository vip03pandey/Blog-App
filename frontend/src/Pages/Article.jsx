import React, { useEffect, useState } from 'react';
import {
  Heart,
  MessageCircle,
  Bookmark,
  MoreHorizontal,
  Calendar,
  User,
  TrendingUp,
  Eye,
  AlertCircle,
  Loader2
} from 'lucide-react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const FollowingPointerDemo = ({ filterByUser }) => {
  const [blog, setBlog] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/post`);
        setBlog(response.data);
      } catch (err) {
        console.error('Error fetching blogs:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) return <LoadingState />;
  if (error && blog.length === 0) return <ErrorState error={error} onRetry={() => window.location.reload()} />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 px-4 sm:px-6 lg:px-8 py-12">
      <div className="mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-6">
            <TrendingUp className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Latest Stories
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover amazing articles from our community of writers and thought leaders
          </p>
          {error && (
            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800">
                <AlertCircle className="inline w-4 h-4 mr-1" />
                Unable to load latest posts. Showing sample content.
              </p>
            </div>
          )}
        </div>

        <div className="space-y-6">
          {blog.map((blogContent, index) => (
            <Link key={blogContent._id} to={`/article/${blogContent._id}`}>
              <div className="mx-auto w-full border-b-1 rounded-2xl z-10 cursor-pointer">
                <BlogCard blogContent={blogContent} index={index} />
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <button 
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-xl font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
            onClick={() => console.log('Load more clicked')}
          >
            Load More Stories
          </button>
        </div>
      </div>
    </div>
  );
};

const BlogCard = ({ blogContent, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const truncateText = (text, wordLimit) => {
    const words = text.split(' ');
    if (words.length <= wordLimit) return text;
    return words.slice(0, wordLimit).join(' ') + '...';
  };

  return (
    <div className="group relative mt-4">
      <div className="relative bg-white/90 backdrop-blur-sm rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
        <div className="relative p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">{blogContent.author?.name || 'Unknown Author'}</h3>
              <div className="flex items-center gap-1 text-gray-500">
                <Calendar className="w-3 h-3" />
                <span className="text-sm">{new Date(blogContent.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          <div className="flex gap-4 mb-4">
            <div className="flex-1">
              <h2 className="text-xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-blue-600 transition-colors duration-200">
                {blogContent.title}
              </h2>
              <div className="text-gray-600 leading-relaxed">
                <p className="mb-2">
                  {isExpanded ? blogContent.content : truncateText(blogContent.content, 25)}
                </p>
                {blogContent.content.split(' ').length > 25 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsExpanded(!isExpanded);
                    }}
                    className="text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors duration-200"
                  >
                    {isExpanded ? 'Read less' : 'Read more'}
                  </button>
                )}
              </div>
            </div>

            <div className="flex-shrink-0">
              <div className="relative overflow-hidden rounded-lg shadow-sm group-hover:shadow-md transition-shadow duration-300">
                <img
                  src={blogContent.image}
                  alt={blogContent.title}
                  className="w-24 h-18 md:w-40 md:h-30 object-cover transition-transform duration-300 group-hover:scale-110"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/400x300/e2e8f0/64748b?text=No+Image';
                  }}
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
            <div className="flex items-center gap-4">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setIsLiked(!isLiked);
                }}
                className={`flex items-center gap-1 transition-colors duration-200 ${
                  isLiked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
                }`}
              >
                <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                <span className="font-medium text-sm">{blogContent.likes}</span>
              </button>

              <button className="flex items-center gap-1 text-gray-500 hover:text-blue-500 transition-colors duration-200">
                <MessageCircle className="w-4 h-4" />
                <span className="font-medium text-sm">{blogContent.comments?.length || 0}</span>
              </button>

              <div className="flex items-center gap-1 text-gray-500">
                <Eye className="w-4 h-4" />
                <span className="font-medium text-sm">1.2K</span>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setIsBookmarked(!isBookmarked);
                }}
                className={`p-2 hover:bg-gray-100 rounded-full transition-colors duration-200 ${
                  isBookmarked ? 'text-blue-500' : 'text-gray-400'
                }`}
              >
                <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200 text-gray-400 hover:text-gray-600">
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const LoadingState = () => (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center">
    <div className="text-center">
      <Loader2 className="w-12 h-12 text-blue-500 animate-spin mx-auto mb-4" />
      <p className="text-lg text-gray-600">Loading amazing stories...</p>
    </div>
  </div>
);

const ErrorState = ({ error, onRetry }) => (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center">
    <div className="text-center max-w-md mx-auto p-8">
      <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Oops! Something went wrong</h2>
      <p className="text-gray-600 mb-6">
        We couldn't load the latest stories right now. Please check your connection and try again.
      </p>
      <button
        onClick={onRetry}
        className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-200"
      >
        Try Again
      </button>
    </div>
  </div>
);

export default FollowingPointerDemo;
