import React, { useState, useMemo, useEffect } from 'react';
import { debounce } from 'lodash';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
  Copy,
  Check,
  Heart,
  MessageCircle,
  Share2,
  Calendar,
  UserCircle,
  Eye,
  ArrowLeft,
} from 'lucide-react';

const ArticleDetails = () => {
  const currDate = Date.now();
  const [inputComment, setInputComment] = useState('');
  const [comment, setComment] = useState('');
  const [copied, setCopied] = useState(false);
  const params = useParams();
  const [articles, setArticle] = useState({
    _id: '',
    title: '',
    content: '',
    image: '',
    author: {
      _id: '',
      name: '',
      avatar: '',
    },
    createdAt: '',
    likes: 0,
    comments: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const debouncedSetComment = useMemo(
    () =>
      debounce((val) => {
        setComment(val);
      }, 2000),
    []
  );

  const handleInputChange = (e) => {
    setInputComment(e.target.value);
    debouncedSetComment(e.target.value);
  };

  const handleCopyLink = async () => {
    try {
      const articleUrl = `${window.location.origin}/article/${articles._id}`;
      await navigator.clipboard.writeText(articleUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  // Format date function
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  console.log("hello")

  const fetchComments = async () => {
    try {
      const token = localStorage.getItem('userToken');
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/post/${params.id}/comment`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setArticle((prev) => ({
        ...prev,
        comments: res.data,
      }));
    } catch (err) {
      console.error("Error fetching comments:", err);
    }
  };

  const handlePostComment = async () => {
    if (!inputComment.trim()) return;
    try {
      const token = localStorage.getItem('userToken');
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/post/${params.id}/comment`,
        { content: inputComment },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setInputComment('');
      await fetchComments();
    } catch (err) {
      console.error('Failed to post comment:', err);
    }
  };
  
  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('userToken');
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/post/${params.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response);
        
        // Ensure the data structure matches what we expect
        const articleData = response.data;
        setArticle({
          _id: articleData._id || '',
          title: articleData.title || '',
          content: articleData.content || '',
          image: articleData.image || '',
          author: {
            _id: articleData.author?._id || '',
            name: articleData.author?.name || 'Unknown Author',
            avatar: articleData.author?.avatar || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
          },
          createdAt: articleData.createdAt || '',
          likes: articleData.likes || 0,
          comments: articleData.comments || [],
        });
        await fetchComments()
      } catch (error) {
        console.error('Error fetching article:', error);
        setError('Failed to load article');
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchArticle();
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 py-8 px-4 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading article...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 py-8 px-4 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-lg">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 py-8 px-4">
      <div className="mx-auto max-w-4xl">
        <article className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden relative">
          <div className="absolute -top-4 -right-4 w-32 h-32 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full opacity-30 blur-2xl"></div>
          <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full opacity-30 blur-2xl"></div>

          <div className="relative z-10 p-8 md:p-12">
            <header className="mb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text">
                {articles.title}
              </h1>

              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <img
                      src={articles.author.avatar}
                      alt={articles.author.name}
                      className="h-12 w-12 rounded-full object-cover border-2 border-white shadow-lg"
                    />
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <UserCircle className="w-4 h-4 text-gray-500" />
                      <span className="text-sm font-semibold text-gray-800">
                        {articles.author.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-500">
                        {formatDate(articles.createdAt)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 px-3 py-2 bg-red-50 text-red-600 rounded-lg">
                    <Heart className="w-4 h-4" />
                    <span className="text-sm font-medium">{articles.likes}</span>
                  </div>

                  <button
                    onClick={handleCopyLink}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
                    title="Copy article link"
                  >
                    {copied ? (
                      <>
                        <Check size={16} className="text-white" />
                        <span className="text-sm font-medium">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy size={16} />
                        <span className="text-sm font-medium">Share</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </header>

            <div className="mb-10">
              <div className="relative overflow-hidden rounded-2xl shadow-2xl group">
                <img
                  src={articles.image}
                  alt={articles.title}
                  className="w-full h-64 md:h-96 object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>

            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 text-lg leading-relaxed text-justify tracking-wide">
                {articles.content}
              </p>
            </div>

            <div className="flex items-center justify-between mt-12 pt-8 border-t border-gray-200">
              <div className="flex items-center gap-6">
                <button className="flex items-center gap-2 px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-colors duration-200">
                  <Heart className="w-5 h-5" />
                  <span className="font-medium">{articles.likes}</span>
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg transition-colors duration-200">
                  <MessageCircle className="w-5 h-5" />
                  <span className="font-medium">{articles.comments.length}</span>
                </button>
              </div>

              <div className="flex items-center gap-2 text-gray-500">
                <Eye className="w-4 h-4" />
                <span className="text-sm">245 views</span>
              </div>
            </div>
          </div>
        </article>

        {/* Comments Section */}
        <section className="mt-12 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden relative">
          <div className="absolute -top-4 -right-4 w-28 h-28 bg-gradient-to-br from-green-200 to-blue-200 rounded-full opacity-30 blur-2xl"></div>

          <div className="relative z-10 p-8 md:p-12">
            <div className="flex items-center gap-3 mb-8">
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                Responses ({articles.comments.length})
              </h2>
            </div>

            <div className="mb-12 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Share your thoughts
              </h3>
              <div className="space-y-4">
                <div className="relative">
                  <textarea
                    id="comments"
                    value={inputComment}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full p-4 bg-white border-2 border-gray-200 rounded-xl resize-none focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 text-gray-800 placeholder-gray-400"
                    placeholder="Write your thoughts about this article..."
                  />
                  <div className="absolute bottom-3 right-3 text-xs text-gray-400">
                    {inputComment.length}/500
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={handlePostComment}
                    className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
                  >
                    Post Comment
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {articles.comments.map((comment, index) => (
                <div
                  key={comment._id || index}
                  className="group p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  <div className="relative z-10">
                    <div className="flex items-start gap-4">
                      <div className="relative flex-shrink-0">
                        <img
                          src={
                            comment.user?.avatar ||
                            `https://ui-avatars.com/api/?name=${comment.user?.name || 'Anonymous'}&background=random`
                          }
                          alt={comment.user?.name || 'Anonymous'}
                          className="h-10 w-10 rounded-full object-cover border-2 border-white shadow-sm"
                        />
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-semibold text-gray-800">
                            {comment.user?.name || 'Anonymous'}
                          </h4>
                          <span className="text-sm text-gray-500">
                            {formatDate(comment.createdAt)}
                          </span>
                        </div>

                        <p className="text-gray-700 leading-relaxed text-justify">
                          {comment.content}
                        </p>

                        <div className="flex items-center gap-4 mt-4">
                          <button className="flex items-center gap-2 text-gray-500 hover:text-red-500 transition-colors duration-200">
                            <Heart className="w-4 h-4" />
                            <span className="text-sm">Like</span>
                          </button>
                          <button className="flex items-center gap-2 text-gray-500 hover:text-blue-500 transition-colors duration-200">
                            <MessageCircle className="w-4 h-4" />
                            <span className="text-sm">Reply</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ArticleDetails;