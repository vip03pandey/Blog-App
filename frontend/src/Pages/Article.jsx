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
  Loader2,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const FollowingPointerDemo = ({ filterByUser }) => {
  const [blog, setBlog] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalPosts: 0,
    hasNextPage: false,
    hasPrevPage: false,
    limit: 10
  });
  const [loadingMore, setLoadingMore] = useState(false);

  const fetchBlogs = async (page = 1, append = false) => {
    try {
      if (!append) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }
      setError(null);
      
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/post`, {
        params: { page, limit: 10 }
      });
      
      const { posts, pagination: paginationData } = response.data;
      
      // Filter posts if needed
      const filteredPosts = filterByUser
        ? posts.filter((post) => post.author?._id === filterByUser)
        : posts;

      if (append) {
        setBlog(prev => [...prev, ...filteredPosts]);
      } else {
        setBlog(filteredPosts);
      }
      
      setPagination(paginationData);
    } catch (err) {
      console.error('Error fetching blogs:', err);
      setError(err.message);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchBlogs(1);
  }, [filterByUser]);

  const handleLoadMore = () => {
    if (pagination.hasNextPage && !loadingMore) {
      fetchBlogs(pagination.currentPage + 1, true);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      fetchBlogs(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (loading) return <LoadingState />;
  if (error && blog.length === 0) return <ErrorState error={error} onRetry={() => fetchBlogs(1)} />;

  return blog.length===0 ? (<div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 px-4 sm:px-6 lg:px-8 py-12"><p className='text-5xl text-center'>No posts found</p></div>):(
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
          {/* <div className="mt-4 text-sm text-gray-500">
            Showing {blog.length} of {pagination.totalPosts} posts
          </div> */}
          {error && (
            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800">
                <AlertCircle className="inline w-4 h-4 mr-1" />
                Unable to load latest posts. Showing available content.
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

        {/* Load More Button */}
        {pagination.hasNextPage && (
          <div className="text-center mt-12">
            <button 
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-xl font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              onClick={handleLoadMore}
              disabled={loadingMore}
            >
              {loadingMore ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2 inline" />
                  Loading...
                </>
              ) : (
                'Load More Stories'
              )}
            </button>
          </div>
        )}

        {/* Page Navigation */}
        <div className="flex items-center justify-center mt-8 space-x-2">
          <button
            onClick={() => handlePageChange(pagination.currentPage - 1)}
            disabled={!pagination.hasPrevPage}
            className="flex items-center px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Previous
          </button>

          {/* Page Numbers */}
          <div className="flex space-x-1">
            {[...Array(Math.min(5, pagination.totalPages))].map((_, i) => {
              const pageNum = Math.max(1, pagination.currentPage - 2) + i;
              if (pageNum > pagination.totalPages) return null;
              
              return (
                <button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    pageNum === pagination.currentPage
                      ? 'bg-blue-500 text-white'
                      : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => handlePageChange(pagination.currentPage + 1)}
            disabled={!pagination.hasNextPage}
            className="flex items-center px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
            <ChevronRight className="w-4 h-4 ml-1" />
          </button>
        </div>

        {/* Pagination Info */}
        <div className="text-center mt-4 text-sm text-gray-500">
          Page {pagination.currentPage} of {pagination.totalPages}
        </div>
      </div>
    </div>
    )
};

// Rest of your components remain the same...
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
              {blogContent.author?.avatar ? (
                <img
                  src={blogContent.author.avatar}
                  alt={blogContent.author.name}
                  className="w-10 h-10 rounded-full object-cover border-2 border-gray-200"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
              ) : null}
              <div 
                className={`w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center ${
                  blogContent.author?.avatar ? 'hidden' : ''
                }`}
              >
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